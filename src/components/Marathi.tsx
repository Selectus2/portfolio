import type { ReactNode } from "react";

/**
 * Marathi text that reveals its English gloss.
 *
 * The pattern is borrowed from Deccan Queen on Rails, which marks these up as
 * `<span class="mr" lang="mr" data-en="…">`. Two deliberate changes here:
 *
 *  - it reveals on focus as well as hover, so the gloss is reachable by keyboard
 *    and on touch, where there is no hover at all;
 *  - the gloss is also exposed through `title`, so it survives with CSS off.
 *
 * `lang="mr"` matters beyond styling: it tells screen readers to switch
 * pronunciation rather than reading Devanagari with an English voice.
 */
export function Marathi({
  en,
  children,
}: {
  /** English gloss. Keep it short — it renders as a tooltip. */
  en: string;
  children: ReactNode;
}) {
  return (
    <span
      lang="mr"
      title={en}
      tabIndex={0}
      className="group/mr relative inline-block cursor-help underline decoration-dotted decoration-from-font underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
    >
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-popover px-2 py-1 text-sm font-normal text-popover-foreground opacity-0 shadow-md ring-1 ring-border transition-opacity duration-150 group-hover/mr:opacity-100 group-focus-visible/mr:opacity-100 motion-reduce:transition-none"
      >
        {en}
      </span>
    </span>
  );
}
