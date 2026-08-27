/** Human-readable duration from seconds, e.g. 826 -> "13:46". */
export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** ISO 8601 duration for JSON-LD, e.g. 826 -> "PT13M46S". */
export function isoDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `PT${m}M${s}S`;
}

/**
 * "2025-09-12" -> "12 September 2025"; "2024-11" -> "November 2024".
 * Parsed as UTC so a local-timezone shift cannot move it to the previous day.
 */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d ?? 1));
  return date.toLocaleDateString("en-GB", {
    ...(d ? { day: "numeric" } : {}),
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** True when the date carries a day, not just a month. */
export function isFullDate(iso: string): boolean {
  return /^\d{4}-\d{2}-\d{2}$/.test(iso);
}

/** YouTube watch/short URL -> embed URL. Returns null if not recognised. */
export function youtubeEmbedUrl(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}
