// Resolves every outbound URL that appears in dist/ — hrefs, JSON-LD sameAs,
// iframe embeds. A 404 in any of them is a broken promise on the page.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(html|xml)$/.test(e.name)) yield p;
  }
}

const urls = new Set();
for await (const file of walk("dist")) {
  const html = await readFile(file, "utf8");
  for (const m of html.matchAll(/https?:\/\/[^\s"'<>)\\]+/g)) {
    const u = m[0].replace(/[.,;]+$/, "");
    if (!u.startsWith("https://vishwajeetsingh.in")) urls.add(u);
  }
}

const sorted = [...urls].sort();
console.log(`Checking ${sorted.length} outbound URL(s)\n`);

let failures = 0;
for (const url of sorted) {
  let status = "ERR";
  let note = "";
  try {
    // HEAD first; some hosts (YouTube, LinkedIn) only answer GET properly.
    let res = await fetch(url, { method: "HEAD", redirect: "follow" });
    if (res.status === 405 || res.status === 403 || res.status === 404) {
      res = await fetch(url, { method: "GET", redirect: "follow" });
    }
    status = res.status;
    if (res.url !== url) note = `-> ${res.url}`;
  } catch (e) {
    note = e.message;
  }
  const ok = status >= 200 && status < 400;
  if (!ok) failures++;
  console.log(`  ${ok ? "ok  " : "FAIL"} ${String(status).padEnd(4)} ${url} ${note}`);
}
console.log(`\n${sorted.length - failures}/${sorted.length} resolved`);
process.exit(failures ? 1 : 0);
