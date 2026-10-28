/**
 * Keeps titles and descriptions that come from the admin within search-engine
 * limits: titles about 60 characters, descriptions about 160.
 */
const SUFFIX = " | Humanity Worldwide";

/** Adds the site name only when it fits; long headlines are shown on their own, uncut. */
export function seoTitle(title: string) {
  if (title.length + SUFFIX.length <= 60) return title;
  return { absolute: title };
}

/** Shortens text to a word boundary and adds an ellipsis when needed. */
export function clip(text: string, max = 155) {
  const t = (text || "").replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const space = cut.lastIndexOf(" ");
  return (space > max * 0.6 ? cut.slice(0, space) : cut).replace(/[\s,.;:–-]+$/, "") + "…";
}
