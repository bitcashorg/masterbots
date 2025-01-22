import { toSlug } from 'mb-lib'
import { type ZodSchema, z } from 'zod'

// Zod schema for validating slug strings
export const SlugSchema: ZodSchema<string> = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+[a-z0-9+_-]*[a-z0-9]+$/, 'Invalid slug format.')

//Encodes a string for use in a URL, replacing spaces with the '+' character.
export const encodeQuery = (input: string): string => {
  return encodeURIComponent(input).replace(/%20/g, '+').replace(/ /g, '+')
}

//Decodes a URL-encoded string, converting '+' back into spaces.

export const decodeQuery = (input: string): string => {
  return decodeURIComponent(input.replace(/\+/g, ' '))
}

interface ThreadUrlParams {
  slug?: string
  category?: string
  chatbot?: string
  threadId?: string
}

interface ProfileUrlParams {
  slug?: string
  category?: string
  chatbot?: string
}

interface UserProfileParams {
  userSlug?: string
}

export const urlBuilders = {
  threadUrl: (params: ThreadUrlParams): string => {
    try {
      const { slug, category, chatbot, threadId } = params

      if (!slug || !category || !chatbot || !threadId) {
        const missing = Object.entries(params)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for thread URL: ${missing}`)
        return '/'
      }

      return `/u/${encodeURIComponent(slug)}/t/${toSlug(category)}/${toSlug(chatbot)}/${threadId}`
    } catch (error) {
      console.error('Error constructing thread URL:', error)
      return '/'
    }
  },

  userChatbotUrl: (params: ProfileUrlParams): string => {
    try {
      const { slug, category, chatbot } = params

      if (!slug || !category || !chatbot) {
        const missing = Object.entries(params)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for profile URL: ${missing}`)
        return '/'
      }

      return `/u/${encodeURIComponent(slug)}/t/${toSlug(category)}/${toSlug(chatbot)}`
    } catch (error) {
      console.error('Error constructing profile URL:', error)
      return '/'
    }
  },

  userProfileUrl: (params: UserProfileParams): string => {
    try {
      const { userSlug } = params

      if (!userSlug) {
        console.error('Missing user slug for profile URL')
        return '/'
      }

      return `/u/${encodeURIComponent(userSlug)}/t`
    } catch (error) {
      console.error('Error constructing user profile URL:', error)
      return '/'
    }
  },
}
