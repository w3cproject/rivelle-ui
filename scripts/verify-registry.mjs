import { createServer } from "node:http";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { spawn } from "node:child_process";

const root = resolve(import.meta.dirname, "..");
const registryDirectory = join(root, "apps/www/public/r");
const cli = join(root, "packages/cli/dist/index.js");
const manifest = JSON.parse(
  await readFile(join(root, "registry.json"), "utf8"),
);
const componentNames = manifest.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => item.name);
const blockNames = manifest.items
  .filter((item) => item.type === "registry:block")
  .map((item) => item.name);

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url ?? "/", "http://localhost").pathname,
    );
    const filename = join(registryDirectory, pathname.replace(/^\/r\/?/, ""));
    if (
      !filename.startsWith(registryDirectory) ||
      extname(filename) !== ".json"
    ) {
      response.writeHead(404).end("Not found");
      return;
    }
    response.setHeader("content-type", "application/json; charset=utf-8");
    response.end(await readFile(filename));
  } catch {
    response.writeHead(404).end("Not found");
  }
});

await new Promise((resolveListen) =>
  server.listen(0, "127.0.0.1", resolveListen),
);
const address = server.address();
const registry = `http://127.0.0.1:${address.port}/r`;
const temporaryRoot = await mkdtemp(join(tmpdir(), "rivelle-verify-"));

try {
  await verifyTypeScriptProject(join(temporaryRoot, "next-ts"));
  await verifyJavaScriptProject(join(temporaryRoot, "vite-js"));
  console.log(
    `✓ Registry verified over HTTP: ${componentNames.length} components, ${blockNames.length} blocks, TypeScript and JavaScript.`,
  );
} finally {
  server.close();
  await rm(temporaryRoot, { recursive: true, force: true });
}

async function verifyTypeScriptProject(cwd) {
  await seed(cwd, {
    "package.json": JSON.stringify(
      { private: true, dependencies: { next: "16.2.10", react: "19.2.0" } },
      null,
      2,
    ),
    "tsconfig.json": JSON.stringify(
      { compilerOptions: { jsx: "preserve" } },
      null,
      2,
    ),
    "src/app/globals.css": '@import "tailwindcss";\n',
  });
  await run([
    "init",
    "--cwd",
    cwd,
    "--yes",
    "--skip-install",
    "--registry",
    registry,
    "--accent",
    "violet",
  ]);
  await run(["add", ...componentNames, "--cwd", cwd, "--skip-install"]);
  await run(["add", ...blockNames, "--cwd", cwd, "--skip-install"]);

  for (const name of componentNames) {
    await assertFile(join(cwd, "src/components/ui", `${name}.tsx`));
  }
  for (const name of blockNames) {
    await assertFile(join(cwd, "src/components/blocks", `${name}.tsx`));
  }
  await assertFile(join(cwd, "src/lib/utils.ts"));
  const css = await readFile(join(cwd, "src/app/globals.css"), "utf8");
  assert(
    count(css, "/* rivelle:theme:start */") === 1,
    "theme marker must be unique",
  );
  assert(
    css.includes('@import "@fontsource-variable/geist";'),
    "Geist import is missing",
  );
  assert(
    css.includes('@import "tw-animate-css";'),
    "motion utilities import is missing",
  );

  await run([
    "init",
    "--cwd",
    cwd,
    "--yes",
    "--force",
    "--skip-install",
    "--registry",
    registry,
    "--font",
    "inter",
    "--accent",
    "rose",
    "--radius",
    "0.75rem",
  ]);
  const updatedCss = await readFile(join(cwd, "src/app/globals.css"), "utf8");
  assert(
    count(updatedCss, "/* rivelle:theme:start */") === 1,
    "forced init duplicated the theme",
  );
  assert(
    updatedCss.includes('@import "@fontsource-variable/inter";'),
    "forced init did not replace the font",
  );
  const settings = JSON.parse(
    await readFile(join(cwd, "rivelle.json"), "utf8"),
  );
  assert(
    settings.theme.accent === "rose" && settings.theme.radius === "0.75rem",
    "forced init did not persist theme settings",
  );
}

async function verifyJavaScriptProject(cwd) {
  await seed(cwd, {
    "package.json": JSON.stringify(
      {
        private: true,
        devDependencies: { vite: "7.0.0" },
        dependencies: { react: "19.2.0" },
      },
      null,
      2,
    ),
    "src/index.css": '@import "tailwindcss";\n',
    "vite.config.js":
      'import { defineConfig } from "vite"\n\nexport default defineConfig({})\n',
  });
  await run([
    "init",
    "--cwd",
    cwd,
    "--yes",
    "--javascript",
    "--skip-install",
    "--registry",
    registry,
  ]);
  await run([
    "add",
    "button",
    "dialog",
    "select",
    "--cwd",
    cwd,
    "--skip-install",
  ]);
  for (const name of ["button", "dialog", "select"]) {
    const filename = join(cwd, "src/components/ui", `${name}.jsx`);
    const source = await readFile(filename, "utf8");
    assert(
      !/React\.ComponentProps|VariantProps<|\binterface\s+|\btype\s+[A-Z]/.test(
        source,
      ),
      `${name}.jsx still contains TypeScript syntax`,
    );
  }
  await assertFile(join(cwd, "src/lib/utils.js"));
  const jsconfig = JSON.parse(
    await readFile(join(cwd, "jsconfig.json"), "utf8"),
  );
  assert(
    jsconfig.compilerOptions.paths["@/*"][0] === "./src/*",
    "JavaScript @ alias is missing",
  );
  const viteConfig = await readFile(join(cwd, "vite.config.js"), "utf8");
  assert(viteConfig.includes('alias: { "@":'), "Vite runtime alias is missing");
}

async function seed(cwd, files) {
  for (const [relativePath, content] of Object.entries(files)) {
    const filename = join(cwd, relativePath);
    await mkdir(dirname(filename), { recursive: true });
    await writeFile(filename, `${content}\n`, "utf8");
  }
}

async function run(args) {
  await new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, [cli, ...args], {
      cwd: root,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) =>
      code === 0
        ? resolveRun()
        : reject(new Error(`CLI exited with code ${code}: ${args.join(" ")}`)),
    );
  });
}

async function assertFile(filename) {
  await readFile(filename, "utf8");
}

function count(value, needle) {
  return value.split(needle).length - 1;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}
