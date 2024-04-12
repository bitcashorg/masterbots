import { useGlobalStore } from './use-global-store'

export function useChatbot(slug: string) {
  const { chatbots } = useGlobalStore()
  const chatbot = chatbots.find(c => c.name.toLocaleLowerCase() === slug)

  const initialMessages = chatbot?.prompts?.map(({ prompt }) => ({
    id: prompt.promptId.toString(),
    role: 'system' as const,
    content: prompt.content,
    createdAt: new Date()
  }))

  return {
    chatbot,
    initialMessages
  }
}
