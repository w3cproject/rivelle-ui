import cliPackage from "../../../packages/cli/package.json";

export const siteConfig = {
  name: "Rivelle",
  url: "https://rivelle.dev",
  github: "https://github.com/w3cproject/rivelle-ui",
  npm: "https://www.npmjs.com/package/rivelle",
  version: cliPackage.version,
} as const;
