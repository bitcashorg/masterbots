import { getAllChatbots } from '@/services/hasura'

// ? Review performance: This can fetch over and over every time the botNames is called.
// ! Caching the value would be key for continuous usage.
// this helps displaying camelCase names in ui
export const botNames = (async () => {
  const chatbots = await getAllChatbots() // Adjust the limit as needed
  const bots = new Map<string, string>()
  for (const chatbot of chatbots) {
    bots.set(chatbot.name.toLowerCase(), chatbot.name)
  }
  return bots
})()
