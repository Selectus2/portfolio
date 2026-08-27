/** Height of the sticky navbar, so a scrolled-to heading is not hidden under it. */
export const NAV_OFFSET = 64;

/**
 * Smooth-scrolls to a section on the current page.
 * Returns false when the section is not on this page, so the caller can fall
 * back to normal navigation.
 */
export function scrollToSection(id: string): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: "smooth" });
  window.history.replaceState(null, "", `#${id}`);
  return true;
}
