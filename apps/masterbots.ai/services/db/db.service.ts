import { Category, Chatbot, createMbClient, everything } from 'mb-genql'

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
