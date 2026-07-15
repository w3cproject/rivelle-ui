# Deployment and release setup

This guide covers the one-time setup for GitHub, Vercel, the custom domain and npm.

## 1. GitHub

The public repository is [`w3cproject/rivelle-ui`](https://github.com/w3cproject/rivelle-ui). Push the local `main` branch after reviewing the initial commit.

In repository settings:

- enable Issues and Discussions;
- enable private vulnerability reporting;
- enable Automatically delete head branches;
- configure branch protection for `main`;
- require the `verify` CI check before merging;
- require pull requests and block force pushes;
- enable Dependabot security updates and secret scanning where available;
- use squash merging as the default.

Repository-specific URLs are already configured in package metadata and `.github/ISSUE_TEMPLATE/config.yml`.

## 2. Vercel

Import the GitHub repository as a new Vercel project.

- Framework: Next.js
- Root Directory: `apps/www`
- Install and build commands: provided by `apps/www/vercel.json`
- Include source files outside the Root Directory: enabled
- Production branch: `main`

The build regenerates `apps/www/public/r/*.json`, so the website and registry ship together. Every pull request receives a preview deployment; pushes to `main` update production.

## 3. Custom domain

Add the apex domain to the Vercel project and choose whether the canonical host is the apex domain or `www`. Add the DNS records shown by Vercel at the domain registrar, then redirect the non-canonical host to the canonical one.

Verify these production URLs after DNS and TLS are ready:

```text
https://rivelle.dev/
https://rivelle.dev/docs/components
https://rivelle.dev/r/button.json
https://rivelle.dev/r/registry.json
```

The CLI constant, `registry.json` homepage, Next.js metadata, sitemap and npm homepage must all use the same canonical domain.

## 4. npm

The `rivelle` name was unclaimed during release preparation. Sign in with `npm login`, run `pnpm verify`, then create the package with the one-time manual first publish from `packages/cli`:

```bash
cd packages/cli
npm publish --access public
cd ../..
```

In npm package settings, configure GitHub Actions as the trusted publisher:

- GitHub owner: `w3cproject`;
- repository: `rivelle-ui`;
- workflow: `publish.yml`;
- allowed action: `npm publish`.

Create a protected GitHub environment named `npm`. Then update the changelog and package version, commit, and push a matching tag:

```bash
git tag v0.1.0
git push origin v0.1.0
```

The workflow runs `pnpm verify`, checks that the tag matches the package version and publishes the CLI.
If the version already exists because it was the one-time manual first release, the workflow verifies the repository and exits without republishing it.

## 5. Release verification

After publishing:

```bash
pnpm dlx rivelle@latest init
pnpm dlx rivelle@latest add button
```

Run this in a clean Next.js fixture and confirm that the registry URL, font packages, CSS theme and component dependencies resolve from production.
