'use server'

import { wordwareFlows } from '@/lib/constants/wordware-flows'
import type { aiTools } from '@/lib/helpers/ai-schemas'
import type { WordWareDescribeDAtaResponse } from '@/types/wordware-flows.types'
import axios from 'axios'
import type { z } from 'zod'
import { getChatbotMetadataLabels } from '.'

const { WORDWARE_API_KEY } = process.env

// TODO: Finish ICL implementation. ICL should be called as a tool that Ai will use to generate content.
export async function getChatbotMetadataTool({
  chatbot,
  userContent,
}: z.infer<typeof aiTools.chatbotMetadataExamples.parameters>) {
  console.info('Executing Chatbot Metadata Tool... Chatbot: ', {
    chatbot,
    userContent,
  })

  try {
    const chatbotMetadata = await getChatbotMetadataLabels(
      {
        domain: chatbot.domainId,
        category: chatbot.categoryId,
        chatbot: chatbot.chatbotId,
      },
      userContent,
      // ? We will be using OpenAi for a while, at least for these tools
      'OpenAI',
    )

    console.log('chatbotMetadata ==> ', chatbotMetadata)
    return JSON.stringify({
      chatbotMetadata,
    })
  } catch (error) {
    console.error('Error fetching chatbot metadata: ', error)
    return JSON.stringify({
      error: 'Internal Server Error while fetching chatbot metadata',
    })
  }
}

export async function getWebSearchTool({ query }: z.infer<typeof aiTools.webSearch.parameters>) {
  console.info('Executing Web Search Tool... Query: ', query)
  const webSearchFlow = wordwareFlows.find((flow) => flow.path === 'webSearch')

  if (!webSearchFlow) {
    throw new Error('Web Search tool is not available')
  }

  try {
    const appDataResponse = await axios.get(
      `https://api.wordware.ai/v1alpha/apps/masterbots/${webSearchFlow.id}`,
      {
        headers: {
          Authorization: `Bearer ${WORDWARE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    )

    if (appDataResponse.status >= 400) {
      console.error('Error fetching app data: ', appDataResponse)
      if (appDataResponse.status >= 500) {
        throw new Error('Internal Server Error while fetching app data. Please try again later.')
      }
      throw new Error('Failed to authenticate for the app. Please try again.')
    }

    const appData: WordWareDescribeDAtaResponse = await appDataResponse.data

    console.log('appData ==> ', appData)

    const runAppResponse = await fetch(
      `https://api.wordware.ai/v1alpha/apps/masterbots/${webSearchFlow.id}/${appData.version}/runs/wait`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WORDWARE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: {
            query,
          },
        }),
      },
    )

    if (runAppResponse.status >= 400 || !runAppResponse.ok || !runAppResponse.body) {
      console.error('Error running app: ', runAppResponse)
      if (runAppResponse.status >= 500) {
        throw new Error('Internal Server Error while fetching app data. Please try again later.')
      }
      throw new Error('Failed to authenticate for the app. Please try again.')
    }

    const response = await runAppResponse.json()
    // ! error TS1501: This regular expression flag is only available when targeting 'es2018' or later.
    // const jsonRegex = /data:\s*({.*?})(?=\s*data:|\s*event:|$)/gs
    // ? Changing target not working.
    // TODO: Check typescript config...
    const jsonRegex = /data:\s*({.*?})(?=\s*data:|\s*event:|$)/g

    console.log('[SERVER] Web Search Response web search status --> ', response.status)
    console.log(
      '[SERVER] Web Search Response web search outputs --> ',
      response.outputs['web search'],
    )

    if (response.status !== 'COMPLETE') {
      throw new Error('Web Search could not be completed.')
    }

    if (!response.outputs['web search']?.output && !response.outputs['web search']?.logs) {
      throw new Error('No output given. Web search could not be completed')
    }

    return `## INPUT:
    
    ${response.outputs['web search']?.output ?? response.outputs['web search']?.logs}`
  } catch (error) {
    return `Something went wrong with web search that failed to provide results. Please try again later.
    
    [ERROR LOG]: ${JSON.stringify(error, null, 2)}`
  }
}
