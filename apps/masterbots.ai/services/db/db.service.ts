import { Category, Chatbot, Thread, createMbClient, everything } from 'mb-genql'

const client = createMbClient({
  // TODO: implement auth and remove this admin secret
  adminSecret: 'lfg', //'7916dce3ec9736725aa46ee1f99b8bb8',
  debug: process.env.DEBUG === 'true',
  env: 'local'
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

export async function getThread({ threadId }: { threadId: string }) {
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

export async function saveNewMessage(object: {
  content: string
  role: 'user' | 'assistant'
  threadId: string
}) {
  const response = await client.mutation({
    insertMessageOne: {
      __args: {
        object
      },
      ...everything
    }
  })
}

export async function upsertUser(object: {
  email: string
  profilePicture: string
  username: string
}) {
  client.mutation({
    insertUserOne: {
      __args: {
        object,
        onConflict: {
          constraint: 'user_email_key',
          updateColumns: ['profilePicture']
        }
      },
      email: true,
      profilePicture: true
    }
  })
}

export async function createThread({
  chatbotId,
  threadId
}: {
  chatbotId: number
  threadId: string
}) {
  console.log('createThread', {
    chatbotId,
    threadId
  })
  const { insertThreadOne } = await client.mutation({
    insertThreadOne: {
      __args: {
        object: { threadId, chatbotId, userId: 1 }
      },
      threadId: true
    }
  })
  console.log('RESULT', insertThreadOne)
  return insertThreadOne?.threadId
}

export async function getChatbot({
  chatbotId,
  chatbotName
}: {
  chatbotId?: number
  chatbotName?: string
}) {
  if (!chatbotId && !chatbotName)
    throw new Error('You need to pass chatbotId or chatbotName')

  const { chatbot } = await client.query({
    chatbot: {
      __args: {
        where: { name: { _eq: chatbotName } }
      },
      ...everything,
      prompts: {
        prompt: everything
      }
    }
  })

  return chatbot[0] as Chatbot
}
