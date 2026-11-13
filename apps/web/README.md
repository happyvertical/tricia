# @tricia/web

The Tricia homepage: one static page (SvelteKit, Svelte 5, `adapter-static`,
TypeScript). It has no trackers, no analytics, no third-party scripts and no
runtime server. The copy is a draft.

## Run it

From the repository root (Node 26, pnpm 11):

```sh
pnpm install
pnpm dev                          # dev server
pnpm build                        # writes apps/web/build
pnpm --filter @tricia/web preview # serve the built output locally
```

## Output

`pnpm build` writes plain files to `apps/web/build`: `index.html`, the
`_app/` assets and `favicon.svg`. Any static file host can serve that folder.
Pages are pre-rendered with trailing slashes.

The illustration on the page is plain HTML and CSS with a small script that
steps through it. With reduced motion requested, or without script, all four
steps are shown at once.

## Hosting options for tricia.happyvertical.com

Nothing is set up yet. Each option needs a decision from the domain owner.

| Option                 | What it needs                                                                                                                                         |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub Pages           | A Pages source (a deploy workflow publishing `apps/web/build`), a `CNAME` for the domain, and a DNS `CNAME` record pointing at the GitHub Pages host. |
| Any static host or CDN | A build step running `pnpm build`, the `apps/web/build` folder as the publish directory, and a DNS record pointing the subdomain at the host.         |
| Own web server         | A copy of `apps/web/build` in the web root, TLS for the subdomain, and a DNS record for it.                                                           |
