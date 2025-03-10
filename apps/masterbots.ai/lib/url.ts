import type {
  ChatbotThreadListUrlParams,
  ProfilesThreadQuestionUrlChatbotParams,
  ProfilesThreadQuestionUrlUserParams,
  ProfilesThreadUrlChatbotParams,
  ProfilesThreadUrlUserParams,
  ProfilesUrlChatbotParams,
  ProfilesUrlUserParams,
  ThreadQuestionUrlParams,
  ThreadUrlParams,
  TopicThreadListUrlParams,
  UserChatbotThreadListUrlParams,
  UserTopicThreadListUrlParams,
} from '@/types/url'
import { toSlug } from 'mb-lib'
import { wordsToRemove } from 'mb-lib/src/constants/slug-seo-words'
import { type ZodSchema, z } from 'zod'

// Zod schema for validating slug strings
export const SlugSchema: ZodSchema<string> = z
  .string()
  .min(1)
  .regex(new RegExp(wordsToRemove.map((r) => r).join('|'), 'g'), 'Invalid slug format.')

//Encodes a string for use in a URL, replacing spaces with the '+' character.
export const encodeQuery = (input: string): string => {
  return encodeURIComponent(input).replace(/%20/g, '+').replace(/ /g, '+')
}

//Decodes a URL-encoded string, converting '+' back into spaces.

export const decodeQuery = (input: string): string => {
  return decodeURIComponent(input.replace(/\+/g, ' '))
}

export const urlBuilders = {
  /**
   * Constructs and returns a URL for a thread list based on the provided parameters.
   *
   * This function generates a URL by appending the slugified version of the category after a base path,
   * which is determined by the provided type. The base path changes as follows:
   *
   * - For "personal": the base path is set to "/c".
   * - For "public": the base path is set to "/".
   * - For "pro": the base path is set to "/pro".
   *
   * If the category is missing or the type is invalid, the function logs an error and returns the root URL ('/').
   * In the event of any unexpected error during URL construction, it catches the error, logs it, and returns '/'.
   */
  topicThreadListUrl({ type, category }: TopicThreadListUrlParams): string {
    try {
      if (!category) {
        console.error(`Missing required parameters for profile URL: ${category}`)
        return '/'
      }

      let basePath = ''

      switch (type) {
        case 'personal':
          basePath = 'c'
          break
        case 'public':
          basePath = ''
          break
        case 'pro':
          basePath = 'pro'
          break
        default:
          console.error('Invalid thread URL type:', type)
          return '/'
      }

      // Return the URL with the thread slug
      return [basePath, toSlug(category)].join('/')
    } catch (error) {
      console.error('Error constructing thread URL:', error)
      return '/'
    }
  },

  /**
   * Constructs and returns a URL for a thread based on the provided parameters.
   *
   * This function generates a URL by appending the slugified version of the category, domain, chatbot, and thread slug
   * after a base path, which is determined by the provided type. The base path changes as follows:
   *
   * - For "personal": the base path is set to "/c".
   * - For "public": the base path is set to "/".
   * - For "pro": the base path is set to "/pro".
   *
   * If any of the required parameters are missing or the type is invalid, the function logs an error and returns the root URL ('/').
   * In the event of any unexpected error during URL construction, it catches the error, logs it, and returns '/'.
   */
  chatbotThreadListUrl({ type, category, domain, chatbot }: ChatbotThreadListUrlParams): string {
    try {
      if (!category || !chatbot || !domain) {
        const threadListEntries = { category, chatbot, domain }
        const missing = Object.entries(threadListEntries)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for thread URL: ${missing}`)
        return '/'
      }
      let basePath = ''

      switch (type) {
        case 'personal':
          basePath = 'c'
          break
        case 'public':
          basePath = ''
          break
        case 'pro':
          basePath = 'pro'
          break
        default:
          console.error('Invalid thread URL type:', type)
          return '/'
      }

      // Return the URL with the thread slug
      // TODO: Remove the empty string at the beginning when the type is 'public'
      return ['', basePath, toSlug(category), toSlug(domain), toSlug(chatbot)].join('/')
    } catch (error) {
      console.error('Error constructing thread URL:', error)
      return '/'
    }
  },

  /**
   * Constructs and returns a URL for a thread based on the provided parameters.
   *
   * This function generates a URL by appending the slugified version of the category, domain, chatbot, and thread slug
   * after a base path, which is determined by the provided type. The base path changes as follows:
   *
   * - For "personal": the base path is set to "/c".
   * - For "public": the base path is set to "/".
   * - For "pro": the base path is set to "/pro".
   *
   * If any of the required parameters are missing or the type is invalid, the function logs an error and returns the root URL ('/').
   * In the event of any unexpected error during URL construction, it catches the error, logs it, and returns '/'.
   */
  threadUrl({ type, category, domain, chatbot, threadSlug }: ThreadUrlParams): string {
    try {
      if (!category || !chatbot || !threadSlug || !domain) {
        const threadUrlEntries = { category, chatbot, domain, threadSlug }
        const missing = Object.entries(threadUrlEntries)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for thread URL: ${missing}`)
        return '/'
      }
      let basePath = ''

      switch (type) {
        case 'personal':
          basePath = '/c'
          break
        case 'public':
          basePath = '/'
          break
        case 'pro':
          basePath = '/pro'
          break
        default:
          console.error('Invalid thread URL type:', type)
          return '/'
      }

      // Return the URL with the thread slug
      return ['', basePath, toSlug(category), toSlug(domain), toSlug(chatbot), threadSlug].join('/')
    } catch (error) {
      console.error('Error constructing thread URL:', error)
      return '/'
    }
  },

  /**
   * Constructs and returns a URL for a thread question based on the provided parameters.
   *
   * This function generates a URL by appending the slugified version of the category, domain, chatbot, thread slug, and thread question slug
   * after a base path, which is determined by the provided type. The base path changes as follows:
   *
   * - For "personal": the base path is set to "/c".
   * - For "public": the base path is set to "/".
   * - For "pro": the base path is set to "/pro".
   *
   * If any of the required parameters are missing or the type is invalid, the function logs an error and returns the root URL ('/').
   * In the event of any unexpected error during URL construction, it catches the error, logs it, and returns '/'.
   */
  threadQuestionUrl({
    type,
    category,
    domain,
    chatbot,
    threadSlug,
    threadQuestionSlug,
  }: ThreadQuestionUrlParams): string {
    try {
      if (!category || !chatbot || !threadSlug || !domain || !threadQuestionSlug) {
        const threadQuestionEntries = { category, chatbot, domain, threadSlug, threadQuestionSlug }
        const missing = Object.entries(threadQuestionEntries)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for thread URL: ${missing}`)
        return '/'
      }

      let basePath = ''

      switch (type) {
        case 'personal':
          basePath = '/c'
          break
        case 'public':
          basePath = '/'
          break
        case 'pro':
          basePath = '/pro'
          break
        default:
          console.error('Invalid thread URL type:', type)
          return '/'
      }

      // Return the URL with the thread slug
      return [
        '',
        basePath,
        toSlug(category),
        toSlug(domain),
        toSlug(chatbot),
        threadSlug,
        threadQuestionSlug,
      ].join('/')
    } catch (error) {
      console.error('Error constructing thread URL:', error)
      return '/'
    }
  },

  /**
   * Constructs and returns a URL for a profile based on the provided parameters.
   *
   * This function accepts an object containing the properties related to the profile URL.
   * Depending on the `type` parameter ('user' or 'chatbot'), it builds the URL segments accordingly:
   *
   * - For a 'user' profile, it requires a non-empty `usernameSlug`. The URL is built as "/u/{usernameSlug}/t".
   * - For a 'chatbot' profile, it requires a non-empty `chatbot` value. The URL is built as "/b/{slugifiedChatbot}".
   *
   * If any required parameter is missing or the profile `type` is invalid, the function logs an error
   * and returns the root path ("/"). It also catches any unexpected errors during URL construction,
   * logs them, and returns "/".
   */
  profilesUrl({
    type,
    usernameSlug,
    chatbot,
  }: ProfilesUrlUserParams | ProfilesUrlChatbotParams): string {
    try {
      switch (type) {
        case 'user': {
          if (!usernameSlug) {
            console.error(`Missing required parameters for profile URL: ${usernameSlug}`)
            return '/'
          }
          return ['', 'u', usernameSlug, 't'].join('/')
        }
        case 'chatbot': {
          if (!chatbot) {
            console.error(`Missing required parameters for profile URL: ${chatbot}`)
            return '/'
          }
          return ['', 'b', toSlug(chatbot)].join('/')
        }
        default: {
          console.error('Invalid profile URL type:', type)
          return '/'
        }
      }
    } catch (error) {
      console.error('Error constructing profile URL:', error)
      return '/'
    }
  },

  userTopicThreadListUrl({
    usernameSlug,
    category,
  }: UserTopicThreadListUrlParams): string {
    try {
      if (!usernameSlug || !category) {
        const userEntries = { category, usernameSlug }
        const missing = Object.entries(userEntries)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for profile URL: ${missing}`)
        return '/'
      }

      return [
        '',
        'u',
        usernameSlug,
        't',
        toSlug(category),
      ].join('/')
    } catch (error) {
      console.error('Error constructing profile URL:', error)
      return '/'
    }
  },

  userChatbotThreadListUrl({
    usernameSlug,
    category,
    domain,
    chatbot,
  }: UserChatbotThreadListUrlParams): string {
    try {
      if (!chatbot || !domain || !usernameSlug || !category) {
        const mainEntries = { chatbot, domain, category, usernameSlug }
        const missing = Object.entries(mainEntries)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for profile URL: ${missing}`)
        return '/'
      }

      return [
        '',
        'u',
        usernameSlug,
        't',
        toSlug(category),
        toSlug(domain),
        toSlug(chatbot),
      ].join('/')
    } catch (error) {
      console.error('Error constructing profile URL:', error)
      return '/'
    }
  },

  /**
   * Constructs and returns a URL for a profile thread based on the provided parameters.
   *
   * This function generates a URL by appending the slugified version of the category, domain, chatbot, and thread slug
   * after a base path, which is determined by the provided type.
   * Depending on the `type` parameter ('user' or 'chatbot'), it builds the URL segments accordingly:
   *
   * - For a 'user' profile, it requires a non-empty `usernameSlug`. The URL is built as "/u/{usernameSlug}/t".
   * - For a 'chatbot' profile, it requires a non-empty `chatbot` value. The URL is built as "/b/{slugifiedChatbot}".
   *
   * If any required parameter is missing or the profile `type` is invalid, the function logs an error
   * and returns the root path ("/"). It also catches any unexpected errors during URL construction,
   * logs them, and returns "/".
   */
  profilesThreadUrl({
    type,
    usernameSlug,
    category,
    domain,
    chatbot,
    threadSlug,
  }: ProfilesThreadUrlUserParams | ProfilesThreadUrlChatbotParams): string {
    try {
      if (!chatbot || !domain || !threadSlug) {
        const mainEntries = { chatbot, domain, threadSlug }
        const missing = Object.entries(mainEntries)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for profile URL: ${missing}`)
        return '/'
      }

      switch (type) {
        case 'user': {
          if (!usernameSlug || !category) {
            const userEntries = { category, usernameSlug }
            const missing = Object.entries(userEntries)
              .filter(([_, value]) => !value)
              .map(([key]) => key)
              .join(', ')

            console.error(`Missing required parameters for profile URL: ${missing}`)
            return '/'
          }
          return [
            '',
            'u',
            usernameSlug,
            't',
            toSlug(category),
            toSlug(domain),
            toSlug(chatbot),
            threadSlug,
          ].join('/')
        }
        case 'chatbot': {
          return ['', 'b', toSlug(chatbot), toSlug(domain), threadSlug].join('/')
        }
        default: {
          console.error('Invalid profile URL type:', type)
          return '/'
        }
      }
    } catch (error) {
      console.error('Error constructing profile URL:', error)
      return '/'
    }
  },

  /**
   * Constructs and returns a URL for a profile thread question based on the provided parameters.
   *
   * This function generates a URL by appending the slugified version of the category, domain, chatbot, thread slug, and thread question slug
   * after a base path, which is determined by the provided type.
   * Depending on the `type` parameter ('user' or 'chatbot'), it builds the URL segments accordingly:
   *
   * - For a 'user' profile, it requires a non-empty `usernameSlug`. The URL is built as "/u/{usernameSlug}/t".
   * - For a 'chatbot' profile, it requires a non-empty `chatbot` value. The URL is built as "/b/{slugifiedChatbot}".
   *
   * If any required parameter is missing or the profile `type` is invalid, the function logs an error
   * and returns the root path ("/"). It also catches any unexpected errors during URL construction,
   * logs them, and returns "/".
   */
  profilesThreadQuestionUrl({
    type,
    usernameSlug,
    category,
    domain,
    chatbot,
    threadSlug,
    threadQuestionSlug,
  }: ProfilesThreadQuestionUrlUserParams | ProfilesThreadQuestionUrlChatbotParams): string {
    try {
      if (!chatbot || !domain || !threadSlug || !threadQuestionSlug) {
        const mainEntries = { chatbot, domain, threadSlug, threadQuestionSlug }
        const missing = Object.entries(mainEntries)
          .filter(([_, value]) => !value)
          .map(([key]) => key)
          .join(', ')

        console.error(`Missing required parameters for profile URL: ${missing}`)
        return '/'
      }

      switch (type) {
        case 'user': {
          if (!usernameSlug || !category) {
            const userEntries = { category, usernameSlug }
            const missing = Object.entries(userEntries)
              .filter(([_, value]) => !value)
              .map(([key]) => key)
              .join(', ')

            console.error(`Missing required parameters for profile URL: ${missing}`)
            return '/'
          }
          return [
            '',
            'u',
            usernameSlug,
            't',
            toSlug(category),
            toSlug(domain),
            toSlug(chatbot),
            threadSlug,
            threadQuestionSlug,
          ].join('/')
        }
        case 'chatbot': {
          return ['', 'b', toSlug(chatbot), toSlug(domain), threadSlug, threadQuestionSlug].join(
            '/',
          )
        }
        default: {
          console.error('Invalid profile URL type:', type)
          return '/'
        }
      }
    } catch (error) {
      console.error('Error constructing profile URL:', error)
      return '/'
    }
  },
} as const
