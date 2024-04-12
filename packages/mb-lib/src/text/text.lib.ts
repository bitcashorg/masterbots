/**
 * Return a slugified copy of a string.
 *
 * @param {string} str The string to be slugified
 * @return {string} The slugified string.
 */
export function toSlug(str: string): string {
  let s = str;
  if (!s) {
    return "";
  }
  s = s.toLowerCase().trim();
  s = s.replace(/\&/g, "n");
  s = s.replace(/[ ]+/g, "_");
  s = s.replace(/[-]+/g, "_");
  s = s.replace(/[^a-z0-9_]+/g, "");
  return s;
}
