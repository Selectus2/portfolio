import type { ReactElement } from "react";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Talks from "@/pages/Talks";
import TalkDetail from "@/pages/TalkDetail";
import Community from "@/pages/Community";
import OpenSource from "@/pages/OpenSource";
import RubyOnRails from "@/pages/RubyOnRails";
import Writing from "@/pages/Writing";
import Books from "@/pages/Books";
import Podcasts from "@/pages/Podcasts";
import NotFound from "@/pages/NotFound";
import { articles, books, communities, gems, podcasts, talks } from "@/content";
import { isoDuration } from "@/lib/format";
import {
  ALTERNATE_NAMES,
  DISPLAY_NAME,
  EMAIL,
  JOB_TITLE,
  LOCATION,
  NAME,
  ONE_LINE_BIO,
  SAME_AS,
} from "@/lib/profile";
import { SITE_URL } from "@/lib/site";

export type RouteMeta = {
  path: string;
  element: ReactElement;
  title: string;
  description: string;
  /** Directory under dist/, e.g. "" for home, "about" for /about/. */
  outDir: string;
  /** Files whose last change dates this page. The prerenderer turns these into
   *  a real <lastmod> via git, so the sitemap reflects actual edits. */
  sources: string[];
  /** Every claim in here must also be visible text on the page — hard rule 4. */
  jsonLd?: Record<string, unknown>[];
  noindex?: boolean;
};

/** Files every page depends on: the shell, the identity facts, the route table. */
const SHARED = [
  "src/routes.tsx",
  "src/components/SiteLayout.tsx",
  "src/components/Page.tsx",
  "src/lib/profile.ts",
];

const PERSON_ID = `${SITE_URL}/about/#person`;

/** Referenced from Person.memberOf; both are named in visible text on /about/
 *  and described in full on /community/. */
const MEMBER_OF = [
  {
    "@type": "Organization",
    name: "Deccan Queen on Rails",
    url: "https://deccanqueenonrails.com/team",
  },
  {
    "@type": "Organization",
    name: "Pune Ruby meetups",
    url: "https://www.rubyevents.org/events/pune-ruby-meetup",
  },
];

const person = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: NAME,
  alternateName: ALTERNATE_NAMES,
  jobTitle: JOB_TITLE,
  url: `${SITE_URL}/`,
  email: `mailto:${EMAIL}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: LOCATION.city,
    addressRegion: LOCATION.region,
    addressCountry: LOCATION.country,
  },
  sameAs: SAME_AS,
  memberOf: MEMBER_OF,
};

/** One sub-page per talk, generated from the collection. */
const talkRoutes: RouteMeta[] = talks.map((talk) => ({
  path: `/talks/${talk.slug}/`,
  element: <TalkDetail talk={talk} />,
  outDir: `talks/${talk.slug}`,
  title: `${talk.title} — ${talk.conference} — Ruby talk by ${NAME}`,
  description: [
    `${talk.title}, a Ruby conference talk by ${NAME} at ${talk.conference}`,
    talk.coSpeaker ? `, co-presented with ${talk.coSpeaker}` : "",
    ".",
  ].join(""),
  sources: [...SHARED, "src/pages/TalkDetail.tsx", `content/talks/${talk.slug}.md`],
  // VideoObject only where a real video URL exists — CLAUDE.md is explicit.
  jsonLd: talk.videoUrl
    ? [
        {
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: talk.title,
          // The abstract, not a synthesised string: hard rule 4 requires every
          // JSON-LD value to appear as visible text on the same page.
          ...(talk.abstract ? { description: talk.abstract } : {}),
          contentUrl: talk.videoUrl,
          embedUrl: talk.videoUrl,
          duration: isoDuration(talk.durationSeconds),
          ...(talk.date ? { uploadDate: talk.date } : {}),
          author: { "@type": "Person", name: NAME },
        },
      ]
    : undefined,
}));

export const routes: RouteMeta[] = [
  {
    path: "/",
    element: <Home />,
    outDir: "",
    title: `${NAME} — Ruby on Rails engineer in Pune`,
    description: ONE_LINE_BIO,
    sources: [...SHARED, "src/pages/Home.tsx", "content"],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: NAME,
        url: `${SITE_URL}/`,
        author: { "@id": PERSON_ID },
      },
    ],
  },
  {
    path: "/ruby-on-rails/",
    element: <RubyOnRails />,
    outDir: "ruby-on-rails",
    title: `Ruby on Rails work — ${NAME}, Pune`,
    description: `The Ruby on Rails and Ruby work of ${NAME}, a Rails engineer in Pune: open-source gems, four Ruby conference talks, writing, and the communities he organises.`,
    sources: [...SHARED, "src/pages/RubyOnRails.tsx", "content"],
  },
  {
    path: "/open-source/",
    element: <OpenSource />,
    outDir: "open-source",
    title: `Open-source Ruby gems — ${NAME}`,
    description: `payu-ruby and trainers-rb: MIT-licensed, framework-agnostic Ruby libraries by ${NAME}, a Rails engineer in Pune. Neither is a Rails engine.`,
    sources: [...SHARED, "src/pages/OpenSource.tsx", "content/gems"],
  },
  {
    path: "/talks/",
    element: <Talks />,
    outDir: "talks",
    title: `Ruby conference talks — ${NAME}`,
    description: `Four Ruby conference talks by ${NAME} of Pune: RubyConf India 2023, 2024 and 2025, and RubyConf Australia 2024.`,
    sources: [...SHARED, "src/pages/Talks.tsx", "content/talks"],
  },
  ...talkRoutes,
  {
    path: "/community/",
    element: <Community />,
    outDir: "community",
    title: `Ruby communities in Pune — ${NAME}`,
    description: `The Ruby communities ${NAME} organises: the Pune Ruby meetups, Deccan Queen on Rails, Rails Girls Pune, and Ruby India.`,
    sources: [...SHARED, "src/pages/Community.tsx", "content/communities"],
  },
  {
    path: "/writing/",
    element: <Writing />,
    outDir: "writing",
    title: `Writing on Ruby and Rails — ${NAME}`,
    description: `Articles on Ruby, Rails and developer tooling by ${NAME}, a Rails engineer based in Pune.`,
    sources: [...SHARED, "src/pages/Writing.tsx", "content/articles"],
  },
  {
    path: "/podcasts/",
    element: <Podcasts />,
    outDir: "podcasts",
    sources: [...SHARED, "src/pages/Podcasts.tsx", "content/podcasts"],
    title: `Podcast appearances on Ruby and Rails — ${NAME}`,
    description: `Podcast conversations with ${NAME}, a Ruby on Rails engineer in Pune, on applying AI inside Rails applications.`,
  },
  {
    path: "/books/",
    element: <Books />,
    outDir: "books",
    sources: [...SHARED, "src/pages/Books.tsx", "content/books"],
    title: `Books — ${NAME}, Ruby on Rails engineer in Pune`,
    description: `${books.length} books read and rated by ${NAME}, a Ruby on Rails engineer in Pune — fiction, poetry, mythology and business.`,
  },
  {
    path: "/about/",
    element: <About />,
    outDir: "about",
    title: `About ${NAME} — Ruby on Rails engineer, Pune`,
    description: `${NAME} is a Ruby on Rails engineer in Pune, Maharashtra, India. Bio, contact details, and every profile link in one place.`,
    sources: [...SHARED, "src/pages/About.tsx", "content/communities"],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        url: `${SITE_URL}/about/`,
        name: `About ${DISPLAY_NAME}`,
        mainEntity: person,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    outDir: "404",
    title: `Page not found — ${NAME}`,
    description: `This page does not exist on vishwajeetsingh.in, the site of ${NAME}, a Ruby on Rails engineer in Pune.`,
    sources: [...SHARED, "src/pages/NotFound.tsx"],
    noindex: true,
  },
];

export const pageRoutes = routes.filter((r) => r.path !== "*");
export const notFoundRoute = routes.find((r) => r.path === "*")!;

/** Re-exported so the prerenderer can build feed.xml without a second import. */
export { articles, books, communities, gems, podcasts, talks };
