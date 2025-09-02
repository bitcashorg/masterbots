import type { PromptProps } from '@/types'
import type { Message } from 'ai'
import { nanoid } from 'nanoid'

export function formatSystemPrompts(prompts: PromptProps[]): Message[] {
	return (
		prompts
			?.sort((a, b) => (a.prompt.type === 'prompt' ? -1 : 1))
			.map(({ prompt }) => {
				const contentTag = (content: string) => {
					const tag =
						prompt.type === 'instruction' ? 'instructions' : 'expertise'
					return `
<${tag}>
${content}
</${tag}>
`
				}

				return {
					id: `expertise-${nanoid(10)}`,
					role: 'system',
					content: contentTag(prompt.content),
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
