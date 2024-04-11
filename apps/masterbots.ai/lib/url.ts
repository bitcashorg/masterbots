import { z, ZodSchema } from 'zod'

// Zod schema for validating slug strings
export const SlugSchema: ZodSchema<string> = z.string()
  .min(1)
  .regex(/^[a-z0-9]+[a-z0-9+_-]*[a-z0-9]+$/, "Invalid slug format.")

// Function to convert a username into a slug
export const toSlug = (username: string, separator: string): string => {
  return username
    .toLowerCase()
    .replace(/&/g, '_')
    .replace(/ & /g, '_')
    .replace(/[^a-z0-9_]/g, separator)
}

// Function to simulate converting a slug back to a username
export const fromSlug = (slug: string, separator: string): string => {
  return slug
    .replace(new RegExp(`[${separator}]+`, 'g'), ' ')
    .replace(/_/g, '&')
}

//Encodes a string for use in a URL, replacing spaces with the '+' character.
export const encodeQuery = (input: string): string => {
  return encodeURIComponent(input).replace(/%20/g, '+')
}

//Decodes a URL-encoded string, converting '+' back into spaces.

export const decodeQuery = (input: string): string => {
  return decodeURIComponent(input.replace(/\+/g, ' '))
}
