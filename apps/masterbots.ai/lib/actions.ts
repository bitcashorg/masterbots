import type { PromptProps } from '@/types/types'
import type { Message } from 'ai'
import { nanoid } from 'nanoid'

export function formatSystemPrompts(prompts: PromptProps[]): Message[] {
  return (
    prompts?.map(({ prompt }) => {
      const tag = (content: string) =>
        prompt.promptId === 1
          ? `<instructions>
      ${content}
      </instructions>
      `
          : `<expertise>
      ${content}
      </expertise>
      `
      return {
        id: 'expertise-' + nanoid(10),
        role: 'system',
        // role: 'user',
        content: tag(prompt.content),
        createdAt: new Date(),
      }
    }) || []
  )
}

export function getHostnameAndProtocol() {
  const isDevelopment = process.env.NODE_ENV === 'development'
  const protocol = isDevelopment ? 'http' : 'https'
  const hostname = isDevelopment ? 'localhost:3000' : process.env.VERCEL_URL
  const url = new URL('/', `${protocol}://${hostname}`)

  return url.href
}
