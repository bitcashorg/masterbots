import { Category, Chatbot, Thread, createMbClient, everything } from 'mb-genql'

const client = createMbClient({
  adminSecret: process.env.HASURA_ADMIN_SECRET,
  debug: process.env.DEBUG === 'true',
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
      chatbot: everything,
      messages: {
        ...everything,
        __args: {
          orderBy: [{ createdAt: 'DESC' }],
          where: { role: { _eq: 'user' } }
        }
      },
      ...everything,
      __args: {
        orderBy: [{ createdAt: 'DESC' }],
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
      chatbot: {
        ...everything,
        prompts: {
          prompt: everything
        }
      },
      messages: {
        ...everything,
        __args: {
          orderBy: [{ createdAt: 'ASC' }]
        }
      },
      ...everything,
      __args: {
        where: { threadId: { _eq: threadId } }
      }
    }
  })

  return thread[0] as Thread
}
