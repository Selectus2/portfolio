import { useEffect } from "react";
import type { RouteMeta } from "@/routes";
import { canonicalFor } from "@/lib/head";

/**
 * Keeps <head> in sync on client-side navigation. The prerendered HTML already
 * carries the correct tags for the entry route, so this is a no-op on first
 * paint and only matters once the router swaps pages without a reload.
 *
 * Elements written here are tagged data-route-head so a later route can clear
 * what an earlier one added — otherwise JSON-LD from /about/ would linger on
 * /talks/.
 */
export function useDocumentHead(meta: RouteMeta) {
  useEffect(() => {
    const head = document.head;

    document.title = meta.title;

    const upsert = (
      selector: string,
      create: () => HTMLElement,
      apply: (el: HTMLElement) => void
    ) => {
      let el = head.querySelector<HTMLElement>(selector);
      if (!el) {
        el = create();
        head.appendChild(el);
      }
      apply(el);
    };

    upsert(
      'meta[name="description"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("name", "description");
        return el;
      },
      (el) => el.setAttribute("content", meta.description)
    );

    // See renderHeadTags: noindex routes carry no canonical, so an existing one
    // left over from a previous route has to be removed rather than rewritten.
    const canonical = canonicalFor(meta);
    const existingCanonical = head.querySelector('link[rel="canonical"]');
    if (meta.noindex) {
      existingCanonical?.remove();
    } else {
      upsert(
        'link[rel="canonical"]',
        () => {
          const el = document.createElement("link");
          el.setAttribute("rel", "canonical");
          return el;
        },
        (el) => el.setAttribute("href", canonical)
      );
    }

    upsert(
      'meta[property="og:url"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:url");
        return el;
      },
      (el) => el.setAttribute("content", canonical)
    );

    upsert(
      'meta[property="og:title"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:title");
        return el;
      },
      (el) => el.setAttribute("content", meta.title)
    );

    upsert(
      'meta[property="og:description"]',
      () => {
        const el = document.createElement("meta");
        el.setAttribute("property", "og:description");
        return el;
      },
      (el) => el.setAttribute("content", meta.description)
    );

    // Route-owned elements: cleared and rewritten on every route change.
    head
      .querySelectorAll("[data-route-head]")
      .forEach((el) => el.remove());

    if (meta.noindex) {
      const robots = document.createElement("meta");
      robots.setAttribute("name", "robots");
      robots.setAttribute("content", "noindex");
      robots.setAttribute("data-route-head", "");
      head.appendChild(robots);
    }

    for (const block of meta.jsonLd ?? []) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-route-head", "");
      script.textContent = JSON.stringify(block, null, 2);
      head.appendChild(script);
    }
  }, [meta]);
}
