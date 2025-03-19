import { canonicalChatbotDomains } from '@/lib/constants/canonical-domains'
import { domainSlugs } from '@/lib/constants/domain-slugs'
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
	.regex(
		new RegExp(wordsToRemove.map((r) => r).join('|'), 'g'),
		'Invalid slug format.',
	)

//Encodes a string for use in a URL, replacing spaces with the '+' character.
export const encodeQuery = (input: string): string => {
	return encodeURIComponent(input).replace(/%20/g, '+').replace(/ /g, '+')
}

//Decodes a URL-encoded string, converting '+' back into spaces.

export const decodeQuery = (input: string): string => {
	return decodeURIComponent(input.replace(/\+/g, ' '))
}

export const getCanonicalDomain = (chatbotName: string) => {
	try {
		return (
			canonicalChatbotDomains.find(
				(cChatbot) => cChatbot.name === chatbotName.toLocaleLowerCase(),
			)?.value || '/'
		).split('/')[1]
	} catch (error) {
		console.error('Error getting canonical domain:', error)
		return 'prompt'
	}
}

/**
 * Normalizes a chatbot domain name by finding the best matching slug from a predefined list.
 *
 * This function attempts to match the input domain to a canonical form using the following strategy:
 * 1. Process the input domain by removing parenthetical content and converting to a slug format
 * 2. Check for an exact match in the predefined domain slugs (highest priority)
 * 3. Look for word boundary matches where the processed domain appears as a complete word
 * 4. Try partial matches as a last resort, prioritizing by closest length
 * 5. If no matches are found, return the processed domain slug
 *
 * @param domain - The chatbot domain name to normalize
 * @param raw - If true, returns the raw slug without normalization
 * @returns A normalized slug version of the domain that best matches the predefined list
 *
 * @example
 * // Returns "artificial-intelligence" if it's in the domainSlugs list
 * normalizeDomainSlug("Artificial Intelligence (AI)")
 */
export function normalizeDomainSlug(domain: string, raw?: boolean): string {
	const domainSlug = toSlug(domain.replace(/\s\(\w*./g, ''))

	// ? Return raw slug if requested
	if (raw) {
		return domainSlug
	}

	// * 1. Check for exact match first (highest priority)
	const exactMatch = domainSlugs.find((slug) => slug === domainSlug)
	if (exactMatch) {
		return exactMatch
	}

	// * 2. Find word boundary matches where domainSlug appears as a complete word
	const wordMatches = domainSlugs.filter((slug) => {
		const regex = new RegExp(`\\b${domainSlug}\\b`)
		return regex.test(slug)
	})

	// ? If multiple word matches found, return original domainSlug
	if (wordMatches.length > 1) {
		return domainSlug
	}

	// ? If exactly one word match found, use it
	if (wordMatches.length === 1) {
		return wordMatches[0]
	}

	// * 3. Try partial matches as a last resort
	const partialMatches = domainSlugs.filter(
		(slug) => slug.includes(domainSlug) || domainSlug.includes(slug),
	)

	// ? If multiple partial matches, find the closest one by length
	if (partialMatches.length > 0) {
		partialMatches.sort(
			(a, b) =>
				Math.abs(a.length - domainSlug.length) -
				Math.abs(b.length - domainSlug.length),
		)
		return partialMatches[0]
	}

	// * 4. No matches found, return the original slug
	return domainSlug
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
				console.error(
					`Missing required parameters for profile URL: ${category}`,
				)
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
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(toSlug(category))
			return pathParts.join('/')
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
	chatbotThreadListUrl({
		type,
		category,
		domain,
		chatbot,
		raw = false,
	}: ChatbotThreadListUrlParams): string {
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
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(
				toSlug(category),
				normalizeDomainSlug(domain, raw),
				toSlug(chatbot),
			)
			return pathParts.join('/')
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
	threadUrl({
		type,
		category,
		domain,
		chatbot,
		threadSlug,
		raw = false,
	}: ThreadUrlParams): string {
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
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(
				toSlug(category),
				normalizeDomainSlug(domain, raw),
				toSlug(chatbot),
				threadSlug,
			)
			return pathParts.join('/')
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
		raw = false,
	}: ThreadQuestionUrlParams): string {
		try {
			if (
				!category ||
				!chatbot ||
				!threadSlug ||
				!domain ||
				!threadQuestionSlug
			) {
				const threadQuestionEntries = {
					category,
					chatbot,
					domain,
					threadSlug,
					threadQuestionSlug,
				}
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
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(
				toSlug(category),
				normalizeDomainSlug(domain, raw),
				toSlug(chatbot),
				threadSlug,
				threadQuestionSlug,
			)
			return pathParts.join('/')
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
						console.error(
							`Missing required parameters for profile URL: ${usernameSlug}`,
						)
						return '/'
					}
					return ['', 'u', usernameSlug, 't'].join('/')
				}
				case 'chatbot': {
					if (!chatbot) {
						console.error(
							`Missing required parameters for profile URL: ${chatbot}`,
						)
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

			return ['', 'u', usernameSlug, 't', toSlug(category)].join('/')
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
		raw = false,
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
				normalizeDomainSlug(domain, raw),
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
		raw = false,
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

						console.error(
							`Missing required parameters for profile URL: ${missing}`,
						)
						return '/'
					}
					return [
						'',
						'u',
						usernameSlug,
						't',
						toSlug(category),
						normalizeDomainSlug(domain, raw),
						toSlug(chatbot),
						threadSlug,
					].join('/')
				}
				case 'chatbot': {
					return ['', 'b', toSlug(chatbot), domain, threadSlug].join('/')
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
		raw = false,
	}:
		| ProfilesThreadQuestionUrlUserParams
		| ProfilesThreadQuestionUrlChatbotParams): string {
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

						console.error(
							`Missing required parameters for profile URL: ${missing}`,
						)
						return '/'
					}
					return [
						'',
						'u',
						usernameSlug,
						't',
						toSlug(category),
						normalizeDomainSlug(domain, raw),
						toSlug(chatbot),
						threadSlug,
						threadQuestionSlug,
					].join('/')
				}
				case 'chatbot': {
					return [
						'',
						'b',
						toSlug(chatbot),
						domain,
						threadSlug,
						threadQuestionSlug,
					].join('/')
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
