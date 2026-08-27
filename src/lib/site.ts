/** Canonical origin. No trailing slash. */
export const SITE_URL = "https://vishwajeetsingh.in";

export const SITE_NAME = "Vishwajeetsingh Desurkar";

/** Absolute URL for a route path (`/`, `/about/`, …). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path}`;
}
