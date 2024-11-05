'use server'

import { getPromptDetails, runWordWarePrompt } from '@/app/actions'
import { wordwareFlows } from '@/lib/constants/wordware-flows'
import type { aiTools } from '@/lib/helpers/ai-schemas'
import type { z } from 'zod'
import { subtractChatbotMetadataLabels } from './'

export async function getChatbotMetadataTool({
  chatbot,
  userContent
}: z.infer<typeof aiTools.chatbotMetadataExamples.parameters>) {
  const chatbotMetadata = await subtractChatbotMetadataLabels(
    {
      domain: chatbot.categoryId,
      chatbot: chatbot.chatbotId
    },
    userContent,
    // ? We will be using OpenAi for a while, at least for these tools
    'OpenAI'
  )

  console.log('chatbotMetadata ==> ', chatbotMetadata)

  return {
    chatbotMetadata
  }
}

export async function getWebSearchTool({
  query
}: z.infer<typeof aiTools.webSearch.parameters>) {
  console.info('Executing Web Search Tool... Query: ', query)
  const webSearchFlow = wordwareFlows.find(flow => flow.path === 'WebSearch')

  if (!webSearchFlow) {
    return null
  }

  const appData = await getPromptDetails(webSearchFlow.id)
  const response = await runWordWarePrompt({
    promptId: webSearchFlow.id,
    appVersion: appData.data.appVersion,
    inputs: {
      query
    }
  })

  if (response.error || !response.parsed || !response.fullResponse) {
    return null
  }

  const [searchResults, sources] = response.parsed.split(
    /\*\*Source:\*\*|\*\*Sources:\*\*|\*\*Source\*\*:|\*\*Sources\*\*:/
  )

  console.log('searchResults ==> ', searchResults)
  console.log('sources ==> ', sources)

  return {
    searchResults,
    // ? See: https://rapidapi.com/facundoPri/api/url-to-metadata/playground/apiendpoint_830f2c62-e40f-4b62-9fe0-a5dbc2bc07e6
    sources
  }
}
