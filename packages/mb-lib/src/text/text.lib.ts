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
  s = s.replace(/ & /g, "_n_");
  s = s.replace(/&/g, "n");
  s = s.replace(/[ ]+/g, "-");
  s = s.replace(/[-]+/g, "-");
  s = s.replace(/[^a-z0-9-]+/g, "");
  return s;
}



export function toSlugWithUnderScore(str: string) {
  // Return empty string if input is null or undefined
  if (!str) return '';
  
  // Regular expression to check if string is already in slug format
  // Allows only lowercase letters, numbers, and underscores
  const slugRegex = /^[a-z0-9_]+$/;
  
  // If string is already in correct format, return it
  if (slugRegex.test(str)) {
    return str;
  }
  
  return str
    // Convert to lowercase
    .toLowerCase()
    // Replace accented characters with regular ones
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special characters with underscore
    .replace(/[^a-z0-9]+/g, '_')
    // Remove underscores from start and end
    .replace(/^_+|_+$/g, '')
    // Replace multiple consecutive underscores with single underscore
    .replace(/_+/g, '_');
}