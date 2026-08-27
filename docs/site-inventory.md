# Site inventory — vishwajeetsingh.in

Facts only, gathered before any code changes. Source of truth is the repo at commit `ecd1bd1`
(branch `main`) plus a local production build served with `vite preview` on
`http://localhost:4173`.

Measurement environment: macOS 25.3.0, Node v22.12.0, npm 10.9.0, Brave/Chromium 151
headless (no Google Chrome installed on this machine; Lighthouse was run with
`CHROME_PATH` pointed at Brave).

---

## A. Stack

### `package.json`

- `name`: `vite_react_shadcn_ts`, `version` `0.0.0`, `private: true`, `type: module`
- Framework: **React 18.3.1** (`react`, `react-dom` ^18.3.1)
- Build tool: **Vite ^5.4.1** (resolved 5.4.21) with `@vitejs/plugin-react-swc` ^3.5.0
- Language: **TypeScript ^5.5.3**
- Router: **react-router-dom ^6.26.2**
- Styling: **TailwindCSS ^3.4.11**, config at `tailwind.config.ts`; `postcss.config.js`
  loads `tailwindcss` + `autoprefixer`; plugins `tailwindcss-animate` ^1.0.7 and
  `@tailwindcss/typography` ^0.5.15 (typography is installed but **not** referenced in
  `tailwind.config.ts` `plugins`)
- Component library: **shadcn/ui** (`components.json` present) over 27 `@radix-ui/react-*`
  packages
- Icons: `lucide-react` ^0.462.0
- Theme: `next-themes` ^0.4.6 is a dependency, but `src/components/ThemeProvider.tsx` is a
  local implementation; `next-themes` is not imported anywhere in `src/`
- Server state: `@tanstack/react-query` ^5.56.2 (a `QueryClientProvider` is mounted; no
  query is issued anywhere)
- Forms/validation: `react-hook-form` ^7.53.0, `zod` ^3.23.8, `@hookform/resolvers` ^3.9.0
  (no form in the rendered app)
- Other bundled-but-unused-by-page-code deps: `recharts`, `embla-carousel-react`,
  `date-fns`, `react-day-picker`, `cmdk`, `input-otp`, `vaul`, `sonner`,
  `react-resizable-panels`
- **SEO / head dependency already installed: none.** No `react-helmet`,
  `react-helmet-async`, `@unhead/*`, `vite-plugin-prerender`, `react-snap`, or
  `vite-plugin-sitemap`.
- Hosting adapter: `gh-pages` ^6.3.0 (devDependency)
- Dev-only: `lovable-tagger` ^1.1.7

### Build scripts

```
dev        vite
build      vite build
build:dev  vite build --mode development
lint       eslint .
preview    vite preview
predeploy  npm run build
deploy     gh-pages -d dist
```

### `vite.config.ts`

- `server`: `host: "::"`, `port: 8080`
- `plugins`: `react()` (SWC); `componentTagger()` from `lovable-tagger`, **development mode
  only**
- `resolve.alias`: `@` → `./src`
- No `base` option (defaults to `/`), no `build` options, no prerender/SSG plugin.

### Lockfiles

Three lockfiles coexist in the repo root: `bun.lockb` (198 KB, tracked), `package-lock.json`
(265 KB, tracked), `yarn.lock` (156 KB, **untracked** — appears in `git status` as `??`).

### Deploy target

- `CNAME` at repo root contains `vishwajeetsingh.in`.
- `origin/gh-pages` currently contains: `.gitignore`, `CNAME`, `Vishwa.png`, `assets`,
  `background-2.png`, `background.png`, `favicon.ico`, `index.html`, `placeholder.svg`,
  `robots.txt`.
- `dist/` after `npm run build` contains: `assets/`, `background-2.png`, `favicon.ico`,
  `index.html`, `placeholder.svg`, `robots.txt`. It does **not** contain `CNAME`,
  `Vishwa.png`, or `background.png` — those three files on `gh-pages` are not produced by
  the build. (`CNAME` lives at the repo root, not in `public/`.)
- There is no `public/404.html`, so GitHub Pages has no SPA fallback for deep links.

---

## B. Routes and page files

`src/App.tsx` mounts `BrowserRouter` with two routes.

| Route | Component file | Lines | Content source |
|---|---|---|---|
| `/` | `src/pages/Index.tsx` | 35 | Hardcoded, via child components |
| `*` | `src/pages/NotFound.tsx` | 27 | Hardcoded |

`src/pages/Index.tsx` renders, in order: `AppSidebar`, then inside `<main className="flex-1">`:
`Hero`, `About`, `{/* <Projects /> */}` (commented out), `Talks`, `Podcasts`, `Blogs`,
`Books`, `Contact`.

Component files and line counts:

| File | Lines | Content | Rendered? |
|---|---|---|---|
| `src/components/Hero.tsx` | 88 | Hardcoded | yes |
| `src/components/About.tsx` | 73 | Hardcoded arrays | yes |
| `src/components/Talks.tsx` | 172 | Hardcoded array of 6 | yes |
| `src/components/Podcasts.tsx` | 153 | Hardcoded array of 1 | yes |
| `src/components/Blogs.tsx` | 111 | Hardcoded array of 5 | yes |
| `src/components/Books.tsx` | 311 | Hardcoded array of 24 | yes |
| `src/components/Contact.tsx` | 116 | Hardcoded | yes |
| `src/components/AppSidebar.tsx` | 81 | Hardcoded array of 9 | yes |
| `src/components/ThemeProvider.tsx` | 74 | — | yes (provider) |
| `src/components/Projects.tsx` | 107 | Hardcoded | **imported by `Index.tsx` but the JSX is commented out** |
| `src/components/Sidebar.tsx` | 102 | Hardcoded | **no — not imported anywhere** |
| `src/components/Navigation.tsx` | 64 | Hardcoded | **no — not imported anywhere** |

Nothing on the site is fetched at runtime. All content is hardcoded in `.tsx` files.

---

## C. Content inventory — route `/`

DOM order as rendered. Headings are quoted verbatim from source.

### C.0 Sidebar — `AppSidebar.tsx` (rendered before `<main>` in the DOM)

- Header: circular avatar with text `VS`; `<h2>` **"Portfolio"**; `<p>` "Tech Problem Solver"
- Menu buttons (all `<button>`, all scroll to `document.getElementById(sectionId)`):

  | Label | Target `sectionId` | Target section exists? |
  |---|---|---|
  | Home | `home` | yes |
  | About | `about` | yes |
  | Portfolio | `projects` | **no — `<Projects />` is commented out** |
  | Talks | `talks` | yes |
  | Podcasts | `podcasts` | yes |
  | Blogs | `blogs` | yes |
  | Books | `books` | yes |
  | Resume | `resume` | **no — no section with this id exists** |
  | Contact | `contact` | yes |

- Footer: three `<a>` elements, all `href="#"`, labelled with bare glyphs `𝕏`, `in`, `@`.
  No `aria-label`, no destination.

### C.1 Hero — `Hero.tsx`, `<section id="home">`

- Fixed top-left `SidebarTrigger` button (`z-50`)
- Background `<img src="/background-2.png" alt="Background">` (`w-full h-full object-cover`),
  overlaid with `bg-black/40 dark:bg-black/60`
- `<h1>` **"विश्वजितसिंह देसुरकर"** (Devanagari). The Latin subtitle `Desurkar` is present but
  commented out (`Hero.tsx:35-37`).
- Line: `I'm ` + gradient span **"Tech Problem Solver"**
- `<p>`: "Passionate about solving tough technical challenges and building communities
  through meetups and conferences. Aspiring entrepreneur with a love for sports."
- Buttons: **"Explore My Work"** → scrolls to `#about`; **"Connect"** → scrolls to `#contact`
- Bottom-centre bouncing `ArrowDown` icon (decorative, no label)

### C.2 About — `About.tsx`, `<section id="about">`

- `<h2>` **"About Me"**
- `<p>`: "A passionate technologist with a mission to solve real-world problems and build
  meaningful communities."
- Three cards, each `<h3>` + description:
  - **"Problem Solving"** — "Passionate about solving tough technical challenges"
  - **"Community Building"** — "Organizing meetups and bringing tech enthusiasts together"
  - **"Conference Speaking"** — "Sharing knowledge and insights at tech conferences"
- `<h3>` **"Beyond Technology"**, then four icon+text rows:
  - "Sports: Cricket, Table Tennis, Badminton, Football"
  - "Reading Books"
  - "Coffee Brewing"
  - "Building My Startup"
- No links or buttons in this section.

### C.3 Talks — `Talks.tsx`, `<section id="talks">`

- `<h2>` **"Conference Talks"**
- `<p>`: "Sharing knowledge and insights at tech conferences worldwide."
- Six cards. Each renders a 16:9 YouTube thumbnail
  (`https://img.youtube.com/vi/<id>/maxresdefault.jpg`, `alt` = talk title) with a play
  overlay; clicking swaps it for an autoplay-muted `<iframe>`. Because a video ID resolves
  for all six, the **"Watch" button is never rendered** (`Talks.tsx:154` gates it on
  `!getYouTubeId(talk.link)`), so there is no outbound link from any talk card.

  | `<h3>` title | Event | Location | Date | Video |
  |---|---|---|---|---|
  | What if… Ruby Led the AI Revolution? | RubyConf India 2025 | Jaipur, India | September 2025 | `1h5RZWSL4Oc` |
  | The Harvey Dent Dilemma: Ruby's White Knight Rises (or Falls) | RubyConf India 2024 | Jaipur, India | November 2024 | `8LYHEzQL_-4` |
  | Concurrency Showdown: Threads vs Fibers | RubyConf Australia 2024 | Sydney, Australia | April 2024 | `kU22NJq1sS0` |
  | Connecting the Dots: Unleash the magic of AI in IoT | Conf42 Internet of Things | Online | December 2023 | `Dg8JuIzPUvI` |
  | Connecting the Dots: Unleash the magic of AI in IoT | RubyConf India 2023 | Pune, India | August 2023 | `YhkEQ9pP-W0` |
  | Beyond Cubical | Prose & Code – FC Pune | Pune, India | August 2022 | `nnF_fbvtM0w` |

  Descriptions verbatim (all under 300 characters except where marked):

  - *What if… Ruby Led the AI Revolution?* — "What if Ruby never sat out the AI boom? What if
    it quietly evolved—unlocking the ability to build intelligent apps with semantic
    understanding, local models, and smart automation? In this talk, we step into an
    alternate reality where Ruby leads the AI charge."
  - *The Harvey Dent Dilemma* — "A deep dive into Ruby's most powerful—and potentially
    risky—performance features. Topics include frozen strings, memoization, monkey patching,
    metaprogramming, Proc vs. Lambda, and new enhancements in Ruby 3.0. Learn how to use
    these advanced tools effectively while avoiding hidden dangers."
  - *Concurrency Showdown* — "A comparative exploration of Ruby's concurrency models—threads
    vs fibers. Covers mutex locks, race conditions, deadlocks, and interrupt handling.
    Demonstrates a hybrid model using fibers for I/O-bound tasks and threads for CPU work,
    emphasizing Ruby 3.0's fiber enhancements."
  - *Connecting the Dots* (both entries, identical text) — "Dives into AI‑driven IoT
    solutions using Ruby. Showcases demos on preventive maintenance and anomaly detection
    with live Ruby-powered IoT devices. Highlights how language features and AI can optimize
    IoT performance."
  - *Beyond Cubical* — "A personal tale of stepping out of conventional corporate structures.
    Through an intimate narrative, Vishwajeetsingh reflects on life beyond cubicles during his
    internship, intertwining creativity and code."

  Note: the two *Connecting the Dots* cards share a title and description and differ only by
  event/location/date/video.

### C.4 Podcasts — `Podcasts.tsx`, `<section id="podcasts">`

- `<h2>` **"Podcast Appearances"**
- `<p>`: "Conversations about technology, problem-solving, and entrepreneurship."
- One card:
  - `<h3>` **"Vishwajeetsingh Shares His Vision and Experience with AI in Ruby on Rails"**
  - Show: "RubyConf 2024 Rewind" · Duration: "9 min" · Date: "Nov 2024"
  - Description (>300 chars, truncated): "During the conversation, Vishwajeetsingh Desurkar
    spills the beans on how AI-driven tools could streamline development workflows, enhance
    application performance, and enable smarter decision-making within Rails applications.He
    has also highlighted emerging libraries and […]"  *(sic: missing space after
    "applications.")*
  - Link `https://www.youtube.com/watch?v=wDtfXBZ61ig&t=25s`, embedded via the YouTube IFrame
    API loaded at runtime from `https://www.youtube.com/iframe_api`. The "Listen" button is
    gated on the link **not** being a `youtube.com/watch` URL, so it is never rendered — no
    outbound link from this card.
  - **Observed in headless capture: the player area rendered blank** (see
    `docs/screenshots/home-1440-full.jpg`, the empty block under the Podcast Appearances
    heading). The `useEffect` depends on `[podcasts]`, an array literal recreated every
    render.

### C.5 Blogs — `Blogs.tsx`, `<section id="blogs">`

- `<h2>` **"Blog Posts"**
- `<p>`: "Thoughts on technology, problem-solving, and building communities."
- Five cards. Every card's CTA is a link labelled **"Read More"** (identical label ×5).
  Platform on all five: `blog.vishwajeetsingh.in`.

  | `<h3>` title | Date shown | Read time | Tags | Link |
  |---|---|---|---|---|
  | A Journey of Learning and Growth | "Estimated 2023" | 3 min read | Learning, Personal Growth, Reflection | `…/a-journey-of-learning-and-growth` |
  | Bringing Intelligence Closer to Home: The Future of Smart Housing with Fog Computing | "Estimated 2023" | 3 min read | Fog Computing, Smart Homes, Edge AI | `…/bringing-intelligence-closer-to-home-the-future-of-smart-housing-with-fog-computing` |
  | From Pixels to Poetry: How Generative Adversarial Networks Are Revolutionising Creative Industries | "Estimated 2023" | 3 min read | GANs, Creativity, AI | `…/from-pixels-to-poetry-how-generative-adversarial-networks-are-revolutionising-creative-industries` |
  | Unleash Rails 7 UI Development with ESBuild | "Estimated late 2023" | 3 min read | Rails 7, ESBuild, Frontend | `…/unleash-rails-7-ui-development-with-esbuild` |
  | Launch Like a Pro with K6 | "Estimated 2023" | 4 min read | Performance Testing, K6, DevOps | `…/launch-like-a-pro-with-k6` |

  The literal string "Estimated 2023" / "Estimated late 2023" is what ships to users.

### C.6 Books — `Books.tsx`, `<section id="books">`

- `<h2>` **"Books I've Read"**
- `<p>`: "Books that have shaped my thinking on technology, entrepreneurship, and personal
  growth."
- 24 cards in a `md:grid-cols-2 lg:grid-cols-3` grid. Each has `<h3>` title, "by {author}",
  year, category pill, 5-star rating, description, and a quoted review. Every entry carries
  `"link": "#"`, but the "View Book" button is commented out (`Books.tsx:296-301`), so no
  link renders.

  | Title | Author | Category | Rating | Year |
  |---|---|---|---|---|
  | The Mine | Arnab Ray | Fiction – Indian | 3 | 2012 |
  | Hard Times | Charles Dickens | Fiction – Global | 4 | 1854 |
  | LVOE | Atticus Poetry | Poetry – Global | 4 | 2021 |
  | Drohaparva (Marathi Edition) | Ajey Zankar | Fiction – Marathi | 4 | 2016 |
  | The Art of War | Sun Tzu | Non-Fiction – Self-Improvement | 5 | 5th century BC |
  | Siddhartha | Hermann Hesse | Fiction – Global | 5 | 1922 |
  | The Secret Of The Nagas | Amish Tripathi | Fiction – Indian | 4 | 2011 |
  | The Oath Of The Vayuputras | Amish Tripathi | Fiction – Indian | 4 | 2013 |
  | Think and Grow Rich | Napoleon Hill | Non-Fiction – Self-Improvement | 4 | 1937 |
  | The Sage's Secret | Abhinav | Fiction – Indian | 3 | 2018 |
  | Dr. Jekyll and Mr. Hyde | Robert Louis Stevenson | Fiction – Global | 4 | 1886 |
  | The 5 AM Club | Robin S. Sharma | Non-Fiction – Self-Improvement | 4 | 2018 |
  | The Psychology of Money | Morgan Housel | Non-Fiction – Self-Improvement | 5 | 2020 |
  | I Still Think About You | Arpit Vageria | Fiction – Indian | 3 | 2018 |
  | How To Stop Worrying And Start Living | Dale Carnegie | Non-Fiction – Self-Improvement | 4 | 1948 |
  | The Richest Man In Babylon | George S. Clason | Non-Fiction – Self-Improvement | 4 | 1926 |
  | The Immortals Of Meluha | Amish Tripathi | Fiction – Indian | 4 | 2010 |
  | Murder on the Orient Express | Agatha Christie | Fiction – Global | 5 | 1934 |
  | The Almanack of Naval Ravikant | Eric Jorgenson | Entrepreneurship | 5 | 2020 |
  | Before You Start Up | Pankaj Goyal | Entrepreneurship | 4 | 2018 |
  | Ikigai | Hector Garcia Puigcerver | Non-Fiction – Self-Improvement | 4 | 2016 |
  | The Lean Startup | Eric Ries | Entrepreneurship | 5 | 2011 |
  | Zero to One | Peter Thiel, Blake Masters | Entrepreneurship | 5 | 2014 |
  | The Marketing Gita | Prateek Maheshwari, Sagar Venkateshwar | Entrepreneurship | 3 | 2023 |

  Note: the `renderStars` helper renders 5 `Star` icons per card with no text alternative and
  no `aria-label` for the numeric rating (24 × 5 = 120 decorative SVGs).

  Note: the DOM order of this list is neither alphabetical, chronological, nor grouped by
  category.

### C.7 Contact — `Contact.tsx`, `<section id="contact">`

- `<h2>` **"Let's Connect"**
- `<p>`: "Whether you need help solving a tech challenge, want to discuss startup ideas, or
  just grab a coffee and talk about sports - I'm always excited to connect!"
- Two cards:
  - `<h3>` **"Direct Contact"** — "Ready to solve your next tech challenge or discuss
    collaboration opportunities?" → button **"Send Email"** → `mailto:vishwajeetsinghd@gmail.com`
  - `<h3>` **"Schedule a Meeting"** — "Book a time to discuss your project, attend a meetup,
    or just have a chat." → button **"Book Meeting"** →
    `https://calendly.com/vishwajeetsinghd/30min` (`target="_blank" rel="noopener noreferrer"`)
- `<h3>` **"Find Me Online"** — four links. **None has `target="_blank"` or `rel`**, so all
  four navigate away in the same tab:

  | Label | Description | href |
  |---|---|---|
  | LinkedIn | Professional network | `https://www.linkedin.com/in/vishwajeetsinghd/` |
  | GitHub | Code repositories | `https://github.com/selectus2/` |
  | Twitter | Tech thoughts & updates | `https://x.com/VishwaDesurkar` |
  | Slack | Ruby Community discussions | `https://bit.ly/ruby-india` |

  Each still carries the source comment `// User will add later`.
- A "Current Status / Response Time" block is present but commented out (`Contact.tsx:102-109`).

### C.8 Images across the page (rendered, desktop 1440)

| # | Source | `alt` | Natural size | `width`/`height` attrs |
|---|---|---|---|---|
| 1 | `/background-2.png` (966 KB) | `"Background"` | 1000×562 | MISSING |
| 2 | `img.youtube.com/vi/1h5RZWSL4Oc/maxresdefault.jpg` | talk title | 1280×720 | MISSING |
| 3 | `img.youtube.com/vi/8LYHEzQL_-4/maxresdefault.jpg` | talk title | 1280×720 | MISSING |
| 4 | `img.youtube.com/vi/kU22NJq1sS0/maxresdefault.jpg` | talk title | 1280×720 | MISSING |
| 5 | `img.youtube.com/vi/Dg8JuIzPUvI/maxresdefault.jpg` | talk title | 1280×720 | MISSING |
| 6 | `img.youtube.com/vi/YhkEQ9pP-W0/maxresdefault.jpg` | talk title | 1280×720 | MISSING |
| 7 | `img.youtube.com/vi/nnF_fbvtM0w/maxresdefault.jpg` | talk title | 1280×720 | MISSING |

No `loading="lazy"` on any image. No `<picture>`, no WebP/AVIF. `public/placeholder.svg` is
shipped but never referenced from `src/`.

### C.9 Route `*` — `NotFound.tsx`

- `<h1>` **"404"**, `<p>` "Oops! Page not found", `<a href="/">` "Return to Home".
- Container is `bg-gray-100` with `text-gray-600` — hardcoded light-mode greys, not design
  tokens, so this page does not follow the dark theme.
- `useEffect` logs `console.error("404 Error: User attempted to access non-existent route:", …)`.

---

## D. Visual tokens actually in use

### `tailwind.config.ts`

- `darkMode: ["class"]`
- `content`: `./pages/**/*.{ts,tsx}`, `./components/**/*.{ts,tsx}`, `./app/**/*.{ts,tsx}`,
  `./src/**/*.{ts,tsx}` — the first three globs match nothing in this repo.
- `prefix: ""`
- `theme.container`: `center: true`, `padding: '2rem'`, `screens: { '2xl': '1400px' }`
- `theme.extend.colors`: every colour is `hsl(var(--token))`. **No hex values anywhere in the
  config.** Tokens: `border`, `input`, `ring`, `background`, `foreground`, and
  DEFAULT/foreground pairs for `primary`, `secondary`, `destructive`, `muted`, `accent`,
  `popover`, `card`, plus the `sidebar.*` group.
- `theme.extend.borderRadius`: `lg: var(--radius)`, `md: calc(var(--radius) - 2px)`,
  `sm: calc(var(--radius) - 4px)`
- `theme.extend.keyframes` / `animation`: `accordion-down`, `accordion-up` only
- `plugins`: `tailwindcss-animate` only
- **No `fontFamily` extension, no custom spacing, no custom screens beyond the container
  override.**

### `src/index.css` custom properties

`:root` (light):

```
--background 0 0% 100%          --foreground 222.2 84% 4.9%
--card 0 0% 100%                --card-foreground 222.2 84% 4.9%
--popover 0 0% 100%             --popover-foreground 222.2 84% 4.9%
--primary 222.2 47.4% 11.2%     --primary-foreground 210 40% 98%
--secondary 210 40% 96.1%       --secondary-foreground 222.2 47.4% 11.2%
--muted 210 40% 96.1%           --muted-foreground 215.4 16.3% 46.9%
--accent 210 40% 96.1%          --accent-foreground 222.2 47.4% 11.2%
--destructive 0 84.2% 60.2%     --destructive-foreground 210 40% 98%
--border 214.3 31.8% 91.4%      --input 214.3 31.8% 91.4%
--ring 222.2 84% 4.9%           --radius 0.5rem
--sidebar-background 0 0% 98%   --sidebar-foreground 240 5.3% 26.1%
--sidebar-primary 240 5.9% 10%  --sidebar-primary-foreground 0 0% 98%
--sidebar-accent 240 4.8% 95.9% --sidebar-accent-foreground 240 5.9% 10%
--sidebar-border 220 13% 91%    --sidebar-ring 217.2 91.2% 59.8%
```

`.dark`:

```
--background 222.2 84% 4.9%     --foreground 210 40% 98%
--card 222.2 84% 4.9%           --card-foreground 210 40% 98%
--popover 222.2 84% 4.9%        --popover-foreground 210 40% 98%
--primary 210 40% 98%           --primary-foreground 222.2 47.4% 11.2%
--secondary 217.2 32.6% 17.5%   --secondary-foreground 210 40% 98%
--muted 217.2 32.6% 17.5%       --muted-foreground 215 20.2% 65.1%
--accent 217.2 32.6% 17.5%      --accent-foreground 210 40% 98%
--destructive 0 62.8% 30.6%     --destructive-foreground 210 40% 98%
--border 217.2 32.6% 17.5%      --input 217.2 32.6% 17.5%
--ring 212.7 26.8% 83.9%
--sidebar-background 240 5.9% 10%   --sidebar-foreground 240 4.8% 95.9%
--sidebar-primary 224.3 76.3% 48%   --sidebar-primary-foreground 0 0% 100%
--sidebar-accent 240 3.7% 15.9%     --sidebar-accent-foreground 240 4.8% 95.9%
--sidebar-border 240 3.7% 15.9%     --sidebar-ring 217.2 91.2% 59.8%
```

These are stock shadcn defaults, unmodified. `--card` equals `--background` in both themes,
so cards have no surface contrast against the page (only their `--border` separates them).
`.dark` does not redefine `--radius`.

Custom utility: `.animate-fade-in` → `fadeIn 0.8s ease-out` (`opacity 0→1`,
`translateY(20px)→0`). Not wrapped in a `prefers-reduced-motion` guard. Used once, on the
Hero content block.

Hardcoded colours outside the token system (in rendered components):

- `Hero.tsx`: `text-white`, `text-gray-200`, `text-gray-300`, `bg-black/40 dark:bg-black/60`,
  gradient `from-blue-400 to-purple-400`, buttons `bg-white text-black hover:bg-gray-200
  dark:bg-gray-100 dark:text-black dark:hover:bg-white`, `border-white text-white
  hover:bg-white hover:text-black`
- `AppSidebar.tsx`: avatar gradient `from-blue-500 to-purple-600`, `text-white`
- `Books.tsx`: `fill-yellow-400 text-yellow-400`, unfilled `text-gray-300`
- `Talks.tsx`: `bg-black/20`, `bg-white/90`, `text-gray-800`
- `NotFound.tsx`: `bg-gray-100`, `text-gray-600`, `text-blue-500 hover:text-blue-700`

### Fonts

- **No `@font-face`, no Google Fonts `<link>`, no `fontFamily` in `tailwind.config.ts`, no
  local font files.**
- Computed `font-family` on `<body>` at runtime:
  `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
  — i.e. the Tailwind default system stack.
- No web font is requested, so there is nothing to preload and `font-display` is not
  applicable. (Lighthouse's `font-display-insight` still fails; the flagged fonts come from
  the third-party YouTube embed, not from this site.)

### `src/App.css`

Dead Vite starter CSS: `#root { max-width: 1280px; margin: 0 auto; padding: 2rem;
text-align: center; }`, `.logo`, `.card`, `.read-the-docs`, `logo-spin` keyframes. **The file
is not imported anywhere** (`src/main.tsx` imports only `./index.css`), so none of it applies.

---

## E. Structure checks

### `<h1>` count and heading sequence

Route `/` — exactly **one** `<h1>`. Rendered heading sequence in DOM order:

```
H2  Portfolio                      ← sidebar, appears BEFORE the h1
H1  विश्वजितसिंह देसुरकर
H2  About Me
H3  Problem Solving / Community Building / Conference Speaking
H3  Beyond Technology
H2  Conference Talks
H3  ×6 (talk titles)
H2  Podcast Appearances
H3  ×1
H2  Blog Posts
H3  ×5
H2  Books I've Read
H3  ×24
H2  Let's Connect
H3  Direct Contact / Schedule a Meeting
H3  Find Me Online
```

Findings: the document's first heading is an `<h2>` ("Portfolio", the sidebar header), which
precedes the `<h1>`. Below that, levels descend without skips (h1 → h2 → h3 only). Route `*`
has one `<h1>` ("404").

The sidebar `<h2>Portfolio</h2>` is not inside a landmark distinct from the page content
heading outline.

### Focus handling

No component under `src/components/` (excluding `src/components/ui/`) sets `outline: none`
or `focus:outline-none`. Within shadcn primitives, `outline-none` always ships with a
`focus-visible:ring-*` replacement:

- `ui/button.tsx:8` — `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- `ui/sidebar.tsx:440, 461, 513, 607, 723` — `outline-none ring-sidebar-ring … focus-visible:ring-2`

So every interactive element has a visible focus ring. No unreplaced outline removal found.

Elements with **no** accessible name: the three sidebar-footer `<a href="#">` links contain
only the glyphs `𝕏`, `in`, `@` inside a `<div>`; they have no `aria-label`. (Counted as links,
not buttons — the automated icon-only-*button* count was 0.)

### Hardcoded widths

No `w-[…]`, `min-w-[…]`, or `max-w-[…]` arbitrary values exist in any file outside
`src/components/ui/`. Layout uses `container mx-auto px-6`, `max-w-2xl`, `max-w-4xl`, and
responsive grids only.

### Horizontal overflow at 390px — measured

```
documentElement.clientWidth = 390
documentElement.scrollWidth = 396      ← 6px horizontal overflow
body.scrollWidth            = 396
```

Reproduces with mobile emulation both on and off. Twenty elements report `right = 396`; all
of them are descendants of `<main class="relative flex min-h-svh flex-1 flex-col …">`
(the `SidebarInset` from `src/components/ui/sidebar.tsx`), which measures 396px inside a
390px parent (`div.min-h-screen.flex.w-full`, 390px). No content element inside it
overflows its own box (`scrollWidth > clientWidth` matched only one `.sr-only` span). The
Radix toast viewport `<ol class="fixed top-0 … w-full … p-4">` also measures 396px.
**Root cause not confirmed** — reported as an observation, not a diagnosis.

### Theme at capture time

`<html class="dark">`. `ThemeProvider` uses `defaultTheme="system"` with
`storageKey="portfolio-theme"`, and the capture machine is in dark mode. All screenshots and
Lighthouse runs below are **dark theme**. Light theme was not captured.

---

## F. Deployed reality

### `npm run build`

```
vite v5.4.21 building for production...
✓ 1733 modules transformed.
dist/index.html                   1.01 kB │ gzip:   0.43 kB
dist/assets/index-DD6d3hig.css   65.94 kB │ gzip:  11.42 kB
dist/assets/index-CTFx_5Fa.js   395.20 kB │ gzip: 123.43 kB
✓ built in 1.37s
```

Warnings: one, unrelated to code — `Browserslist: browsers data (caniuse-lite) is 8 months
old`. No chunk-size warning (the JS bundle is under Vite's 500 kB default limit). Single JS
chunk, single CSS chunk, no code splitting.

### Crawlability — confirmed

`curl -s http://localhost:4173 | grep -ic "<h1"` → **0**. The served
`dist/index.html` is:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>vish-selectus-showcase</title>
    <meta name="description" content="Lovable Generated Project" />
    <meta name="author" content="Lovable" />
    <meta property="og:title" content="vish-selectus-showcase" />
    <meta property="og:description" content="Lovable Generated Project" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    <script type="module" crossorigin src="/assets/index-CTFx_5Fa.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-DD6d3hig.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

`<html lang="en">` is already correct. There is no `<link rel="icon">` (the browser only
finds `/favicon.ico` by convention), no `<link rel="canonical">`, no JSON-LD, no manifest, no
`apple-touch-icon`, no sitemap reference. This matches the handoff document's observation
exactly.

### `public/robots.txt` (current contents)

```
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /
```

No `Sitemap:` line. There is no `public/sitemap.xml`.

### `public/` contents

| File | Size | Referenced from |
|---|---|---|
| `background-2.png` | 966 KB (PNG) | `Hero.tsx` |
| `favicon.ico` | 7.6 KB | nothing explicitly; browser default lookup |
| `placeholder.svg` | 3.3 KB | nothing (Lovable leftover) |
| `robots.txt` | 160 B | — |

No `favicon.svg`, no `apple-touch-icon.png`, no `site.webmanifest`, no `og.png`.

### Lighthouse (Brave/Chromium 151 headless, against `vite preview`, dark theme)

Run against localhost, so network/TTFB figures are optimistic versus GitHub Pages.

| Category | Mobile | Desktop |
|---|---|---|
| Performance | **89** | **96** |
| Accessibility | **100** | **100** |
| Best Practices | **96** | **96** |
| SEO | **92** | **92** |

Mobile Core Web Vitals: FCP 1,509 ms · LCP 3,635 ms · TBT 106 ms · CLS 0 · Speed Index 1,521 ms.

Important caveat: Lighthouse audits the **rendered** DOM, so Accessibility 100 and SEO 92 do
not reflect what a non-JS crawler sees (which is an empty `<div id="root">`). The SEO score
is also not penalised for the placeholder title/description — the tags exist, they are just
wrong.

Failing / partial audits, mobile:

- `seo` → **`link-text` = 0**: "Links do not have descriptive text" — 5 links, all the
  `Read More` links in the Blogs section.
- `best-practices` → **`inspector-issues` = 0**: a third-party Cookie issue from the YouTube
  embed (`youtube.com/embed/wDtfXBZ61ig?…`).
- `performance`:
  - `largest-contentful-paint` = 0.6 — LCP element is `section#home > div.relative >
    div.animate-fade-in > p.text-lg` (the Hero paragraph), at 3,630 ms. TTFB is 12% of it;
    the rest is render delay.
  - `total-byte-weight` = 0.5 — **2,715 KiB total**. Largest: `/background-2.png` 966 KB,
    YouTube `player_embed_es6` JS 477 KB, YouTube `ytembeds.base` 241 KB + 158 KB, six
    `maxresdefault.jpg` thumbnails at 89–137 KB each, app JS 124 KB.
  - `uses-responsive-images` = 0.5 — est. saving **485 KiB**; six 1280×720 thumbnails
    rendered at 314×161 CSS px.
  - `modern-image-formats` = 0.5 — no WebP/AVIF.
  - `unused-javascript` = 0 — est. saving 53 KiB; **43.7% of the app bundle is unused** on
    first load.
  - `dom-size` = 0 — **1,079 elements**; the heaviest subtree is
    `section#books > div.container > div.grid` (7,012 px tall on mobile).
  - `third-party-facades` = 0.5 — the YouTube embed can be facaded.
  - `render-blocking-resources`, `uses-rel-preconnect`, `forced-reflow-insight`,
    `network-dependency-tree-insight` all = 0.
  - `uses-long-cache-ttl` / `cache-insight` = 0.5 — an artefact of `vite preview`, not
    representative of GitHub Pages.
- Desktop adds `prioritize-lcp-image` = 0.5 and `lcp-discovery-insight` = 0; drops `dom-size`
  to 0.5.

Notes on two audits that look alarming but are not this site's code: `font-display-insight`
fails because of fonts loaded by the YouTube iframe (the site itself loads no web font), and
the cache audits reflect `vite preview` headers.

### Screenshots

Full-page, captured over the Chrome DevTools Protocol with `captureBeyondViewport`, dark
theme:

- `docs/screenshots/home-1440-full.jpg` — viewport 1440×900, full page **1440×9,732 px**
- `docs/screenshots/home-390-full.jpg` — viewport 390×844, full page **396×18,612 px**

Observations visible in the captures (recorded as facts, not opinions):

- Desktop: the sidebar is expanded by default and occupies the left column; the Hero is the
  only section using the photographic background.
- Desktop: the Podcast Appearances card renders an empty region where the YouTube player
  should be (the IFrame API player did not initialise in the headless capture).
- Mobile: the page is 18,612 px tall — roughly 22 viewport heights, of which the Books grid
  is about 7,000 px.
- Mobile: the sidebar is off-canvas (Sheet); the `SidebarTrigger` sits fixed at top-left over
  the Hero.

---

## Open items flagged for the owner (facts requiring a decision, not guesses)

These are gaps the implementing agent cannot fill without owner input. Listed here so they
are not silently invented during tasks 1–6.

1. **Role title** for `<title>`, `og:title`, and JSON-LD `jobTitle`. The site's own copy says
   "Tech Problem Solver" (Hero, sidebar subtitle) — usable, but it is a tagline, not a job
   title.
2. **Twitter handle** for `twitter:site` / `twitter:creator`. `@VishwaDesurkar` is inferable
   from `https://x.com/VishwaDesurkar` in `Contact.tsx` but has not been confirmed by the
   owner.
3. **`og:image`** — no 1200×630 image exists in the repo. One must be supplied or produced.
4. **Favicon set** — only the Lovable `favicon.ico` exists. `favicon.svg`,
   `apple-touch-icon.png`, and manifest icons must be supplied.
5. **Sidebar footer social links** — three `href="#"` placeholders. The real URLs exist in
   `Contact.tsx`; whether the footer should mirror them is the owner's call.
6. **"Portfolio" and "Resume" nav items** point at `#projects` and `#resume`, neither of
   which exists. Either the sections get built, or the nav items get removed.
7. **Blog dates** ship as the literal strings "Estimated 2023" / "Estimated late 2023".
   Real publication dates are needed before they can go in a sitemap `lastmod`.
8. **`CNAME` is not in `public/`**, so it is absent from `dist/`. Whether `gh-pages -d dist`
   preserves the existing `CNAME` on the `gh-pages` branch needs verifying before the next
   deploy — a custom-domain outage is the failure mode.
