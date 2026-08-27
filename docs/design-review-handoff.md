# Handoff: vishwajeetsingh.in — design validation

**To:** the design reviewer
**From:** the inspection pass documented in [`docs/site-inventory.md`](./site-inventory.md)
**Ask:** validate the visual design, hierarchy, and mobile behaviour of the live page. Do not
write code. Return findings.

---

## Why this handoff exists

The original SEO handoff (metadata, crawlability, favicons, sitemap) was written by a reviewer
who could only fetch the deployed HTML. Because the site is a client-rendered Vite SPA, that
reviewer saw an empty `<div id="root">` and explicitly scoped design **out**:

> Visual design, content order, copy, mobile layout, and calls to action were **not**
> reviewable — the deployed HTML exposes none of them.

That gap is what you are here to close. The content inventory and the screenshots now exist.
Everything below is fact gathered from the repo and from a real browser; the judgement calls
are yours.

---

## How to see it

```bash
npm install
npm run build
npx vite preview --port 4173   # http://localhost:4173
```

Or `npm run dev` (port 8080) for hot reload.

Pre-captured full-page screenshots, both **dark theme**:

| File | Viewport | Full page |
|---|---|---|
| `docs/screenshots/home-1440-full.jpg` | 1440×900 | 1440 × 9,732 px |
| `docs/screenshots/home-390-full.jpg` | 390×844 | 396 × 18,612 px |

To re-capture at other widths or in light theme, run the preview server, launch a Chromium
with `--headless=new --remote-debugging-port=9222`, and drive it over CDP:
`Emulation.setDeviceMetricsOverride` → `Page.navigate` → `Page.captureScreenshot` with
`captureBeyondViewport: true` and a clip taken from `Page.getLayoutMetrics().cssContentSize`.
Naive `--screenshot --window-size=W,H` does **not** work here: the Hero is `min-h-screen`, so a
tall window just stretches the Hero to fill it.

### Read this before judging anything

**Both screenshots are dark theme, and that was not a design decision.** `ThemeProvider` uses
`defaultTheme="system"` and the capture machine is in dark mode. The light palette is fully
defined in `src/index.css` and has never been reviewed. **Please evaluate both themes.** There
is no theme toggle in the UI — the only way a visitor changes theme is by changing their OS
setting.

---

## The design system, as it actually exists

- **Tokens:** stock shadcn/ui defaults, unmodified. `tailwind.config.ts` contains **zero hex
  values**; every colour is `hsl(var(--token))`. Full light and dark token tables are in
  [`site-inventory.md` §D](./site-inventory.md#d-visual-tokens-actually-in-use).
- **Typography:** no web font, no `fontFamily` extension, no `@font-face`. Everything renders
  in the Tailwind default system stack (`ui-sans-serif, system-ui, …`). Type scale is
  ad-hoc Tailwind classes per component — there is no defined scale.
- **Radius:** single `--radius: 0.5rem` with `lg`/`md`/`sm` derived from it. Not redefined in
  dark.
- **Spacing rhythm:** every section is `py-20`; every section wraps content in
  `container mx-auto px-6`. The container caps at 1400px at `2xl`.
- **Motion:** one custom animation, `.animate-fade-in` (0.8s, opacity + 20px rise), used once
  on the Hero block. It is **not** wrapped in a `prefers-reduced-motion` guard. The Hero's
  `ArrowDown` uses Tailwind `animate-bounce`, also unguarded.

### Where the token system is escaped

These components hardcode colours outside the token system. Whether that is deliberate (a
photographic hero needs fixed-contrast text) or drift is a judgement call for you:

- `Hero.tsx` — `text-white`, `text-gray-200`, `text-gray-300`, `bg-black/40 dark:bg-black/60`,
  gradient `from-blue-400 to-purple-400`, and buttons pinned to
  `bg-white text-black … dark:bg-gray-100 dark:text-black`
- `AppSidebar.tsx` — avatar gradient `from-blue-500 to-purple-600`, `text-white`
- `Books.tsx` — `fill-yellow-400 text-yellow-400`, unfilled stars `text-gray-300`
- `Talks.tsx` — `bg-black/20`, `bg-white/90`, `text-gray-800` on the play button
- `NotFound.tsx` — `bg-gray-100`, `text-gray-600`, `text-blue-500`

Consequence worth ruling on: **the blue→purple gradient is the only accent colour on the
site.** The `--primary` token is near-black in light mode and near-white in dark, so every
button, tag pill, and icon is monochrome. The gradient appears exactly twice (sidebar avatar,
Hero's "Tech Problem Solver").

Second consequence: **`--card` is identical to `--background` in both themes.** Cards have no
surface elevation against the page; only their 1px `--border` separates them. All 36+ cards on
the page rely on that single hairline, plus a `hover:shadow-lg`.

---

## Page structure and section rhythm

One route (`/`), one long scroll, seven rendered sections. `Projects` is imported but its JSX
is commented out.

| Order | Section | `id` | Background |
|---|---|---|---|
| 1 | Hero | `home` | photo + `bg-black/40 dark:bg-black/60` |
| 2 | About | `about` | `bg-muted/30` |
| — | *Projects* | — | *commented out* |
| 3 | Talks | `talks` | `bg-background` |
| 4 | Podcasts | `podcasts` | `bg-muted/30` |
| 5 | Blogs | `blogs` | `bg-background` |
| 6 | Books | `books` | `bg-muted/30` |
| 7 | Contact | `contact` | `bg-muted/30` |

The alternating background rhythm holds for sections 2–6 and then **breaks: Books and Contact
are both `bg-muted/30`,** so they read as one continuous block. Removing `Projects` from the
layout is what shifted the parity.

Each section opens with the same centred block: `<h2 class="text-4xl font-bold mb-4">` plus a
`text-xl text-muted-foreground max-w-2xl mx-auto` subtitle, then `mb-16` before content. Seven
sections, seven identical openers.

---

## Specific things to rule on

Facts, with the design question attached. None of these are pre-judged.

### Hierarchy and first impression

1. **The Hero is the only section with imagery.** Everything below it is text cards on flat
   backgrounds for ~9,000 px (desktop). Does the page sustain interest?
2. **The `<h1>` is Devanagari only** — "विश्वजितसिंह देसुरकर". The Latin "Desurkar" subtitle
   exists in `Hero.tsx:35-37` but is commented out. Is a Latin-script name needed for
   non-Marathi/Hindi readers, and if so, at what weight?
3. **The first heading in the DOM is an `<h2>`** — the sidebar's "Portfolio" — which precedes
   the `<h1>`. Below that the outline is clean (h1 → h2 → h3, no skips). Is "Portfolio" the
   right label for a personal site's sidebar header, given the site has no projects section?
4. **The sidebar subtitle and the Hero tagline are both "Tech Problem Solver."** Intentional
   repetition or redundancy?

### Density and scale

5. **The Books section is 24 cards.** On mobile it is ~7,000 px of the page's 18,612 px — over
   a third of the entire site, in a single column, unfiltered and uncollapsed. Lighthouse
   flags the page at 1,079 DOM elements, and this grid is the heaviest subtree. Options a
   reviewer might weigh: filter by category, collapse behind a "show all", cap at N, or
   demote to a compact list.
6. **The card ordering in Books is neither alphabetical, chronological, nor grouped by
   category.** Is there an intended order?
7. **Ratings render as five star icons with no text alternative** — 120 decorative SVGs
   across the section, and no numeric label.
8. **The mobile page is 18,612 px — roughly 22 viewport heights.** There is no back-to-top
   affordance and the sidebar is off-canvas behind a fixed top-left trigger.

### Calls to action

9. **Talks and Podcasts have no outbound link at all.** Both components gate their
   "Watch"/"Listen" button on the link *not* being a YouTube URL (`Talks.tsx:154`,
   `Podcasts.tsx:135`) — and every entry is a YouTube URL, so the button never renders.
   Playback is inline-only, click-to-play on a thumbnail with a play overlay. Is
   "watch on YouTube" a CTA that should exist?
10. **All five Blog CTAs are labelled "Read More."** Lighthouse's SEO `link-text` audit fails
    on exactly these five. What should they say?
11. **Books cards have no CTA** — every entry carries `"link": "#"` and the "View Book" button
    is commented out (`Books.tsx:296-301`).
12. **The four "Find Me Online" links have no `target="_blank"`**, so LinkedIn, GitHub, X, and
    Slack all navigate away in the same tab. "Book Meeting" and the blog links *do* open in a
    new tab. Inconsistent — which is right?
13. **Two Hero buttons compete:** "Explore My Work" (solid white) scrolls to About, "Connect"
    (outline) scrolls to Contact. Is that the right primary?

### Repetition and dead ends

14. **Two talk cards are identical in title and description** — both "Connecting the Dots:
    Unleash the magic of AI in IoT" (Conf42 IoT Dec 2023, RubyConf India Aug 2023), differing
    only in event, location, date, and video. Merge, differentiate, or leave?
15. **Two sidebar nav items scroll nowhere:** "Portfolio" → `#projects` (section commented
    out) and "Resume" → `#resume` (no such section). *The owner has deferred this decision
    until after your review* — a recommendation from you is what unblocks it. The question is
    whether the site needs a Projects section and a Resume at all.
16. **Three sidebar-footer links are `href="#"`**, labelled with bare glyphs `𝕏`, `in`, `@`,
    with no accessible name. The real URLs already exist in `Contact.tsx`. Should the footer
    mirror them, or should the footer socials be dropped in favour of the Contact section's?
17. **Blog dates ship as the literal strings "Estimated 2023" and "Estimated late 2023."**
    Visible to users. Real dates, relative dates, or no dates?

### Themes and edge states

18. **Light theme is entirely unreviewed.** See the caveat above.
19. **The 404 page ignores the design system** — `bg-gray-100` and `text-gray-600` hardcoded,
    so it stays light in dark mode, uses no card/token styling, and shares nothing with the
    site's visual language.
20. **The Podcast card rendered blank in the headless capture** (visible in
    `home-1440-full.jpg` as an empty block under "Podcast Appearances"). The YouTube IFrame
    API player did not initialise. Verify in a real browser before treating it as a design
    issue — it may be a loading bug, not a layout one.

### Responsive

21. **6px horizontal overflow at 390px:** `document.documentElement.scrollWidth` is 396 against
    a `clientWidth` of 390. Reproduces with mobile emulation on and off. Traced to
    `SidebarInset` (`<main>` in `src/components/ui/sidebar.tsx`) measuring 396px inside a
    390px parent. No content element overflows its own box. **Root cause unconfirmed** —
    flagged as an observation, not a diagnosis.
22. Grid breakpoints in use: About `md:grid-cols-3`; Talks `md:grid-cols-2 lg:grid-cols-2`
    (the `lg` value is identical to `md`, so it does nothing); Podcasts `md:grid-cols-2` with
    a single card, so it renders half-width on desktop; Blogs `md:grid-cols-2`; Books
    `md:grid-cols-2 lg:grid-cols-3`; Contact socials `sm:grid-cols-2 lg:grid-cols-4`.
23. No arbitrary widths anywhere outside `src/components/ui/` — no `w-[…]`, `min-w-[…]`, or
    `max-w-[…]`. Layout is container + `max-w-2xl` / `max-w-4xl` + responsive grids.

---

## Already settled — do not re-litigate

- **Role title** is "Tech Problem Solver" (owner-confirmed).
- **X handle** is `@VishwaDesurkar` (owner-confirmed).
- **`og:image`**: the owner will supply `public/og.png` at 1200×630. If you have a view on
  what that image should show, say so — it does not exist yet.
- Commit `6ebf43d` replaced the Lovable placeholder metadata in `index.html` and added a
  pre-paint theme script. No component, style, or layout code has been changed.

## Out of scope for you

Metadata, crawlability/prerendering, favicons, manifest, robots/sitemap. Those are tasks 1–6
of the SEO handoff and are paused pending this review. Accessibility overlaps the design
brief where it is visual (contrast, focus visibility, icon labelling) — call those out. Focus
rings are already intact everywhere: no component outside `src/components/ui/` sets
`outline: none`, and every shadcn `outline-none` ships with a `focus-visible:ring-*`
replacement.

## What to send back

Findings against the 23 items above plus anything they missed, each with: the section and file,
what you observed, why it matters, and a recommendation. Flag which are blocking versus polish.
Where a fix implies a content decision the owner must make (real blog dates, whether a Resume
exists), say so rather than inventing the content.

## Reference

- [`docs/site-inventory.md`](./site-inventory.md) — full stack, route map, verbatim content
  inventory, token tables, structure checks, build output, Lighthouse results.
- Baseline Lighthouse, dark theme, local preview: mobile **89 / 100 / 96 / 92**, desktop
  **96 / 100 / 96 / 92** (Performance / Accessibility / Best Practices / SEO). The
  Accessibility 100 is scored against the rendered DOM and is not a substitute for a visual
  contrast pass.
