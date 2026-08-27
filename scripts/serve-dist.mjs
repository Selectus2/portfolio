// Static server that gzips like GitHub Pages does, so Lighthouse numbers here
// reflect production rather than python -m http.server's uncompressed output.
import { createServer } from "node:http";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createGzip } from "node:zlib";
import { extname, join, normalize } from "node:path";

const ROOT = new URL("../dist/", import.meta.url).pathname;
const PORT = Number(process.argv[2] ?? 4181);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".ico": "image/x-icon",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".xml", ".txt", ".json", ".svg"]);

createServer((req, res) => {
  const url = decodeURIComponent(req.url.split("?")[0]);
  let path = join(ROOT, normalize(url).replace(/^(\.\.[/\\])+/, ""));

  if (existsSync(path) && statSync(path).isDirectory()) path = join(path, "index.html");
  if (!existsSync(path)) {
    // GitHub Pages serves 404.html with a 404 status.
    const notFound = join(ROOT, "404.html");
    res.writeHead(404, { "Content-Type": TYPES[".html"] });
    return existsSync(notFound) ? createReadStream(notFound).pipe(res) : res.end("404");
  }

  const ext = extname(path);
  const headers = { "Content-Type": TYPES[ext] ?? "application/octet-stream" };
  if (ext === ".js" || ext === ".css") headers["Cache-Control"] = "public, max-age=31536000, immutable";

  const wantsGzip = /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
  if (wantsGzip && COMPRESSIBLE.has(ext)) {
    headers["Content-Encoding"] = "gzip";
    headers.Vary = "Accept-Encoding";
    res.writeHead(200, headers);
    return createReadStream(path).pipe(createGzip()).pipe(res);
  }

  res.writeHead(200, headers);
  createReadStream(path).pipe(res);
}).listen(PORT, () => console.log(`serving dist/ with gzip on http://localhost:${PORT}`));
