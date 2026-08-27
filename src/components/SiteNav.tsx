import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAME } from "@/lib/profile";
import { NAV_OFFSET, scrollToSection } from "@/lib/scroll";

/**
 * Sticky top navbar, replacing the old left sidebar.
 *
 * Items are hybrid: each names a section on the scrolling home page *and* a
 * standalone route. On `/` a click smooth-scrolls to the section; anywhere else
 * it navigates to the full page. That keeps the one-page feel without giving up
 * the thirteen real URLs the deep pages provide.
 */

export type NavItem = { label: string; sectionId: string; to: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Ruby on Rails", sectionId: "ruby-on-rails", to: "/ruby-on-rails/" },
  { label: "Open Source", sectionId: "open-source", to: "/open-source/" },
  { label: "Talks", sectionId: "talks", to: "/talks/" },
  { label: "Community", sectionId: "community", to: "/community/" },
  { label: "Writing", sectionId: "writing", to: "/writing/" },
  { label: "Podcasts", sectionId: "podcasts", to: "/podcasts/" },
  { label: "Books", sectionId: "books", to: "/books/" },
  { label: "About", sectionId: "about", to: "/about/" },
];

export function SiteNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const onHome = location.pathname === "/";

  // Close the mobile menu whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  // Highlight the section currently in view. Only meaningful on the home page,
  // and only attached there so other pages pay nothing for it.
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.sectionId)).filter(
      (el): el is HTMLElement => Boolean(el)
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: `-${NAV_OFFSET + 8}px 0px -60% 0px`, threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [onHome, location.pathname]);

  const handleClick = (item: NavItem) => (e: React.MouseEvent) => {
    if (!onHome) return; // let the Link navigate to the full page
    if (scrollToSection(item.sectionId)) {
      e.preventDefault();
      setOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <nav
        aria-label="Primary"
        className="container mx-auto flex h-16 items-center justify-between px-6"
      >
        <Link
          to="/"
          className="flex min-h-11 min-w-11 items-center gap-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-sm font-bold text-white">
            VS
          </span>
          <span className="hidden font-semibold sm:inline">{NAME}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                onClick={handleClick(item)}
                aria-current={
                  location.pathname === item.to
                    ? "page"
                    : onHome && active === item.sectionId
                      ? "true"
                      : undefined
                }
                className={cn(
                  "inline-flex min-h-11 items-center rounded-lg px-3 text-sm transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  location.pathname === item.to ||
                    (onHome && active === item.sectionId)
                    ? "bg-accent font-medium text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Button
          variant="outline"
          size="icon"
          className="md:hidden min-h-11 min-w-11"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {open ? (
        <div id="mobile-nav" className="border-t border-border md:hidden">
          <ul className="container mx-auto px-6 py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  onClick={handleClick(item)}
                  className="flex min-h-11 items-center rounded-lg px-3 text-sm text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
