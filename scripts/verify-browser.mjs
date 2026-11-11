import { createRequire } from "node:module";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import assert from "node:assert/strict";

// Optional browser QA: install Playwright locally or provide its module path.
const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.RIVELLE_PLAYWRIGHT_MODULE || "playwright",
);
const base = process.env.RIVELLE_PREVIEW_URL || "http://localhost:3100";
const output = await mkdtemp(join(tmpdir(), "rivelle-browser-"));
const browser = await chromium.launch({ channel: "chrome", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1050 },
});
const page = await context.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
async function visit(path) {
  const response = await page.goto(base + path, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200, path);
}
async function shot(name) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      document
        .getAnimations()
        .filter((a) => a.effect?.getTiming().iterations !== Infinity)
        .map((a) => a.finished.catch(() => {})),
    );
  });
  await page.screenshot({ path: join(output, `${name}.png`), fullPage: false });
}
try {
  for (const path of [
    "/",
    "/effects",
    "/blocks",
    "/templates",
    "/docs/components",
    "/effects/scroll-stage",
    "/effects/pixel-displacement",
    "/effects/morphing-surface",
    "/effects/image-trail",
    "/effects/elastic-dock",
    "/effects/rolling-number",
    "/docs/components/file-upload",
    "/docs/components/stepper",
    "/docs/components/tree-view",
    "/docs/components/data-table",
    "/blocks/onboarding-01",
    "/blocks/billing-settings-01",
    "/blocks/activity-feed-01",
    "/blocks/file-manager-01",
    "/blocks/command-center-01",
    "/templates/workspace-01",
    "/templates/product-launch-01",
    "/templates/ai-chat-workspace-01",
  ])
    await visit(path);
  console.log("✓ Catalog and all 18 new detail routes render");

  await visit("/preview/component/data-table");
  await page.getByRole("textbox", { name: "Search Projects" }).fill("brand");
  await page.getByText("Brand system", { exact: true }).waitFor();
  assert.equal(await page.locator("tbody tr").count(), 1);
  await page.getByRole("textbox", { name: "Search Projects" }).fill("");
  await page.getByRole("button", { name: "Next", exact: true }).click();
  assert.equal(await page.locator("tbody tr").count(), 1);
  await page.getByRole("button", { name: "Previous", exact: true }).click();
  await page.getByRole("checkbox", { name: "Select this page" }).check();
  await page.getByText("5 selected · 6 records").waitFor();
  await page.getByRole("button", { name: "Budget", exact: true }).click();
  assert.ok(
    (await page.locator("tbody tr").first().innerText()).includes(
      "Documentation",
    ),
  );
  await page.getByRole("button", { name: "Budget", exact: true }).click();
  assert.ok(
    (await page.locator("tbody tr").first().innerText()).includes("Mobile app"),
  );
  await page.getByText("Columns", { exact: true }).click();
  await page.getByLabel("Budget", { exact: true }).uncheck();
  assert.equal(
    await page.getByRole("columnheader", { name: "Budget" }).count(),
    0,
  );
  await shot("data-table");

  await visit("/preview/component/tree-view");
  const treeItem = page.getByRole("treeitem", { name: "src", exact: true });
  await treeItem.focus();
  await page.keyboard.press("End");
  assert.equal(
    await page.locator(":focus").getAttribute("data-tree-id"),
    "readme",
  );
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowLeft");
  assert.equal(await treeItem.getAttribute("aria-expanded"), "false");
  await page.keyboard.press("ArrowRight");
  assert.equal(await treeItem.getAttribute("aria-expanded"), "true");

  await visit("/preview/component/file-upload");
  await page.locator('input[type="file"]').setInputFiles({
    name: "brief.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("Release brief"),
  });
  await page.getByText("Uploaded", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Remove brief.txt" }).click();
  assert.equal(await page.getByText("brief.txt", { exact: true }).count(), 0);
  await page.locator('input[type="file"]').setInputFiles({
    name: "bad.exe",
    mimeType: "application/octet-stream",
    buffer: Buffer.from("test"),
  });
  await page
    .getByRole("alert")
    .getByText("bad.exe: unsupported file type")
    .waitFor();

  await visit("/preview/block/onboarding-01");
  await page.getByLabel("Workspace name").fill("QA Studio");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("radio", { name: "Engineering" }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Preview workspace" }).click();
  await page.getByText("QA Studio is ready").waitFor();

  await visit("/preview/block/billing-settings-01");
  await page.getByRole("checkbox", { name: /Yearly billing/ }).check();
  await page.getByRole("button", { name: "Choose plan" }).first().click();
  await page.getByText(/Demo plan updated/).waitFor();
  await visit("/preview/block/activity-feed-01");
  await page
    .getByRole("combobox", { name: "Filter activity" })
    .selectOption("team");
  await page.getByText("1 events", { exact: true }).waitFor();
  await visit("/preview/block/file-manager-01");
  await page.getByRole("textbox", { name: "Search files" }).fill("brand");
  await page
    .getByRole("checkbox", { name: "Select Brand guidelines.pdf" })
    .check();
  await page.getByRole("button", { name: /Remove 1/ }).click();
  await page.getByText("No matching files").waitFor();

  await visit("/preview/block/command-center-01");
  await page.keyboard.press("Control+k");
  await page.getByRole("dialog").waitFor();
  await page.getByPlaceholder("Search projects and actions").fill("billing");
  await page.getByRole("option", { name: "Billing settings" }).click();
  await page.getByText("Selected Billing settings").waitFor();
  console.log("✓ Table, tree, upload validation and five application blocks");

  await visit("/preview/template/workspace-01");
  await page.getByRole("button", { name: "New project" }).click();
  await page.getByLabel("Project name").fill("Browser QA");
  await page
    .getByRole("button", { name: "Create project", exact: true })
    .click();
  await page.getByRole("button", { name: /Browser QA/ }).click();
  await page.getByRole("checkbox").first().check();
  await page
    .getByRole("button", { name: "Complete project", exact: true })
    .click();
  await page.getByRole("button", { name: "Reopen project" }).waitFor();
  await shot("workspace");

  await visit("/preview/template/ai-chat-workspace-01");
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Plan the release");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.getByText(/Demo response to/).waitFor();
  await page.getByRole("button", { name: "New conversation" }).click();
  await page
    .getByRole("textbox", { name: "Message", exact: true })
    .fill("Stop test");
  await page.getByRole("button", { name: "Send message" }).click();
  await page.getByRole("button", { name: "Stop response" }).click();
  await page.getByRole("button", { name: "Send message" }).waitFor();
  await shot("chat");

  await visit("/preview/template/product-launch-01");
  await page.getByRole("checkbox", { name: /Bill yearly/ }).check();
  await page.locator('[aria-label="12"]').waitFor();
  await page.getByLabel("Get launch updates").fill("qa@example.com");
  await page.getByRole("button", { name: "Join the list" }).click();
  await page.getByText(/Demo signup recorded locally/).waitFor();
  console.log("✓ Three complete template flows and chat cancellation");

  await visit("/preview/effect/pixel-displacement");
  const canvas = page.locator("canvas");
  await canvas.waitFor({ state: "visible" });
  const before = await canvas.evaluate((node) => node.toDataURL());
  await canvas.hover({ position: { x: 220, y: 180 } });
  await page.waitForFunction(
    (previous) => document.querySelector("canvas").toDataURL() !== previous,
    before,
  );
  await shot("pixel-displacement");
  await visit("/preview/effect/morphing-surface");
  await page.getByRole("button", { name: /A study in motion/ }).click();
  await page.getByRole("dialog").waitFor();
  await shot("morphing-surface");
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });

  await visit("/preview/effect/image-trail");
  await page.mouse.move(300, 180);
  await page.mouse.move(420, 210);
  await page.mouse.move(550, 280);
  assert.ok((await page.locator('img[aria-hidden="true"]').count()) > 0);
  await visit("/preview/effect/elastic-dock");
  const dock = page.getByRole("button", { name: "Projects", exact: true });
  const original = (await dock.boundingBox()).width;
  await dock.hover();
  await page.waitForFunction(
    () =>
      document.querySelector('[aria-label="Projects"]').getBoundingClientRect()
        .width > 50,
  );
  assert.ok((await dock.boundingBox()).width > original);
  await dock.click();
  await page.getByText("Projects", { exact: true }).first().waitFor();
  await visit("/preview/effect/rolling-number");
  await page.getByRole("button", { name: "+249" }).click();
  await page.locator('[aria-label="1,497"]').waitFor();
  await visit("/preview/effect/scroll-stage");
  await page
    .getByText("Release the work", { exact: true })
    .scrollIntoViewIfNeeded();
  await page.locator('[data-active-scene="ship"]').waitFor();
  await shot("scroll-stage");
  console.log(
    "✓ Pixel drawing, morph dialog, image trail, elastic sizing, rolling digits and scroll scenes",
  );

  await visit("/docs/components/file-upload");
  await page.getByRole("button", { name: "Mobile", exact: true }).click();
  const iframe = page.locator("iframe").first();
  assert.equal(
    await iframe.evaluate((node) =>
      Math.round(node.getBoundingClientRect().width),
    ),
    390,
  );
  await page.getByRole("checkbox", { name: "Reduced motion" }).check();
  await page
    .frameLocator("iframe")
    .locator('[data-preview-reduced="true"]')
    .waitFor();
  await page.getByRole("button", { name: "Open full-screen preview" }).click();
  await page.getByRole("dialog").waitFor();
  await shot("preview-fullscreen");
  await page
    .getByRole("dialog")
    .locator("iframe")
    .contentFrame()
    .getByRole("button", { name: /Drop files or browse/ })
    .focus();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "hidden" });

  await page.setViewportSize({ width: 390, height: 844 });
  for (const [path, name] of [
    ["/preview/template/workspace-01", "workspace-mobile"],
    ["/preview/template/ai-chat-workspace-01", "chat-mobile"],
    ["/preview/template/product-launch-01", "launch-mobile"],
    ["/docs/components/data-table", "table-mobile"],
  ]) {
    await visit(path);
    assert.ok(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
      `Overflow: ${path}`,
    );
    await shot(name);
  }
  await visit(
    "/preview/effect/pixel-displacement?mode=dark&style=prism&reduced=true",
  );
  await page.waitForFunction(
    () =>
      document.documentElement.classList.contains("dark") &&
      JSON.parse(localStorage.getItem("rivelle-theme-config")).style ===
        "prism",
  );
  await page.locator("canvas").waitFor({ state: "hidden" });
  await page
    .getByRole("img", { name: "Field study, blue geometric artwork" })
    .waitFor();
  assert.deepEqual(errors, [], "Browser runtime errors");
  console.log(
    `✓ Responsive and fullscreen previews; no page errors\nScreenshots: ${output}`,
  );
} finally {
  await browser.close();
}
