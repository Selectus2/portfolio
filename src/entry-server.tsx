import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { renderHeadTags } from "@/lib/head";
import { routes, pageRoutes, notFoundRoute, type RouteMeta } from "@/routes";
import { articles, books, gems, podcasts, talks, communities } from "@/content";

export { routes, pageRoutes, notFoundRoute };
/** Collections, so the prerenderer can build feed.xml without a second bundle. */
export { articles, books, gems, podcasts, talks, communities };
export type { RouteMeta };

/** Renders one route to static HTML plus its route-specific <head> tags. */
export function render(meta: RouteMeta): { html: string; head: string } {
  // The catch-all renders at a path that matches nothing else, so StaticRouter
  // resolves it the same way GitHub Pages will when it serves 404.html.
  const url = meta.path === "*" ? "/__not-found__" : meta.path;

  const html = renderToString(
    <App router={(children) => <StaticRouter location={url}>{children}</StaticRouter>} />
  );

  return { html, head: renderHeadTags(meta) };
}
