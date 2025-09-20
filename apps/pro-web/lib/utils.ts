import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import type { Message as AIMessage } from 'ai/react'
import { type ClassValue, clsx } from 'clsx'
import type { Message, SocialFollowing } from 'mb-genql'
import { customAlphabet } from 'nanoid'
import { type ReactNode, isValidElement } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
	'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	7,
) // 7-character random string

export async function fetcher<JSON>(
	input: RequestInfo,
	init?: RequestInit,
): Promise<JSON> {
	const res = await fetch(input, init)

	if (!res.ok) {
		const json = await res.json()
		if (json.error) {
			const error = new Error(json.error) as Error & {
				status: number
			}
			error.status = res.status
			throw error
		}

		throw new Error('An unexpected error occurred')
	}

	return res.json()
}

export function delayFetch(ms = 200) {
	return new Promise((resolve) => {
		const timeout = setTimeout(() => {
			clearTimeout(timeout)
			resolve(true)
		}, ms)
	})
}

export function formatDate(input: string | number | Date): string {
	const date = new Date(input)
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}

export function extractBetweenMarkers(
	str: string,
	startMarker: string,
	endMarker?: string, // endMarker is now optional
): string {
	let startIndex = str.indexOf(startMarker)
	const endIndex = endMarker
		? str.indexOf(endMarker, startIndex + startMarker.length)
		: str.length

	if (startIndex === -1) {
		// Start marker not found, return the whole string
		return str
	}

	if (endMarker && (endIndex === -1 || startIndex >= endIndex)) {
		// End marker is provided but not found or in the wrong order
		return ''
	}

	// Adjust the startIndex to get the text after the startMarker
	startIndex += startMarker.length

	return str.substring(startIndex, endIndex).trim()
}

// From browse-list.tsx
export function createMessagePairs(messages: Message[] | AIMessage[]) {
	const messagePairs = []

	for (let i = 0; i < messages.length; i++) {
		const message = messages[i]

		if (message.role === 'user') {
			const userMessage = message
			const chatGptMessage = findNextAssistantMessage(messages, i + 1)
			messagePairs.push({
				userMessage,
				chatGptMessage: chatGptMessage ? [chatGptMessage] : [],
			})
		}
	}

	return messagePairs
}

const findNextAssistantMessage = (
	messages: Message[] | AIMessage[],
	startIndex: number,
) => {
	if (messages[startIndex]?.role === 'assistant') {
		return {
			...messages[startIndex],
			content: cleanPrompt(messages[startIndex].content),
		}
	}
	return null
}

export const readingTime = (messages: { content: string }[]) => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	let contentGroup: any = []

	for (let i = 0; i <= messages?.length; i++) {
		const paragraphGroup = messages[i]?.content?.match(/\\n/g)
		if (paragraphGroup) contentGroup = [...contentGroup, ...paragraphGroup]
	}

	// calculate the content time
	const text = contentGroup.join(' ')
	const wpm = 225
	const words = text.trim().split(/\s+/).length
	const time = Math.ceil(words / wpm)
	return time
}

// Easing function for smooth animation
export const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
	let time = t / (d / 2)
	if (time < 1) return (c / 2) * time * time + b
	time--
	return (-c / 2) * (time * (time - 2) - 1) + b
}

let animationFrameId: number
export const scrollToBottomOfElement = (element?: HTMLElement) => {
	if (!element) return
	const targetScroll = element.scrollHeight - element.clientHeight
	const duration = 500
	const startTime = performance.now()

	const animateScroll = (currentTime: number) => {
		const elapsed = currentTime - startTime
		const position = easeInOutQuad(
			elapsed,
			element.scrollTop,
			targetScroll - element.scrollTop,
			duration,
		)
		element.scrollTop = position

		if (elapsed < duration) {
			animationFrameId = requestAnimationFrame(animateScroll)
		} else {
			cancelAnimationFrame(animationFrameId)
		}
	}

	animationFrameId = requestAnimationFrame(animateScroll)
}

export async function sleep(time: number) {
	return new Promise((resolve) => setTimeout(resolve, time))
}

export const plans = [
	{
		id: 'monthly',
		duration: 'monthly',
		price: 4.5,
		features_title: 'Everything from <strong>Free</strong> plan plus:',
		features: ['Access to our Professional tools'],
	},
	{
		id: 'yearly',
		duration: 'yearly',
		price: 3.99,
		features_title: 'Everything from <strong>Monthly</strong> plan plus: ',
		features: [
			'11% of discount every month.',
			'Access to pre-release content to chat with.',
		],
	},
]

export function getDate(timestamp: number) {
	let date: Date
	if (timestamp === 0) {
		date = new Date()
	} else {
		date = new Date(timestamp * 1000)
	}
	const options: Intl.DateTimeFormatOptions = {
		month: 'long',
		day: 'numeric',
	}
	const dateString = date.toLocaleString('en-US', options)

	return dateString
}

export function getCurrentOrTargetDate() {
	const today = new Date()
	return today.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
	})
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getKeyByValue(map: any, searchValue: string) {
	for (const [key, value] of map.entries()) {
		if (value === searchValue) {
			return key
		}
	}
	return null // Return null if the value is not found
}

export type RoleTypes = 'user' | 'moderator' | 'admin'

export function isAdminOrModeratorRole(role: RoleTypes) {
	return role === 'admin' || role === 'moderator'
}
export const validateEmail = (email: string) => {
	const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	return re.test(email)
}

export function removeSurroundingQuotes(str: string) {
	// Check if string starts AND ends with quotes
	if (str.startsWith('"') && str.endsWith('"')) {
		return str.slice(1, -1)
	}
	return str
}

// * Converts ReactNode content to string for processing
export function extractTextFromReactNode(node: ReactNode): string {
	if (typeof node === 'string') return node
	if (typeof node === 'number') return node.toString()
	if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('')
	if (isValidElement(node)) {
		const element = node as React.ReactElement<{ children: ReactNode }>
		return extractTextFromReactNode(element.props.children)
	}
	return ''
}

export const formatNumber = (num: number) => {
	const lookup = [
		{ value: 1e9, symbol: 'B' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e3, symbol: 'K' },
	]

	// Handle negative numbers
	const isNegative = num < 0
	const absNum = Math.abs(num)

	// Find the appropriate suffix
	const item = lookup.find((item) => absNum >= item.value)

	if (!item) {
		// If number is smaller than 1000, return as is
		return isNegative ? `-${absNum}` : absNum.toString()
	}

	// Calculate the formatted value with one decimal place
	const formattedValue = (absNum / item.value).toFixed(1)

	// Remove .0 if it exists
	const cleanValue = formattedValue.replace('.0', '')

	return `${isNegative ? '-' : ''}${cleanValue}${item.symbol}`
}

interface IProps {
	followers: readonly SocialFollowing[] | undefined | null
	userId: string
}
export const isFollowed = ({ followers, userId }: IProps): boolean => {
	return Boolean(followers?.some((follower) => follower.followerId === userId))
}
/**
 * Short the large numbers to a more friendly format. Examples: 670, 3.2k, 1.22m, 3.445b
 * **/
export function numberShortener(number: number): string {
	if (number < 1000) return number.toString()
	if (number < 1000000) return `${(number / 1000).toFixed(1)}k`
	if (number < 1000000000) return `${(number / 1000000).toFixed(2)}m`
	return `${(number / 1000000000).toFixed(3)}b`
}

/**
 * Determines the route type based on the pathname
 * @param pathname - The current pathname from Next.js usePathname()
 * @returns 'chat' | 'org' | ''
 */

type RouteType = 'chat' | 'org' | 'profile' | 'pro' | 'bot' | 'org'

export function getRouteType(pathname: string | null): RouteType {
	if (!pathname || pathname === '/') return 'pro'

	// ? Normalize the path by converting to lowercase and removing trailing slashes
	const normalizedPath = pathname.toLowerCase().replace(/\/+$/, '')

	// ? Check for chat routes (starting with /c but not being /career)
	if (
		normalizedPath.startsWith('/org') &&
		normalizedPath !== '/org/career' &&
		!normalizedPath.startsWith('/org/career/') &&
		normalizedPath !== '/org/content-creation' &&
		!normalizedPath.startsWith('/org/content-creation/')
	) {
		return 'org'
	}

	// ? Check for profile routes
	if (normalizedPath.startsWith('/u/')) {
		return 'profile'
	}

	// ? Check for bot routes (starting with /b)
	if (
		normalizedPath.startsWith('/b') &&
		normalizedPath !== '/biotech' &&
		!normalizedPath.startsWith('/biotech/')
	) {
		return 'bot'
	}

	// ? Check for pro routes
	const proRoutes = [/^\/$/, /^\/[^/]+\/[^/]+$/, /^\/[^/]+\/[^/]+\/[^/]+$/]
	if (proRoutes.some((route) => route.test(normalizedPath))) {
		return 'pro'
	}

	return 'pro'
}

export function getRouteColor(
	isActive: boolean,
	pathname: string | null,
): string {
	// return ''
	if (!isActive) return ''

	const routeType = getRouteType(pathname)

	switch (routeType) {
		// case 'personal':
		case 'pro':
		case 'chat':
			return 'text-black bg-gradient-to-b from-[rgba(190,23,232,0.1)] via-[rgba(187,6,232,0.5)] to-[rgba(190,23,232,0.5)] dark:text-white'
		case 'org':
			return 'text-black bg-gradient-to-b from-[rgba(131,229,106,0.1)] via-[rgba(131,229,106,0.5)] to-[rgba(131,229,106,0.5)] dark:text-white'
		default:
			return ''
	}
}

export const getAppLogoPath = ({
	theme,
}: {
	theme: string | undefined
}): string => {
	switch (theme) {
		case 'dark':
			return '/logos/mb-logo-landing-dark.webp'
		case 'light':
			return '/logos/mb-logo-landing-light.webp'
		default:
			return '/logos/mb-logo-landing-light.webp'
	}
}
