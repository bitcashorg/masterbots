import slugify from 'slugify'
import { slugWordExtension, wordsToRemove } from '../constants'

slugify.extend(slugWordExtension)

/**
 * Return a slugified copy of a string.
 *
 * @param {string} str The string to be slugified
 * @return {string} The slugified string.
 */
export function toSlug(str: string): string {
  if (!str) {
    return ''
  }
  
  const preSlug = slugify(str, {
    lower: true,
    strict: true,
    trim: true,
  })
  // map each word to remove words from wordsToRemove
  const slug = preSlug
    .split('-')
    .map((word) => {
      // Skip empty words
      if (!word) return ''

      // Check if word is in wordsToRemove (case insensitive)
      if (wordsToRemove.some((removeWord) => removeWord === word)) return ''

      return word
    })
    // Remove empty strings and join words with hyphen
    .filter(Boolean)
    .join('-')

  return slug
}

export function toSlugWithUnderScore(str: string) {
  // Return empty string if input is null or undefined
  if (!str) return ''

  // Regular expression to check if string is already in slug format
  // Allows only lowercase letters, numbers, and underscores
  const slugRegex = /^[a-z0-9_]+$/g

  // If string is already in correct format, return it
  if (slugRegex.test(str)) {
    return str.trimEnd().trimStart().toLowerCase()
  }

  return slugify(str, {
    replacement: '_',
    lower: true,
    strict: true,
    trim: true,
  })
}
