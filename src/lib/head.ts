import type { RouteMeta } from "@/routes";
import { absoluteUrl } from "@/lib/site";

/**
 * The route-specific part of <head>. Everything here is emitted twice from one
 * source: as a string spliced into dist/<route>/index.html at prerender time,
 * and into the live DOM by useDocumentHead on client-side navigation.
 *
 * Shared tags that never vary by route — favicons, manifest, og:image,
 * twitter:card — stay hardcoded in index.html outside the markers.
 */

function escapeAttr(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** JSON-LD goes inside a <script>, so the only real hazard is a closing tag. */
function escapeJsonLd(value: unknown): string {
  return JSON.stringify(value, null, 2).replace(/</g, "\\u003c");
}

export function canonicalFor(meta: RouteMeta): string {
  return absoluteUrl(meta.outDir === "" ? "/" : `/${meta.outDir}/`);
}

export function renderHeadTags(meta: RouteMeta): string {
  const canonical = canonicalFor(meta);
  const tags = [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    // A noindex page gets no canonical: 404.html is served at whatever path the
    // visitor mistyped, so pointing it at /404/ would advertise a URL that is
    // not meant to be indexed in the first place.
    meta.noindex
      ? ""
      : `<link rel="canonical" href="${escapeAttr(canonical)}" />`,
    meta.noindex
      ? `<meta name="robots" content="noindex" data-route-head />`
      : "",
    `<meta property="og:url" content="${escapeAttr(canonical)}" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    ...(meta.jsonLd ?? []).map(
      (block) =>
        `<script type="application/ld+json" data-route-head>\n${escapeJsonLd(block)}\n</script>`
    ),
  ].filter(Boolean);

  return tags.join("\n    ");
}
