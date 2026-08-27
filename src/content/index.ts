import type { Article, Book, Community, Gem, Podcast, Talk } from "./schemas";

/**
 * Typed access to the Markdown collections in content/.
 *
 * Each glob is eager so the entries are plain data in the module graph by the
 * time either build runs — the client build and the SSR build see identical
 * objects, which is what keeps prerendered HTML and hydrated HTML in agreement.
 *
 * To add a talk or an article, drop a .md file in the matching directory. No
 * component changes.
 */

function load<T>(modules: Record<string, unknown>): T[] {
  return Object.values(modules).map((m) => (m as { default: T }).default);
}

/** Newest first; entries without a date sort last, keeping their file order. */
function byDateDesc<T extends { date?: string }>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return 0;
  });
}

export const talks: Talk[] = byDateDesc(
  load<Talk>(import.meta.glob("/content/talks/*.md", { eager: true }))
);

export const articles: Article[] = byDateDesc(
  load<Article>(import.meta.glob("/content/articles/*.md", { eager: true }))
);

export const gems: Gem[] = [...
  load<Gem>(import.meta.glob("/content/gems/*.md", { eager: true }))
].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate));

export const communities: Community[] = load<Community>(
  import.meta.glob("/content/communities/*.md", { eager: true })
);

/** Highest-rated first, then alphabetical, so the shelf has a deliberate order. */
export const books: Book[] = [
  ...load<Book>(import.meta.glob("/content/books/*.md", { eager: true })),
].sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title));

export const podcasts: Podcast[] = byDateDesc(
  load<Podcast>(import.meta.glob("/content/podcasts/*.md", { eager: true }))
);

export const talkBySlug = (slug: string) => talks.find((t) => t.slug === slug);

/** Most recent article that carries a date. */
export const latestArticle = () => articles.find((a) => a.date);

/** Most recently released gem. */
export const latestGem = () => gems[0];

export type { Article, Book, Community, Gem, Podcast, Talk };
