 CLAUDE.md — vishwajeetsingh.in
 
Drop this file at the root of the site repo. Claude Code reads it automatically at the start of every session, so these guardrails apply to all future work here without being re-pasted.
 
## Who this site is for
 
**Vishwajeetsingh Desurkar** — Ruby on Rails engineer based in **Pune, Maharashtra, India**.
 
The site's job: be the single page on the web that connects his name to his Ruby/Rails work, his open-source gems, his conference talks, and the communities he organises. Today it does none of that.
 
## Marathi

He is a Marathi speaker and wants Devanagari used where it fits. The pattern follows
Deccan Queen on Rails: Marathi is the visible text, the English gloss appears on
interaction. Use `<Marathi en="English">मराठी</Marathi>` (`src/components/Marathi.tsx`),
which reveals on hover **and** keyboard focus, and also carries `title` and `lang="mr"`.

**Never write Marathi that is not already verified.** A wrong translation on a proud
Marathi speaker's own site is worse than no Marathi at all. Verified so far:

| Marathi | English | Source |
|---|---|---|
| विश्वजितसिंह देसुरकर | his name | this repo's original `Hero.tsx` |
| पुणे | Pune | deccanqueenonrails.com |
| आपले स्वागत आहे | Welcome | deccanqueenonrails.com |

To add more, get the exact strings from the owner or from deccanqueenonrails.com. Do not
transliterate, machine-translate, or guess.

## HARD RULES — do not break these
 
1. **Never invent a fact.** No achievements, talks, employers, clients, contributions, community roles, dates, metrics, testimonials, or logos that are not in the VERIFIED FACTS section below. If a section needs content that isn't listed there, leave a `TODO:` comment and tell the user — do not fill the gap with plausible-sounding copy.
2. **Never describe `payu-ruby` or `trainers-rb` as a Rails engine.** `payu-ruby` has zero runtime dependencies; its own CHANGELOG says "Framework-agnostic — no Rails dependency." The correct word is **framework-agnostic**.
3. **Never present download counts as users or adoption.** If a number appears at all, it is a raw RubyGems download count with its date. Preferably omit.
4. **Never put a claim in structured data (JSON-LD) that is not visible as text on the same page.** This is both a Google policy violation and against the owner's stated wishes.
5. **No placeholder/lorem content in committed code.** No stock testimonials, no fake client logos, no "500+ projects delivered" style metrics.
6. **Do not add analytics that set cookies** without asking. Preference is Plausible or similar.
7. **Every page must be crawlable.** The acceptance test for any page is: `curl -s <url> | grep -i desurkar` returns text. A client-rendered empty body fails.
## VERIFIED FACTS — the only claims allowed on this site
 
### Identity
- Name: **Vishwajeetsingh Desurkar** — the full spelling. Use it in `<title>`, meta
  descriptions and structured data, where the exact string is what search matches on.
- Known as: **Vishwa** — confirmed by the owner 2026-08-27. This is what the interface
  calls him: navbar, hero, footer, page headings and conversational copy. Do not put the
  full name in chrome or body prose where the site is simply addressing him.
- Devanagari: **विश्वजितसिंह देसुरकर** — he is a Marathi speaker and wants the script
  used where it fits. This exact string comes from the site's original Hero component;
  do not transliterate anything new. Always wrap it in an element with `lang="mr"`.
  Currently shown in the home hero and on /about/.
- `Vishwajeet Singh Desurkar`, `Vishwa` and `विश्वजितसिंह देसुरकर` are all accepted
  `alternateName` values in JSON-LD. All three are rendered as visible text on /about/,
  per hard rule 4.
- Location: **Pune, Maharashtra, India** (never "Chakan")
- Email: `vishwajeetsinghd@gmail.com`
- Site: `https://vishwajeetsingh.in`
- Blog: `https://blog.vishwajeetsingh.in` (Hashnode, titled "Code Journey")
- GitHub: `https://github.com/Selectus2` (capital S)
- RubyGems: `https://rubygems.org/profiles/selectus2`
- RubyEvents: `https://www.rubyevents.org/profiles/selectus2`
- X: `https://x.com/VishwaDesurkar`
- LinkedIn: `https://www.linkedin.com/in/vishwajeetsingh-desurkar/` — **confirmed by the owner 2026-08-27.** The other vanity URL (`in/vishwajeetsinghd`) must not be used.
- Job title: **Ruby on Rails engineer** — confirmed by the owner 2026-08-27. Matches the approved bio copy below.
- Employer: **ASK THE OWNER.** Public sources conflict (GitHub says Josh Software; Peerlist and Hashnode say SimplySmart Technologies). Do not name one.
- Analytics: **Plausible** — confirmed by the owner 2026-08-27. Cookieless only, no cookie-setting analytics.
### Open source
| Gem | Version | Released | Licence | Ruby | Source | What it is |
|---|---|---|---|---|---|---|
| `payu-ruby` | 0.2.0 | 2026-07-19 | MIT | >= 3.1 | `github.com/Selectus2/payu-rb` | Ruby client for the PayU India payment gateway — hash generation, payment params, server-to-server verification, refunds. **Framework-agnostic**; works with Rails, Sinatra, or plain Ruby. Zero runtime dependencies. |
| `trainers-rb` | 0.1.1 | 2026-06-09 | MIT | >= 3.1 | `github.com/Selectus2/trainers-rb` | Training loop, LoRA, LR scheduling, callbacks and safetensors serialization for fine-tuning HuggingFace transformer models. Built on `torch-rb` and `transformers-rb`. **Early — 0.1.x.** |
 
Describe `trainers-rb` honestly as early-stage. Do not inflate it.
 
### Conference talks

Six talks, confirmed by the owner 2026-08-27 against `src/components/Talks.tsx`,
which carried richer data than this file originally recorded. Abstracts, video
URLs and locations all come from that component.

| Talk | Conference | Location | Date | Duration | Video |
|---|---|---|---|---|---|
| What If… Ruby Led the AI Revolution? | RubyConf India 2025 | Jaipur, India | 12 Sep 2025 | 13:46 | `1h5RZWSL4Oc` |
| The Harvey Dent Dilemma: Ruby's White Knight Rises (or Falls) | RubyConf India 2024 | Jaipur, India | Nov 2024 | 18:40 | `8LYHEzQL_-4` |
| Concurrency Showdown: Threads vs. Fibers | RubyConf Australia 2024 | Sydney, Australia | 11 Apr 2024 | 22:48 | `kU22NJq1sS0` |
| Connecting the Dots: Unleash the magic of AI in IoT | Conf42 Internet of Things | Online | Dec 2023 | — | `Dg8JuIzPUvI` |
| Connecting the Dots: Unleash the magic of AI in IoT | RubyConf India 2023 | Pune, India | Aug 2023 | 28:38 | `YhkEQ9pP-W0` |
| Beyond Cubical | Prose & Code – FC Pune | Pune, India | Aug 2022 | — | `nnF_fbvtM0w` |

**Concurrency Showdown was co-presented with Ishani Trivedi — always credit her.**
`Talks.tsx` omitted this; the owner confirmed on 2026-08-27 that the credit is correct
and required.

Four of the six are recorded to the month only. Exact days are still outstanding.
Titles use this file's spelling where a talk appears in both sources.

### Podcast appearances

Confirmed by the owner 2026-08-27, sourced from `src/components/Podcasts.tsx`.

| Episode | Show | Date | Duration | Video |
|---|---|---|---|---|
| Vishwajeetsingh Shares His Vision and Experience with AI in Ruby on Rails | RubyConf 2024 Rewind | Nov 2024 | 9 min | `wDtfXBZ61ig` |

### Books

24 books read and rated out of five, sourced from `src/components/Books.tsx` and
confirmed by the owner 2026-08-27. Held in `content/books/` — title, author,
category, rating, year, description, and the owner's own one-line review.
Categories: Fiction – Indian, Fiction – Global, Fiction – Marathi, Poetry – Global,
Non-Fiction – Self-Improvement, Entrepreneurship.

These are personal reading notes, not professional claims. The original component
had `link: "#"` for every entry, so no book links to anywhere.

### Community roles
- **Deccan Queen on Rails** — on the organising crew. Verified: named on `https://deccanqueenonrails.com/team`. 2026 edition 8–11 Oct, Hyatt Regency Pune.
- **Pune Ruby meetups** — organiser. Group page: `https://www.rubyevents.org/events/pune-ruby-meetup`
- **Rails Girls Pune** — organised; listed at `https://railsgirls.com/pune.html` (22 Feb 2025 edition)
- **Ruby India** — helped form the community. **Use "helped form" unless the owner confirms he was sole founder**, in which case name any co-founders.
### Writing that exists
- *Unleash Rails 7 UI Development with ESBuild* — `https://blog.vishwajeetsingh.in/unleash-rails-7-ui-development-with-esbuild` (17 Oct 2023)
- *Launch Like a Pro with K6* (25 Feb 2025), plus three 2023 posts on the same blog
## Approved bio copy — use verbatim
 
**One line**
> Vishwajeetsingh Desurkar is a Pune-based Ruby on Rails engineer who organises the Pune Ruby meetups and Deccan Queen on Rails, and publishes open-source Ruby libraries on RubyGems.
 
**~100 words (for /about/)**
> Vishwa is a developer based in Pune, Maharashtra, India, working across Ruby on Rails, machine-learning tooling, and cloud architecture.
>
> He organises the Pune Ruby meetups, helped form the Ruby India community, organised Rails Girls Pune, and is on the team behind Deccan Queen on Rails — a Rails conference held in Pune.
>
> He publishes open-source Ruby libraries on RubyGems: payu-ruby, an MIT-licensed, framework-agnostic client for the PayU India payment gateway, and trainers-rb, a training-loop and LoRA library for fine-tuning transformer models on torch-rb and transformers-rb.
>
> He has spoken at four Ruby conferences — RubyConf India in 2023, 2024 and 2025, and RubyConf Australia in 2024, where he co-presented *Concurrency Showdown: Threads vs. Fibers* with Ishani Trivedi.
 
## Site structure (target)
 
```
/                   Home
/about/             Bio, location, contact, profile links, Person+ProfilePage JSON-LD
/ruby-on-rails/     Pillar page — Rails work, writing, talks, gems
/open-source/       Both gems + public roadmap
/talks/             All six talks, one sub-page each
/community/         DQoR, Pune Ruby meetups, Rails Girls Pune, Ruby India
/writing/           Article index (canonical home for all articles)
/podcasts/          Podcast appearances
/books/             Books read and rated
/sitemap.xml  /robots.txt  /feed.xml

Home is a single scrolling page whose sections mirror these routes; the navbar
scrolls on / and navigates elsewhere. /projects/ was dropped — the only source
for it was fabricated placeholder copy.
```
 
## Per-page definition of done
 
1. `curl -s <url>` returns the visible body text
2. Unique `<title>` and `<meta name="description">`, each containing at least one of *Ruby*, *Rails*, *Pune*
3. Self-referencing `<link rel="canonical">`
4. Every factual claim traces to VERIFIED FACTS above
5. Links to `/about/` and `/ruby-on-rails/`
6. Listed in `sitemap.xml` with an accurate `lastmod`
## Known starting state (as of Aug 2026)
 
Lovable-generated SPA. `<title>` is `vish-selectus-showcase`, `<meta name="author">` is `Lovable`, description is `Lovable Generated Project`, OG image points at `lovable.dev`, `twitter:site` is `@lovable_dev`. The crawlable body is empty. `/about`, `/projects`, `/talks`, `/open-source` all return real HTTP 404. `robots.txt` exists and is permissive. `sitemap.xml` returns 404. No structured data anywhere.
 

