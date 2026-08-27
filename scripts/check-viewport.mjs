// Checks two things the Lighthouse runs don't cover, at a real 360px viewport:
//   1. no horizontal scroll (scrollWidth must not exceed the viewport)
//   2. every interactive element is at least 44x44 CSS px
import puppeteer from "puppeteer-core";
import { readFile } from "node:fs/promises";

const BASE = process.argv[2] ?? "http://localhost:4181";
const CHROME = "/Applications/Brave Browser.app/Contents/MacOS/Brave Browser";
const MIN_TAP = 44;

const sitemap = await readFile("dist/sitemap.xml", "utf8");
const paths = [...sitemap.matchAll(/<loc>https:\/\/vishwajeetsingh\.in(.*?)<\/loc>/g)].map((m) => m[1]);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu"],
});

let failures = 0;
for (const path of paths) {
  const page = await browser.newPage();
  await page.setViewport({ width: 360, height: 800, deviceScaleFactor: 2 });
  await page.goto(BASE + path, { waitUntil: "networkidle0" });

  const result = await page.evaluate((MIN_TAP) => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;

    // Widest element actually causing overflow, for a useful error message.
    let culprit = null;
    if (overflow > 0) {
      for (const el of document.querySelectorAll("*")) {
        const r = el.getBoundingClientRect();
        if (r.right > doc.clientWidth + 1 && r.width > 0) {
          culprit = `${el.tagName.toLowerCase()}.${(el.className || "").toString().split(" ")[0]} right=${Math.round(r.right)}`;
          break;
        }
      }
    }

    const small = [];
    const selector = "a[href], button, [role=button], input, select, textarea";
    for (const el of document.querySelectorAll(selector)) {
      const r = el.getBoundingClientRect();
      const style = getComputedStyle(el);
      if (r.width === 0 || r.height === 0) continue;          // hidden
      if (style.visibility === "hidden" || style.display === "none") continue;
      if (el.closest("[hidden]")) continue;
      // Visually hidden until focused (the skip link) — not a visible target.
      if (el.className?.toString().includes("sr-only")) continue;
      // WCAG 2.5.8 exempts a link whose target is inline in a sentence of text.
      const parent = el.parentElement;
      const inline = style.display.startsWith("inline");
      const inProse =
        parent && /^(P|LI|SPAN|DD|TD)$/.test(parent.tagName) &&
        (parent.textContent?.trim().length ?? 0) > (el.textContent?.trim().length ?? 0);
      if (inline && inProse) continue;
      if (r.height < MIN_TAP || r.width < MIN_TAP) {
        small.push(
          `${el.tagName.toLowerCase()}${el.textContent?.trim() ? ` "${el.textContent.trim().slice(0, 24)}"` : ""} ${Math.round(r.width)}x${Math.round(r.height)}`
        );
      }
    }
    return { overflow, culprit, scrollWidth: doc.scrollWidth, small };
  }, MIN_TAP);

  const okScroll = result.overflow <= 0;
  const okTap = result.small.length === 0;
  if (!okScroll || !okTap) failures++;

  console.log(
    `  ${okScroll && okTap ? "PASS" : "FAIL"}  ${path}` +
      (okScroll ? "" : `\n          h-scroll: scrollWidth ${result.scrollWidth} > 360 (${result.culprit})`) +
      (okTap ? "" : `\n          small targets (${result.small.length}): ${result.small.slice(0, 6).join(", ")}`)
  );
  await page.close();
}

await browser.close();
console.log(`\n${paths.length - failures}/${paths.length} pages pass at 360px`);
process.exit(failures ? 1 : 0);
