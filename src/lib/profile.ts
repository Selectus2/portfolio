/**
 * Identity facts. Every value here is traceable to the VERIFIED FACTS section of
 * CLAUDE.md — nothing is inferred. Job title and the LinkedIn URL were confirmed
 * by the owner on 2026-08-27.
 */

/**
 * Legal/full name. Used for <title>, meta descriptions and structured data,
 * where the exact string is what search engines match on.
 */
export const NAME = "Vishwajeetsingh Desurkar";

/**
 * What he is actually known as, and what the interface calls him. Confirmed by
 * the owner 2026-08-27. Use this anywhere the site addresses or labels him;
 * use NAME only where the full spelling carries weight.
 */
export const DISPLAY_NAME = "Vishwa";

/**
 * His name in Devanagari, as a Marathi speaker. Taken verbatim from the site's
 * original Hero component — not transliterated here. Always render it inside an
 * element carrying lang="mr" so screen readers pronounce it correctly.
 */
export const DEVANAGARI_NAME = "विश्वजितसिंह देसुरकर";

/** Other spellings, surfaced as JSON-LD alternateName. Each is rendered as
 *  visible text on /about/, per hard rule 4. */
export const ALTERNATE_NAMES = [
  "Vishwajeet Singh Desurkar",
  "Vishwa",
  DEVANAGARI_NAME,
];
export const JOB_TITLE = "Ruby on Rails engineer";
export const EMAIL = "vishwajeetsinghd@gmail.com";
export const LOCATION = {
  city: "Pune",
  region: "Maharashtra",
  country: "India",
  full: "Pune, Maharashtra, India",
};

export type ProfileLink = {
  label: string;
  /** Shown as the visible link text, so the URL itself is on the page. */
  display: string;
  href: string;
  note?: string;
};

/** Rendered as a visible list on /about/, and reused as JSON-LD sameAs. */
export const PROFILE_LINKS: ProfileLink[] = [
  {
    label: "GitHub",
    display: "github.com/Selectus2",
    href: "https://github.com/Selectus2",
  },
  {
    label: "RubyGems",
    display: "rubygems.org/profiles/selectus2",
    href: "https://rubygems.org/profiles/selectus2",
  },
  {
    label: "RubyEvents",
    display: "rubyevents.org/profiles/selectus2",
    href: "https://www.rubyevents.org/profiles/selectus2",
  },
  {
    label: "Blog",
    display: "blog.vishwajeetsingh.in",
    href: "https://blog.vishwajeetsingh.in",
    note: "Code Journey, on Hashnode",
  },
  {
    label: "LinkedIn",
    display: "linkedin.com/in/vishwajeetsingh-desurkar",
    href: "https://www.linkedin.com/in/vishwajeetsingh-desurkar/",
  },
  {
    label: "X",
    display: "x.com/VishwaDesurkar",
    href: "https://x.com/VishwaDesurkar",
  },
];

/** sameAs for Person JSON-LD. Same URLs the page shows, per hard rule 4. */
export const SAME_AS = PROFILE_LINKS.map((l) => l.href);

/** Approved copy from CLAUDE.md. Verbatim — do not reword. */
export const ONE_LINE_BIO =
  "Vishwajeetsingh Desurkar is a Pune-based Ruby on Rails engineer who organises the Pune Ruby meetups and Deccan Queen on Rails, and publishes open-source Ruby libraries on RubyGems.";

/** Approved ~100-word bio from CLAUDE.md. Verbatim, one string per paragraph. */
export const BIO_PARAGRAPHS = [
  "Vishwa is a developer based in Pune, Maharashtra, India, working across Ruby on Rails, machine-learning tooling, and cloud architecture.",
  "He organises the Pune Ruby meetups, helped form the Ruby India community, organised Rails Girls Pune, and is on the team behind Deccan Queen on Rails — a Rails conference held in Pune.",
  "He publishes open-source Ruby libraries on RubyGems: payu-ruby, an MIT-licensed, framework-agnostic client for the PayU India payment gateway, and trainers-rb, a training-loop and LoRA library for fine-tuning transformer models on torch-rb and transformers-rb.",
  "He has spoken at four Ruby conferences — RubyConf India in 2023, 2024 and 2025, and RubyConf Australia in 2024, where he co-presented Concurrency Showdown: Threads vs. Fibers with Ishani Trivedi.",
] as const;
