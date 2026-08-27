import type { ReactNode } from "react";

/**
 * Page primitives in the site's existing visual language: full-width sections
 * on alternating backgrounds, a centred heading block, and shadcn Cards.
 */

export function PageSection({
  children,
  muted = false,
  className = "",
  id,
}: {
  children: ReactNode;
  muted?: boolean;
  className?: string;
  /** Anchor target for the navbar's smooth-scroll on the home page. */
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-16 py-20 ${muted ? "bg-muted/30" : "bg-background"} ${className}`}
    >
      <div className="container mx-auto px-6">{children}</div>
    </section>
  );
}

/** The one <h1> on a page. Matches the h2 heading block used by the sections. */
export function PageHeading({
  title,
  lede,
}: {
  title: string;
  lede?: ReactNode;
}) {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      {lede ? (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{lede}</p>
      ) : null}
    </div>
  );
}

export function SectionHeading({
  title,
  lede,
}: {
  title: string;
  lede?: ReactNode;
}) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold mb-4">{title}</h2>
      {lede ? (
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{lede}</p>
      ) : null}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
      {children}
    </span>
  );
}

/**
 * Marks a fact no source supplies.
 *
 * Hidden from visitors by default — a gap shows as absence, never as invented
 * copy. Run `npm run dev:todos` (or set VITE_SHOW_TODOS=1) to render them while
 * editing, and `npm run check:content` to list the ones held in front matter.
 */
export function Todo({ children }: { children: ReactNode }) {
  if (!import.meta.env.VITE_SHOW_TODOS) return null;
  return (
    <p className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
      <span className="font-mono font-medium uppercase">Todo:</span> {children}
    </p>
  );
}
