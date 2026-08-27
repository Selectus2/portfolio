# Prerender plan — vishwajeetsingh.in

Status: **done** for the machinery and the two existing routes (`/` and the 404). Written
before implementation; kept as the record of what was decided and why.

## Problem

`CLAUDE.md` sets a per-page acceptance test: `curl -s <url> | grep -i desurkar` must return
text. The site is a Vite SPA whose built `index.html` ships an empty `<div id="root">`, so
that test returns nothing today and will keep returning nothing regardless of what
components get written. Separately, `/about/`, `/talks/`, `/open-source/` and `/projects/`
return real HTTP 404 from GitHub Pages, because no static file exists at those paths.

Both are build-level problems, not content problems. Every page's definition of done depends
on fixing them first.

## Chosen approach — hand-rolled Vite SSG

Vite builds a second time with `--ssr`. A Node script imports the SSR bundle, calls
`renderToString` once per route, injects the markup and per-route head tags into the client
build's `index.html`, and writes `dist/<route>/index.html`. The client entry switches from
`createRoot` to `hydrateRoot`.

No new runtime dependencies — `react-dom/server` is already present via `react-dom`.

### Alternatives rejected

| Option | Verdict |
| --- | --- |
| `react-snap` | Unmaintained since 2020, predates React 18 hydration. |
| `vite-plugin-prerender` | Wraps Puppeteer — downloads Chromium, slow and brittle in CI. |
| `vite-react-ssg` | Works, but forces a rewrite into data-router route objects and takes over the entry point. More churn than the problem needs. |
| Astro / Next migration | Correct long-term for a content site, but a rewrite, not this change. |

The content is fully static — no fetching, no per-request state. That is the case the
plain SSG recipe handles, and it leaves React Router, shadcn/ui, and the existing components
untouched.

## Steps

1. **Fix SSR crashers.** `ThemeProvider` reads `localStorage` in a `useState` initializer,
   which throws under Node. Guard it. (Verified already safe: `useIsMobile` touches `window`
   only inside `useEffect`; `sidebar.tsx` writes `document.cookie` only inside a callback;
   the inline theme script in `index.html` runs outside React.)
2. **Split the entry point.** Add `src/entry-server.tsx` exporting `render(url)` around
   `StaticRouter`; make `src/App.tsx` accept an injected router so one tree serves both
   `BrowserRouter` and `StaticRouter`; switch `src/main.tsx` to `hydrateRoot`.
3. **Route + metadata table** at `src/routes.tsx` — one entry per path carrying component,
   `title`, `description`, `lastmod` and optional JSON-LD. Single source consumed by the
   router, the prerenderer, and the sitemap generator, so the three cannot drift.
4. **Per-route head.** A `useDocumentHead()` hook updates title/description/canonical on
   client-side navigation; the prerenderer injects the same values into the static HTML.
   Avoids adding `react-helmet-async`.
5. **`scripts/prerender.mjs`.** Loop the route table, write `dist/<route>/index.html`, plus
   `dist/404.html` from the NotFound route. Generate `sitemap.xml` from the same table and
   append the `Sitemap:` line to `robots.txt`.
6. **Build wiring.** `build` becomes
   `vite build && vite build --ssr && node scripts/prerender.mjs`. Move `CNAME` into
   `public/` so it survives into `dist/` — see open item 8 in `site-inventory.md`; a
   custom-domain outage is the failure mode otherwise.
7. **Verify.** `npm run build`, serve `dist/`, then per route: `curl -s <url> | grep -i
   desurkar`, unique `<title>` and description, self-referencing canonical, and no hydration
   mismatch in the browser console.

   Done, except the browser console check — deferred by the owner. Hydration risks were
   cleared statically instead: `SidebarMenuSkeleton`'s `Math.random()` width never runs (the
   component is not rendered anywhere), `ThemeProvider` has no consumers so its Node
   fallback changes no markup, and `useIsMobile` returns `false` on the server and on the
   client's first render. Worth a console check the next time the site is opened in a
   browser.

## Scope boundary

This lands the machinery and migrates the existing `/` and the 404 route. It does **not**
write `/about/`, `/talks/`, `/community/` or the other target pages — those need content
decisions, and two of them are blocked on the LinkedIn and job-title questions flagged in
`CLAUDE.md`. Once this is in, adding a page is one entry in `src/routes.tsx` plus a
component.

## Result

`dist/` after `npm run build`:

```
dist/index.html     home, prerendered, 13 "desurkar" matches, one <h1>
dist/404.html       NotFound, prerendered, noindex, no canonical
dist/sitemap.xml    generated from the route table, excludes noindex routes
dist/robots.txt     Sitemap: line appended
dist/CNAME          now shipped from public/, so the custom domain survives deploys
```

`dist/server/` is deleted at the end of the prerender step — it is a build artifact, not
something to publish.

Adding a page from here is one entry in `src/routes.tsx` plus a component.

## Guardrail violations found while planning (not fixed by this change)

- `index.html` JSON-LD ships `"jobTitle": "Tech Problem Solver"` and
  `linkedin.com/in/vishwajeetsinghd/`. Both are ASK THE OWNER items in `CLAUDE.md`.
- `og:image` points at `https://vishwajeetsingh.in/og.png`, which does not exist in the repo.
