import { basename, relative, sep } from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import type { Plugin } from "vite";
import { schemas, type CollectionName } from "../src/content/schemas";

/**
 * Turns `content/<collection>/<slug>.md` into a JS module at build time.
 *
 * Front matter is validated against the collection's zod schema, the body is
 * rendered to HTML, and the result is emitted as a plain object. gray-matter and
 * markdown-it run here, in Node, during the build — neither reaches the client
 * bundle, and the browser only ever sees the finished data.
 *
 * A file that fails validation fails the build. That is the point: it is what
 * stops an incomplete talk or gem entry from shipping.
 */

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

function collectionOf(id: string, root: string): CollectionName | null {
  const rel = relative(root, id).split(sep);
  if (rel[0] !== "content") return null;
  const name = rel[1] as CollectionName;
  return name in schemas ? name : null;
}

export function content(): Plugin {
  let root = process.cwd();

  return {
    name: "site-content",
    enforce: "pre",

    configResolved(config) {
      root = config.root;
    },

    transform(code, id) {
      if (!id.endsWith(".md")) return null;
      const collection = collectionOf(id, root);
      if (!collection) return null;

      const slug = basename(id, ".md");
      const { data, content: body } = matter(code);

      const parsed = schemas[collection].safeParse(data);
      if (!parsed.success) {
        const detail = parsed.error.issues
          .map((i) => `  ${i.path.join(".") || "(root)"}: ${i.message}`)
          .join("\n");
        this.error(
          `Invalid front matter in content/${collection}/${slug}.md\n${detail}`
        );
      }

      const entry = {
        ...parsed.data,
        slug,
        html: md.render(body).trim(),
      };

      return {
        code: `export default ${JSON.stringify(entry)}`,
        map: null,
      };
    },
  };
}
