import { z } from "zod";

/**
 * Front matter contracts, one per collection. The Vite content plugin validates
 * every file against these at build time, so a malformed or incomplete entry
 * fails `npm run build` instead of shipping.
 *
 * Fields CLAUDE.md does not supply a value for are optional here and left out of
 * the seeded files, with a `todo` note recording what is missing. Nothing is
 * filled in with a guess.
 */

const isoDate = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "expected an ISO date, e.g. 2025-09-12");

/** Some talks are recorded to the month only. Accepts 2024-11 or 2024-11-18. */
const isoDateOrMonth = z
  .string()
  .regex(
    /^\d{4}-\d{2}(-\d{2})?$/,
    "expected 2024-11 or 2024-11-18"
  );

const url = z.string().url();

/** Records a fact CLAUDE.md does not yet supply. Never rendered. */
const todo = z.array(z.string()).optional();

export const talkSchema = z.object({
  title: z.string().min(1),
  conference: z.string().min(1),
  /** Where it was delivered, e.g. "Pune, India". */
  location: z.string().min(1).optional(),
  date: isoDateOrMonth.optional(),
  durationSeconds: z.number().int().positive().optional(),
  videoUrl: url.optional(),
  coSpeaker: z.string().min(1).optional(),
  abstract: z.string().min(1).optional(),
  slidesUrl: url.optional(),
  todo,
});

export const articleSchema = z.object({
  title: z.string().min(1),
  date: isoDate.optional(),
  description: z.string().min(1).optional(),
  /** Where the canonical version lives. For Hashnode posts, the Hashnode URL. */
  canonicalUrl: url.optional(),
  tags: z.array(z.string()).default([]),
  /** Set when the post is hosted off-site and /writing/ should link out. */
  externalUrl: url.optional(),
  todo,
});

export const gemSchema = z.object({
  name: z.string().min(1),
  version: z.string().min(1),
  releaseDate: isoDate,
  licence: z.string().min(1),
  rubyVersion: z.string().min(1),
  sourceUrl: url,
  rubygemsUrl: url,
  /** `early` is reserved for the 0.1.x work CLAUDE.md says to describe as such. */
  status: z.enum(["early", "released"]),
  summary: z.string().min(1),
  todo,
});

export const communitySchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  url: url.optional(),
  since: isoDate.optional(),
  todo,
});

export const bookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  category: z.string().min(1),
  /** Out of 5, as recorded in the original Books component. */
  rating: z.number().int().min(1).max(5),
  /** Free text — entries range from "1854" to "5th century BC". */
  year: z.string().min(1),
  description: z.string().min(1),
  /** The owner's own one-line verdict. */
  review: z.string().min(1),
  todo,
});

export const podcastSchema = z.object({
  title: z.string().min(1),
  show: z.string().min(1),
  date: isoDateOrMonth.optional(),
  durationSeconds: z.number().int().positive().optional(),
  description: z.string().min(1),
  videoUrl: url.optional(),
  audioUrl: url.optional(),
  todo,
});

export const schemas = {
  talks: talkSchema,
  articles: articleSchema,
  gems: gemSchema,
  communities: communitySchema,
  books: bookSchema,
  podcasts: podcastSchema,
} as const;

export type CollectionName = keyof typeof schemas;

/** Front matter plus what the plugin derives: slug and rendered body HTML. */
export type Entry<T> = T & { slug: string; html: string };

export type Talk = Entry<z.infer<typeof talkSchema>>;
export type Article = Entry<z.infer<typeof articleSchema>>;
export type Gem = Entry<z.infer<typeof gemSchema>>;
export type Community = Entry<z.infer<typeof communitySchema>>;
export type Book = Entry<z.infer<typeof bookSchema>>;
export type Podcast = Entry<z.infer<typeof podcastSchema>>;
