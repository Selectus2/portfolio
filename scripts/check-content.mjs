// Loads every collection through Vite's SSR pipeline and prints what it found,
// so front-matter problems surface without waiting for a page to render them.
//
//   npm run check:content

import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "warn",
});

try {
  const { talks, articles, gems, communities, books, podcasts } =
    await server.ssrLoadModule("/src/content/index.ts");

  const collections = { talks, articles, gems, communities, books, podcasts };
  let todoCount = 0;

  for (const [name, entries] of Object.entries(collections)) {
    console.log(`\n${name} (${entries.length})`);
    for (const e of entries) {
      const label = e.title ?? e.name;
      const when = e.date ?? e.releaseDate ?? e.since ?? "—";
      console.log(`  ${e.slug.padEnd(42)} ${String(when).padEnd(12)} ${label}`);
      for (const t of e.todo ?? []) {
        todoCount++;
        console.log(`      TODO: ${t}`);
      }
    }
  }

  console.log(`\n${todoCount} TODO(s) across all collections.`);
} finally {
  await server.close();
}
