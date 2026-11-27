# Tricia desktop app

The [smrt app shell](https://github.com/happyvertical/smrt/tree/main/packages/app-shell) packaged
with [smrt-desktop](https://github.com/happyvertical/smrt/tree/main/packages/smrt-desktop). All the
code comes from the published packages. This folder holds only the product's identity
(`smrt-desktop.json`), its icons, and a one-line entry that starts the published server
(`server.js`, built by `vite.config.js`).

It is a standalone pnpm project with its own lockfile, outside the repository's workspace.

## Build

You need Node 26 and pnpm 11.

```sh
cd apps/desktop
pnpm install --frozen-lockfile --ignore-scripts
pnpm build
```

To bundle the runtime and build an installer, follow "Building an installer" in the smrt-desktop
README. The [Desktop workflow](../../.github/workflows/desktop.yml) does this on every pull request
for macOS (Apple silicon) and Linux (x64), unsigned, with a launch smoke test.

## Upgrade smrt

Set every `@happyvertical/smrt-*` version in `package.json` to the same release, then update the
versions in `pnpm-workspace.yaml` and, in the Desktop workflow, `smrt_desktop_version` and the
pinned commit.

## Release

Nothing has been released. A release is a manual run of the Desktop workflow from `main` with
"release" ticked, and it refuses to start until all of these exist:

- a `desktop-release` environment with a required reviewer, no admin bypass, and `main` as its only
  deployment branch;
- its secrets: `APPLE_CERTIFICATE`, `APPLE_CERTIFICATE_PASSWORD`, `APPLE_SIGNING_IDENTITY`,
  `APPLE_ID`, `APPLE_PASSWORD`, `APPLE_TEAM_ID`, `TAURI_SIGNING_PRIVATE_KEY` and
  `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`;
- `updaterPublicKey` in `smrt-desktop.json`, the public half of that updater key.

**Placeholders to settle before any release.** The product identity is not decided: `bundleId` is
`invalid.example.tricia-placeholder`, and `productId` and `displayName` are provisional.
`updaterPublicKey` is left out, because the file's format has no way to mark a key as a placeholder.
The release preflight refuses the placeholder bundle identifier. Choose it carefully: it cannot be
changed cleanly once people have installed the app.

The icons are generated from the homepage's favicon with `tauri icon` and can be replaced.
