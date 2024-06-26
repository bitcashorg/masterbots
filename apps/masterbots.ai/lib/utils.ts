import { type Message as AIMessage } from 'ai/react'
import { Message } from 'mb-genql'
import { clsx, type ClassValue } from 'clsx'
import { customAlphabet } from 'nanoid'
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
  let endIndex = endMarker
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
      let chatGptMessages = []
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

// From chat-message.tsx
export function cleanPrompt(str: string) {
  const marker = '].  Then answer this question:'
  const index = str.indexOf(marker)
  let extracted = ''

  if (index !== -1) {
    extracted = str.substring(index + marker.length)
  }
  // console.log('cleanPrompt', str, extracted, index)
  return extracted || str
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




// Function to convert a name into a slug
export const toSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/&/g, 'n')
    .replace(/\s+/g, '_')
}

export interface Plan {
  id: string
  duration: string
  price: number
  features: string[],
  features_title: string
}

export const plans = [
  {
    id: 'monthly',
    duration: 'monthly',
    price: 4.50,
    features_title: 'Everything from <strong>Free</strong> plan plus:',
    features: [
      'Access to our Professional tools'
    ]
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
