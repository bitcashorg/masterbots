import type { PromptProps } from '@/types/types'
import type { Message } from 'ai'

export function formatSystemPrompts(prompts: PromptProps[]): Message[] {
  return (
    prompts?.map(({ prompt }) => ({
      id: prompt.promptId.toString(),
      role: 'system',
      content: prompt.content,
      createdAt: new Date()
    })) || []
  )
}

export function getHostnameAndProtocol() {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const protocol = isDevelopment ? 'http' : 'https'
  const hostname = isDevelopment ? 'localhost:3000' : process.env.VERCEL_URL
  const url = new URL('/', `${protocol}://${hostname}`)

  return url.href
}
