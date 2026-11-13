# Tricia

Tricia is an open source desktop app for one person, built on the
[smrt](https://github.com/happyvertical/smrt) app shell. She is being built to
turn the spreadsheets a business runs on into an app that the owner shapes by
talking to a built-in assistant.

Nothing is released yet. There is no installer to download.

## What is in this repository

- [`apps/web`](apps/web): the homepage, a static SvelteKit site, to be served at
  `tricia.happyvertical.com`.
- Releases and the update feed for the desktop app will be published here once
  there is a release. The desktop app itself will live in `apps/desktop`.

## Working on the homepage

Needs Node 26 and pnpm 11.

```sh
pnpm install
pnpm dev         # local dev server
pnpm build       # static site in apps/web/build
pnpm typecheck
pnpm lint        # Biome
```

See [`apps/web/README.md`](apps/web/README.md) for details and hosting options.
