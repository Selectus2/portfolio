// Renders every route in src/routes.tsx to static HTML, so each page returns
// real body text to a crawler and GitHub Pages has a file to serve at its path.
//
// Runs after both Vite builds:
//   dist/                -> client build (assets + index.html template)
//   dist/server/         -> SSR bundle exporting render() and the route table
//
// See docs/prerender-plan.md.

import { mkdir, readFile, writeFile, rm, stat } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const serverDist = join(dist, "server");

const SITE_URL = "https://vishwajeetsingh.in";

const run = promisify(execFile);

/**
 * Real <lastmod> for a page: the most recent date among the files it is built
 * from.
 *
 * For a file that is committed and unmodified, that is its last commit date.
 * Only when a path has uncommitted changes does mtime come into it — which
 * matters, because on a fresh CI clone every mtime is the checkout time, and
 * trusting mtime there would stamp today's date on all eleven pages.
 */
async function git(args) {
  try {
    const { stdout } = await run("git", args, { cwd: root });
    return stdout;
  } catch {
    return null; // not a git repo, or git unavailable
  }
}

async function lastModified(sources) {
  const dates = [];

  for (const source of sources) {
    const status = await git(["status", "--porcelain", "--", source]);
    const dirty = status === null || status.trim() !== "";

    if (dirty) {
      try {
        const info = await stat(join(root, source));
        dates.push(info.mtime.toISOString().slice(0, 10));
      } catch {
        // A path listed as a source may not exist yet; skip it.
      }
    }

    const committed = await git(["log", "-1", "--format=%cs", "--", source]);
    if (committed?.trim()) dates.push(committed.trim());
  }

  if (!dates.length) return new Date().toISOString().slice(0, 10);
  return dates.sort().at(-1);
}

const HEAD_START = "<!--head:start-->";
const HEAD_END = "<!--head:end-->";
const ROOT_DIV = '<div id="root"></div>';

function splice(template, { head, html }) {
  const headStart = template.indexOf(HEAD_START);
  const headEnd = template.indexOf(HEAD_END);
  if (headStart === -1 || headEnd === -1) {
    throw new Error(
      `dist/index.html is missing the ${HEAD_START} / ${HEAD_END} markers — ` +
        `index.html was edited without updating scripts/prerender.mjs.`
    );
  }
  if (!template.includes(ROOT_DIV)) {
    throw new Error(`dist/index.html is missing ${ROOT_DIV}.`);
  }

  return template
    .slice(0, headStart + HEAD_START.length)
    .concat("\n    ", head, "\n    ", template.slice(headEnd))
    .replace(ROOT_DIV, `<div id="root">${html}</div>`);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** RSS wants RFC-822. Content dates are date-only, so pin them to UTC midnight. */
function rfc822(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toUTCString();
}

/**
 * RSS 2.0 over the articles collection. Only entries with a resolvable link are
 * included — an item whose <link> points nowhere is worse than an absent item.
 * Anything skipped is logged rather than silently dropped.
 */
function renderFeed(entries, skipped) {
  const items = entries
    .map((a) => {
      const link = a.externalUrl ?? a.canonicalUrl;
      return [
        "    <item>",
        `      <title>${escapeXml(a.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        a.date ? `      <pubDate>${rfc822(a.date)}</pubDate>` : "",
        a.description
          ? `      <description>${escapeXml(a.description)}</description>`
          : "",
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const note = skipped.length
    ? `\n    <!-- ${skipped.length} article(s) omitted for want of a URL: ${skipped
        .map((a) => escapeXml(a.slug))
        .join(", ")} -->`
    : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vishwajeetsingh Desurkar — writing on Ruby and Rails</title>
    <link>${SITE_URL}/</link>
    <description>Articles on Ruby, Rails and developer tooling by Vishwajeetsingh Desurkar, a Ruby on Rails engineer in Pune, India.</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />${note}
${items}
  </channel>
</rss>
`;
}

function renderSitemap(entries) {
  const urls = entries
    .map(
      (e) =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n  </url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

async function main() {
  const template = await readFile(join(dist, "index.html"), "utf8");
  const entryUrl = pathToFileURL(join(serverDist, "entry-server.js")).href;
  const { render, routes, pageRoutes, notFoundRoute, articles } = await import(
    entryUrl
  );

  const written = [];

  for (const meta of pageRoutes) {
    const outPath = join(dist, meta.outDir, "index.html");
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, splice(template, render(meta)), "utf8");
    written.push(outPath.replace(`${dist}/`, "dist/"));
  }

  // GitHub Pages serves 404.html (with a 404 status) for any unmatched path.
  const notFoundPath = join(dist, "404.html");
  await writeFile(notFoundPath, splice(template, render(notFoundRoute)), "utf8");
  written.push("dist/404.html");

  const indexed = pageRoutes.filter((r) => !r.noindex);
  const sitemap = renderSitemap(
    await Promise.all(
      indexed.map(async (r) => ({
        loc: `${SITE_URL}${r.outDir === "" ? "/" : `/${r.outDir}/`}`,
        lastmod: await lastModified(r.sources),
      }))
    )
  );
  await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");
  written.push("dist/sitemap.xml");

  const withLink = articles.filter((a) => a.externalUrl ?? a.canonicalUrl);
  const withoutLink = articles.filter((a) => !(a.externalUrl ?? a.canonicalUrl));
  await writeFile(
    join(dist, "feed.xml"),
    renderFeed(withLink, withoutLink),
    "utf8"
  );
  written.push(`dist/feed.xml (${withLink.length} item(s))`);
  for (const a of withoutLink) {
    console.warn(`  note: ${a.slug} omitted from feed.xml — no URL in front matter`);
  }

  const robotsPath = join(dist, "robots.txt");
  let robots = await readFile(robotsPath, "utf8");
  if (!/^Sitemap:/m.test(robots)) {
    robots = `${robots.trimEnd()}\n\nSitemap: ${SITE_URL}/sitemap.xml\n`;
    await writeFile(robotsPath, robots, "utf8");
    written.push("dist/robots.txt (Sitemap: appended)");
  }

  // The SSR bundle is a build artifact, not something to publish.
  await rm(serverDist, { recursive: true, force: true });

  console.log(
    `prerendered ${routes.length} route(s):\n${written.map((w) => `  ${w}`).join("\n")}`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
