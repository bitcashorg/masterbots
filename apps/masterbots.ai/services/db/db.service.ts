import {
  Category,
  Chatbot,
  Message,
  Thread,
  createMbClient,
  everything
} from 'mb-genql'

const client = createMbClient({
  adminSecret: process.env.HASURA_ADMIN_SECRET,
  env: 'test'
})

export async function getCategories() {
  const { category } = await client.query({
    category: everything
  })

  return category as Category[]
}

export async function getChatbots() {
  const { chatbot } = await client.query({
    chatbot: everything
  })

  return chatbot as Chatbot[]
}

export async function getThreads({
  chatbotName
}: { chatbotName?: string } = {}) {
  const { thread } = await client.query({
    thread: {
      messages: everything,
      ...everything,
      __args: {
        limit: 30,
        ...(chatbotName
          ? {
              where: { chatbot: { name: { _eq: chatbotName } } }
            }
          : {})
      }
    }
  })

  return thread as Thread[]
}

export async function getThread({ threadId }: { threadId: number }) {
  const { thread } = await client.query({
    thread: {
      messages: everything,
      ...everything,
      __args: {
        where: { threadId: { _eq: threadId } }
      }
    }
  })

  return thread[0] as Thread
}
