// Phase E acceptance checks. Run against a served dist/.
//   node scripts/verify.mjs http://localhost:4180
import { readFile } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:4180";
const results = [];
const pass = (name, detail = "") => results.push({ ok: true, name, detail });
const fail = (name, detail = "") => results.push({ ok: false, name, detail });

const sitemap = await readFile("dist/sitemap.xml", "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/vishwajeetsingh\.in(.*?)<\/loc>/g)]
  .map((m) => m[1]);

/** Strip tags + script/style bodies to get what a crawler reads as text. */
function visibleText(html) {
  const body = html.slice(html.indexOf('<div id="root">'));
  return body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const pages = [];
for (const p of paths) {
  const res = await fetch(BASE + p);
  const html = await res.text();
  pages.push({ path: p, status: res.status, html, text: visibleText(html) });
}

// --- 1 & 2: status + crawlable name text -------------------------------------
const bad = pages.filter((p) => p.status !== 200 || !/desurkar/i.test(p.text));
bad.length
  ? fail("all routes 200 with visible 'Desurkar'", bad.map((p) => `${p.path} (${p.status})`).join(", "))
  : pass("all routes 200 with visible 'Desurkar'", `${pages.length} routes`);

// --- 4: unique titles + descriptions, each containing Ruby/Rails/Pune --------
const titles = pages.map((p) => (p.html.match(/<title>([^<]*)<\/title>/) ?? [])[1] ?? "");
const descs = pages.map(
  (p) => (p.html.match(/<meta name="description" content="([^"]*)"/) ?? [])[1] ?? ""
);
const dupT = titles.length - new Set(titles).size;
const dupD = descs.length - new Set(descs).size;
dupT === 0 ? pass("titles unique") : fail("titles unique", `${dupT} duplicate(s)`);
dupD === 0 ? pass("descriptions unique") : fail("descriptions unique", `${dupD} duplicate(s)`);

const kw = /ruby|rails|pune/i;
const badT = titles.filter((t) => !kw.test(t));
const badD = descs.filter((d) => !kw.test(d));
badT.length ? fail("every title has Ruby/Rails/Pune", badT.join(" | ")) : pass("every title has Ruby/Rails/Pune");
badD.length ? fail("every description has Ruby/Rails/Pune", badD.join(" | ")) : pass("every description has Ruby/Rails/Pune");

// --- canonical self-reference ------------------------------------------------
const badC = pages.filter((p) => {
  const c = (p.html.match(/rel="canonical" href="([^"]*)"/) ?? [])[1];
  return c !== `https://vishwajeetsingh.in${p.path}`;
});
badC.length ? fail("self-referencing canonicals", badC.map((p) => p.path).join(", ")) : pass("self-referencing canonicals");

// --- 5: JSON-LD parses -------------------------------------------------------
let blocks = 0;
const ldErrors = [];
const ldClaims = [];
for (const p of pages) {
  for (const m of p.html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    blocks++;
    try {
      const parsed = JSON.parse(m[1].replace(/\\u003c/g, "<"));
      ldClaims.push({ path: p.path, json: parsed, text: p.text });
    } catch (e) {
      ldErrors.push(`${p.path}: ${e.message}`);
    }
  }
}
ldErrors.length ? fail("all JSON-LD parses", ldErrors.join("; ")) : pass("all JSON-LD parses", `${blocks} block(s)`);

// --- 5b: string claims appear as visible text --------------------------------
const SKIP_KEYS = new Set(["@context", "@type", "@id", "url", "contentUrl", "embedUrl", "duration", "uploadDate", "sameAs", "email"]);
const invisible = [];
for (const { path, json, text } of ldClaims) {
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) {
        if (SKIP_KEYS.has(k)) continue;
        if (typeof v === "string" && v.length > 2 && !/^https?:|^mailto:|^PT/.test(v)) {
          if (!text.toLowerCase().includes(v.toLowerCase())) invisible.push(`${path} :: ${k} = "${v.slice(0, 60)}"`);
        } else walk(v);
      }
    }
  };
  walk(json);
}
invisible.length
  ? fail("every JSON-LD claim visible on page", invisible.join(" | "))
  : pass("every JSON-LD claim visible on page");

// --- 10: OG tags -------------------------------------------------------------
const ogMissing = pages.filter((p) =>
  !/property="og:title"/.test(p.html) || !/property="og:description"/.test(p.html) || !/property="og:url"/.test(p.html)
);
ogMissing.length ? fail("OG tags on every page", ogMissing.map((p) => p.path).join(", ")) : pass("OG tags on every page");

// --- report ------------------------------------------------------------------
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.name}${r.detail ? `\n        ${r.detail}` : ""}`);
console.log(`\n${results.filter((r) => r.ok).length}/${results.length} checks passed`);
process.exit(results.every((r) => r.ok) ? 0 : 1);
