import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import type { Message as AIMessage } from 'ai/react'
import { type ClassValue, clsx } from 'clsx'
import type { Message, SocialFollowing } from 'mb-genql'
import { customAlphabet } from 'nanoid'
import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
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
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function delayFetch(ms = 200) {
  return new Promise(resolve => {
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
    year: 'numeric'
  })
}

export function extractBetweenMarkers(
  str: string,
  startMarker: string,
  endMarker?: string // endMarker is now optional
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
      const chatGptMessages = []
      for (let j = i + 1; j < messages.length; j++) {
        const chatGptMessage = findNextAssistantMessage(messages, j)
        if (!chatGptMessage) {
          break
        } else {
          chatGptMessages.push(chatGptMessage)
          continue
        }
      }
      messagePairs.push({
        userMessage,
        chatGptMessage: chatGptMessages
      })
    }
  }

  return messagePairs
}

const findNextAssistantMessage = (
  messages: Message[] | AIMessage[],
  startIndex: number
) => {
  if (messages[startIndex]?.role === 'assistant') {
    return {
      ...messages[startIndex],
      content: cleanPrompt(messages[startIndex].content)
    }
  }
  return null
}

export const readingTime = (messages: { content: string }[]) => {
  let contentGroup: any = []

  for (var i = 0; i <= messages?.length; i++) {
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
  t /= d / 2
  if (t < 1) return (c / 2) * t * t + b
  t--
  return (-c / 2) * (t * (t - 2) - 1) + b
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
      duration
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
  return new Promise(resolve => setTimeout(resolve, time))
}

export const plans = [
  {
    id: 'monthly',
    duration: 'monthly',
    price: 4.5,
    features_title: 'Everything from <strong>Free</strong> plan plus:',
    features: ['Access to our Professional tools']
  },
  {
    id: 'yearly',
    duration: 'yearly',
    price: 3.99,
    features_title: 'Everything from <strong>Monthly</strong> plan plus: ',
    features: [
      '11% of discount every month.',
      'Access to pre-release content to chat with.'
    ]
  }
]

export function getDate(timestamp: number) {
  let date
  if (timestamp === 0) {
    date = new Date()
  } else {
    date = new Date(timestamp * 1000)
  }
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric'
  }
  const dateString = date.toLocaleString('en-US', options)

  return dateString
}

export function getCurrentOrTargetDate() {
  const today = new Date()
  return today.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric'
  })
}

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
// * List of predefined unique phrases to detect in text
export const UNIQUE_PHRASES = [
  'Unique, lesser-known',
  'Unique insight',
  'Unique Tip',
  'Unique, lesser-known solution',
  'Unique Solution',
  'Unique, lesser-known option',
  'Unique Insight: Lesser-Known Solution',
  'Unique Recommendation',
  'Lesser-Known Gem',
  'For a UNIQUE, LESSER-KNOWN phrase',
  'Unique, Lesser-Known Destination'
] as const

export interface ParsedText {
  clickableText: string
  restText: string
}

// * Converts ReactNode content to string for processing
export function extractTextFromReactNode(node: ReactNode): string {
  if (typeof node === 'string') return node
  if (typeof node === 'number') return node.toString()
  if (Array.isArray(node)) return node.map(extractTextFromReactNode).join('')
  if (typeof node === 'object' && node !== null && 'props' in node) {
    return extractTextFromReactNode(node.props.children)
  }
  return ''
}

// * Creates a regex pattern for unique phrases
export function createUniquePattern(): RegExp {
  return new RegExp(`(?:${UNIQUE_PHRASES.join('|')}):\\s*([^.:]+[.])`, 'i')
}

// * Pattern for general text parsing
export const GENERAL_PATTERN = /(.*?)([:.,])(?:\s|$)/g

// * Parses text to extract clickable and remaining portions
export function parseClickableText(fullText: string): ParsedText {
  const uniquePattern = createUniquePattern()
  const uniqueMatch = fullText.match(uniquePattern)

  // Check for unique phrase match first
  if (uniqueMatch) {
    const clickableText = uniqueMatch[1]
    const restText = fullText.slice(
      fullText.indexOf(clickableText) + clickableText.length
    )
    return { clickableText, restText }
  }

  // * Fall back to general pattern
  const generalMatch = fullText.match(GENERAL_PATTERN)
  if (generalMatch) {
    return {
      clickableText: generalMatch[0],
      restText: fullText.slice(generalMatch[0].length)
    }
  }
  return {
    clickableText: '',
    restText: fullText
  }
}

export function cleanClickableText(text: string): string {
  return text.replace(/(:|\.|\,)\s*$/, '')
}


 export const formatNumber = (num: number) => {
  const lookup = [
    { value: 1e9, symbol: 'B' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'K' }
  ];

  // Handle negative numbers
  const isNegative = num < 0;
  const absNum = Math.abs(num);

  // Find the appropriate suffix
  const item = lookup.find(item => absNum >= item.value);

  if (!item) {
    // If number is smaller than 1000, return as is
    return isNegative ? `-${absNum}` : absNum.toString();
  }

  // Calculate the formatted value with one decimal place
  const formattedValue = (absNum / item.value).toFixed(1);
  
  // Remove .0 if it exists
  const cleanValue = formattedValue.replace('.0', '');
  
  return `${isNegative ? '-' : ''}${cleanValue}${item.symbol}`;
};

interface IProps {
  followers: readonly SocialFollowing[] | undefined | null;
  userId: string;
}
export const isFollowed = ({followers, userId} : IProps): boolean => {
  return Boolean(followers?.some(follower => follower.followerId === userId));
}