import { doesMessageSlugExist, doesThreadSlugExist } from '@/app/actions'
import { canonicalChatbotDomains } from '@/lib/constants/canonical-domains'
import { domainSlugs } from '@/lib/constants/domain-slugs'
import { delayFetch, nanoid } from '@/lib/utils'
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
import { appConfig } from 'mb-env'
import { toSlug } from 'mb-lib'
import { wordsToRemove } from 'mb-lib/src/constants/slug-seo-words'
import { type ZodSchema, z } from 'zod'

type PathParams = {
	category: string
	domain: string
	chatbot: string
	threadSlug: string
	threadQuestionSlug: string
}

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
			(
				canonicalChatbotDomains.find(
					(cChatbot) => cChatbot.name === chatbotName.toLocaleLowerCase(),
				)?.value || '/'
			).split('/')[1] || 'prompt'
		)
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

export function normalizeCategorySlug(category: string): string {
	return category.toLowerCase().trim().replace(/\s/g, '-')
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
				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for profile URL: ${category}`,
					)
				return '/'
			}

			let basePath = ''

			switch (type) {
				case 'org':
					basePath = 'org'
					break
				case 'personal':
				case 'pro':
					basePath = ''
					break
				default:
					if (appConfig.features.devMode)
						console.error('Invalid thread URL type:', type)
					return '/'
			}

			// Return the URL with the thread slug
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(normalizeCategorySlug(category))
			return pathParts.join('/')
		} catch (error) {
			if (appConfig.features.devMode)
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

				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for thread URL: ${missing}`,
					)
				return '/'
			}
			let basePath = ''

			switch (type) {
				case 'org':
					basePath = 'org'
					break
				case 'personal':
				case 'pro':
					basePath = ''
					break
				default:
					if (appConfig.features.devMode)
						console.error('Invalid thread URL type:', type)
					return '/'
			}

			// Return the URL with the thread slug
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(
				normalizeCategorySlug(category),
				normalizeDomainSlug(domain, raw),
				chatbot.toLowerCase(),
			)
			return pathParts.join('/')
		} catch (error) {
			if (appConfig.features.devMode)
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

				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for thread URL: ${missing}`,
					)
				return '/'
			}
			let basePath = ''

			switch (type) {
				case 'org':
					basePath = 'org'
					break
				case 'personal':
				case 'pro':
					basePath = ''
					break
				default:
					if (appConfig.features.devMode)
						console.error('Invalid thread URL type:', type)
					return '/'
			}

			// Return the URL with the thread slug
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(
				normalizeCategorySlug(category),
				normalizeDomainSlug(domain, raw),
				chatbot.toLowerCase(),
				threadSlug,
			)
			return pathParts.join('/')
		} catch (error) {
			if (appConfig.features.devMode)
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
			if (type === 'bot') {
				if (!chatbot || !threadSlug || !threadQuestionSlug) {
					return '/'
				}
				if (!threadQuestionSlug) {
					return ['', 'b', toSlug(chatbot), threadSlug].join('/')
				}
				return ['', 'b', toSlug(chatbot), threadSlug, threadQuestionSlug].join(
					'/',
				)
			}

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

				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for thread URL: ${missing}`,
					)
				return '/'
			}

			let basePath = ''

			switch (type) {
				case 'org':
					basePath = 'org'
					break
				case 'personal':
				case 'pro':
					basePath = ''
					break
				default:
					if (appConfig.features.devMode)
						console.error('Invalid thread URL type:', type)
					return '/'
			}

			// Return the URL with the thread slug
			const pathParts = basePath ? ['', basePath] : ['']
			pathParts.push(
				normalizeCategorySlug(category),
				normalizeDomainSlug(domain, raw),
				chatbot.toLowerCase(),
				threadSlug,
				threadQuestionSlug,
			)
			return pathParts.join('/')
		} catch (error) {
			if (appConfig.features.devMode)
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
					return ['', 'b', chatbot.toLowerCase()].join('/')
				}
				default: {
					if (appConfig.features.devMode)
						console.error('Invalid profile URL type:', type)
					return '/'
				}
			}
		} catch (error) {
			if (appConfig.features.devMode)
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

				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for profile URL: ${missing}`,
					)
				return '/'
			}

			return ['', 'u', usernameSlug, 't', normalizeCategorySlug(category)].join(
				'/',
			)
		} catch (error) {
			if (appConfig.features.devMode)
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

				if (appConfig.features.devMode)
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
				normalizeCategorySlug(category),
				normalizeDomainSlug(domain, raw),
				chatbot.toLowerCase(),
			].join('/')
		} catch (error) {
			if (appConfig.features.devMode)
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
			if (!chatbot || !threadSlug) {
				const mainEntries = { chatbot, threadSlug }
				const missing = Object.entries(mainEntries)
					.filter(([_, value]) => !value)
					.map(([key]) => key)
					.join(', ')

				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for profile URL: ${missing}`,
					)
				return '/'
			}

			switch (type) {
				case 'user': {
					if (!usernameSlug || !domain || !category) {
						const userEntries = { category, usernameSlug, domain }
						const missing = Object.entries(userEntries)
							.filter(([_, value]) => !value)
							.map(([key]) => key)
							.join(', ')

						if (appConfig.features.devMode)
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
						normalizeCategorySlug(category),
						normalizeDomainSlug(domain, raw),
						chatbot.toLowerCase(),
						threadSlug,
					].join('/')
				}
				case 'chatbot': {
					return ['', 'b', chatbot.toLowerCase(), threadSlug].join('/')
				}
				default: {
					if (appConfig.features.devMode)
						console.error('Invalid profile URL type:', type)
					return '/'
				}
			}
		} catch (error) {
			if (appConfig.features.devMode)
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

				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for profile URL: ${missing}`,
					)
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

						if (appConfig.features.devMode)
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
						normalizeCategorySlug(category),
						normalizeDomainSlug(domain, raw),
						chatbot.toLowerCase(),
						threadSlug,
						threadQuestionSlug,
					].join('/')
				}
				case 'chatbot': {
					return [
						'',
						'b',
						chatbot.toLowerCase(),
						domain,
						threadSlug,
						threadQuestionSlug,
					].join('/')
				}
				default: {
					if (appConfig.features.devMode)
						console.error('Invalid profile URL type:', type)
					return '/'
				}
			}
		} catch (error) {
			if (appConfig.features.devMode)
				console.error('Error constructing profile URL:', error)
			return '/'
		}
	},

	// * 5. URL for the chatbot profile page
	chatbotProfileUrl({
		domain,
		chatbot,
	}: {
		domain: string
		chatbot: string
	}): string {
		try {
			if (!domain || !chatbot) {
				const mainEntries = { domain, chatbot }
				const missing = Object.entries(mainEntries)
					.filter(([_, value]) => !value)
					.map(([key]) => key)
					.join(', ')

				if (appConfig.features.devMode)
					console.error(
						`Missing required parameters for profile URL: ${missing}`,
					)
				return '/'
			}
			return ['', 'b', chatbot.toLowerCase()].join('/')
		} catch (error) {
			if (appConfig.features.devMode)
				console.error('Error constructing profile URL:', error)
			return '/'
		}
	},
} as const

// Function to generate a unique slug with retries using an iterative approach
export async function generateUniqueSlug(
	baseContent: string,
	type: 'thread' | 'message' = 'thread',
	maxAttempts = 10,
): Promise<string> {
	const doesSlugExistFn =
		type === 'thread' ? doesThreadSlugExist : doesMessageSlugExist
	// Delay the existence check function to avoid overwhelming the backend
	const delayDoesSlugExist = async (slug: string) => {
		await delayFetch(250)
		return await doesSlugExistFn(slug)
	}
	const contentSubstring = baseContent.substring(0, 48) // Limit base content length
	const baseSlug = toSlug(contentSubstring)

	let finalSlug = baseSlug
	// Initial check for the base slug
	let slugCheck = await delayDoesSlugExist(finalSlug)

	// ? If the base slug is unique, return immediately
	if (!slugCheck.exists) {
		return finalSlug
	}

	if (appConfig.features.devMode) {
		console.log(
			`[generateUniqueSlug] Base slug "${finalSlug}" exists (sequence: ${slugCheck.sequence}). Attempting alternatives.`,
		)
	}
	// Initial call to the recursive function starting with attempt 1
	// Pass the sequence number found during the initial check
	slugCheck = await findUniqueSlugRecursive(
		baseSlug,
		slugCheck.sequence, // Use the sequence from the initial check
		1, // Start attempts from 1
		maxAttempts,
		delayDoesSlugExist,
	)
	finalSlug = slugCheck.slug

	// If max attempts reached and slug still exists, resort to nanoid
	if (slugCheck.exists) {
		if (appConfig.features.devMode) {
			console.warn(
				`[generateUniqueSlug] Max attempts (${maxAttempts}) reached. Using nanoid fallback.`,
			)
		}
		// Call the recursive nanoid fallback function
		const maxNanoidAttempts = 5
		slugCheck = await findUniqueSlugRecursive(
			baseSlug,
			slugCheck.sequence, // Use the sequence from the initial check
			1, // Start nanoid attempts from 1
			maxNanoidAttempts,
			delayDoesSlugExist,
			true, // Use nanoid
		)
		finalSlug = slugCheck.slug

		if (slugCheck.exists) {
			// ! Extremely unlikely scenario
			if (appConfig.features.devMode) {
				console.error(
					`[generateUniqueSlug] Failed to generate unique slug even with nanoid after ${maxNanoidAttempts} attempts. Returning last generated slug: ${finalSlug}`,
				)
			}
			// Return the last generated slug
			return finalSlug
		}
	}

	console.log(`[generateUniqueSlug] Final unique slug: "${finalSlug}"`)
	return finalSlug
}

// Define the recursive helper function
async function findUniqueSlugRecursive(
	baseSlug: string,
	sequence: number,
	attempt: number,
	maxAttempts: number,
	delayDoesSlugExist: (
		slug: string,
	) => Promise<{ exists: boolean; slug: string; sequence: number }>,
	withNanoid = false,
): Promise<{ exists: boolean; slug: string; sequence: number }> {
	// If max attempts reached, we try one more time before falling back to nanoid
	if (attempt > maxAttempts) {
		const lastAttemptedSlug = toSlug(
			`${baseSlug} ${withNanoid ? nanoid(6) : sequence + attempt - 1}`,
			true,
		)
		// We need one last check here to be sure before nanoid fallback
		return await delayDoesSlugExist(lastAttemptedSlug)
	}

	const currentSlug = toSlug(
		`${baseSlug} ${withNanoid ? nanoid(6) : sequence + 1 + attempt}`,
		true,
	)
	const slugCheck = await delayDoesSlugExist(currentSlug)
	if (appConfig.features.devMode) {
		console.log(
			`[generateUniqueSlug] Recursive attempt ${attempt}: Slug "${currentSlug}" check result:`,
			slugCheck,
		)
	}

	if (!slugCheck.exists) {
		return {
			...slugCheck,
			slug: currentSlug,
		}
	}

	if (appConfig.features.devMode) {
		console.log(
			`[generateUniqueSlug] Slug "${currentSlug}" exists. Proceeding to attempt ${withNanoid ? attempt + 1 : sequence + 1 + attempt}.`,
		)
	}
	return findUniqueSlugRecursive(
		baseSlug,
		sequence,
		attempt + 1,
		maxAttempts,
		delayDoesSlugExist,
	)
}

export function parsePath(pathname: string): PathParams {
	const segments = pathname.split('/').filter(Boolean)
	const isProfileThread = segments[0] === 'u' && segments[2] === 't'
	const isBotProfile = segments[0] === 'b'

	if (isBotProfile) {
		return {
			chatbot: segments[1],
			threadSlug: segments[2],
			threadQuestionSlug: segments[3] || '',
			category: '',
			domain: '',
		}
	}

	if (isProfileThread) {
		return {
			category: segments[3],
			domain: segments[4],
			chatbot: segments[5],
			threadSlug: segments[6],
			threadQuestionSlug: segments[7],
		}
	}

	return {
		category: segments[0],
		domain: segments[1],
		chatbot: segments[2],
		threadSlug: segments[3],
		threadQuestionSlug: segments[4],
	}
}
