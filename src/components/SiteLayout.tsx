import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";
import { EMAIL, JOB_TITLE, NAME, PROFILE_LINKS } from "@/lib/profile";

/** Navbar + content + footer. Rendered on the server too, so the nav and the
 *  profile links sit in the crawlable body of every page. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteNav />

      <main id="main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 py-10">
          <p className="text-muted-foreground">
            {NAME} — {JOB_TITLE} in Pune, Maharashtra, India.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
            {PROFILE_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  rel="me noopener"
                  target="_blank"
                  className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md px-2 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground"
              >
                Email
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            <Link className="hover:text-foreground" to="/about/">About</Link>
            {" · "}
            <Link className="hover:text-foreground" to="/ruby-on-rails/">Ruby on Rails</Link>
            {" · "}
            <a className="hover:text-foreground" href="/feed.xml">RSS</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
