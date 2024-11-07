'server only'

import { parseWordwareResponse } from '@/components/shared/wordware-chat'
import { wordwareFlows } from '@/lib/constants/wordware-flows'
import type { aiTools } from '@/lib/helpers/ai-schemas'
import { validateAndSanitizeJson } from '@/lib/helpers/ai-streams'
import { WordWareDescribeDAtaResponse } from '@/types/wordware-flows.types'
import axios from 'axios'
import type { z } from 'zod'
import { subtractChatbotMetadataLabels } from '.'

const { WORDWARE_API_KEY } = process.env

export async function getChatbotMetadataTool({
  chatbot,
  userContent
}: z.infer<typeof aiTools.chatbotMetadataExamples.parameters>) {
  console.info('Executing Chatbot Metadata Tool... Chatbot: ', {
    chatbot,
    userContent
  })

  try {
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
    return JSON.stringify({
      chatbotMetadata
    })
  } catch (error) {
    console.error('Error fetching chatbot metadata: ', error)
    return JSON.stringify({
      error: 'Internal Server Error while fetching chatbot metadata'
    })
  }
}

export async function getWebSearchTool({
  query
}: z.infer<typeof aiTools.webSearch.parameters>) {
  console.info('Executing Web Search Tool... Query: ', query)
  const webSearchFlow = wordwareFlows.find(flow => flow.path === 'webSearch')

  if (!webSearchFlow) {
    return JSON.stringify({
      error: 'Web Search tool is not available'
    })
  }

  try {
    const appDataResponse = await axios.get(
      `https://api.wordware.ai/v1alpha/apps/masterbots/${webSearchFlow.id}`,
      {
        headers: {
          Authorization: `Bearer ${WORDWARE_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    if (appDataResponse.status >= 400) {
      console.error('Error fetching app data: ', appDataResponse)
      if (appDataResponse.status >= 500) {
        return JSON.stringify({
          error:
            'Internal Server Error while fetching app data. Please try again later.'
        })
      }
      return JSON.stringify({
        error: 'Failed to authenticate for the app. Please try again.'
      })
    }

    const appData: WordWareDescribeDAtaResponse = await appDataResponse.data

    console.log('appData ==> ', appData)

    const runAppResponse = await fetch(
      `https://api.wordware.ai/v1alpha/apps/masterbots/${webSearchFlow.id}/${appData.version}/runs/stream`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WORDWARE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: {
            query
          }
        })
      }
    )

    if (
      runAppResponse.status >= 400 ||
      !runAppResponse.ok ||
      !runAppResponse.body
    ) {
      console.error('Error running app: ', runAppResponse)
      if (appDataResponse.status >= 500) {
        return JSON.stringify({
          error:
            'Internal Server Error while fetching app data. Please try again later.'
        })
      }
      return JSON.stringify({
        error: 'Failed to authenticate for the app. Please try again.'
      })
    }

    const reader = runAppResponse.body.getReader()
    const decoder = new TextDecoder()
    const jsonRegex =
      /data:\s*\{(?:[^{}]|(?:\{(?:[^{}]|(?:\{[^{}]*\}))*\}))*\}/g

    let buffer = ''
    let results = ''

    try {
      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })

        // console.log('Buffer: [Before Changes] => ', buffer)

        let match
        let lastIndex = 0
        while ((match = jsonRegex.exec(buffer)) !== null) {
          const jsonStr = match[0].replace(/^data:\s*/, '')
          const validatedJson = validateAndSanitizeJson(jsonStr)
          if (validatedJson) {
            const jsonData = JSON.parse(validatedJson)
            console.log('jsonData [TRY] ==> ', jsonData)
            if (jsonData.path === webSearchFlow.path) {
              console.log('jsonData [CAUGHT] ==> ', jsonData)

              results += jsonData.content
            }
          }
          lastIndex = jsonRegex.lastIndex
        }

        //* Keeping the unmatched part in the buffer
        buffer = buffer.slice(lastIndex)

        //? Buffer is getting too large warning
        if (buffer.length > 10000) {
          console.warn('Buffer overflow, clearing unmatched data')
          buffer = ''
        }

        await new Promise(resolve => setTimeout(resolve, 10))
      }

      //* Process any remaining data in the buffer
      if (buffer.length > 0) {
        const validatedJson = validateAndSanitizeJson(buffer)
        if (validatedJson) {
          const jsonData = JSON.parse(validatedJson)

          if (jsonData.path === webSearchFlow.path) {
            console.log('jsonData ==> ', jsonData)

            results += jsonData.content
          }
        }
      }
    } catch (error) {
      console.error('Error reading stream: ', error)
    } finally {
      reader.releaseLock()
    }

    const [searchResults, sources] = results.split(
      /\*\*Source:\*\*|\*\*Sources:\*\*|\*\*Source\*\*:|\*\*Sources\*\*:/
    )
    console.log('searchResults ==> ', searchResults)
    console.log('sources ==> ', sources)

    return JSON.stringify({
      searchResults,
      // ? See: https://rapidapi.com/facundoPri/api/url-to-metadata/playground/apiendpoint_830f2c62-e40f-4b62-9fe0-a5dbc2bc07e6
      sources,
      error: null
    })
  } catch (error) {
    console.error('Error fetching app data: ', error)
    return 'Internal Server Error while fetching app data'
  }
}

export async function getPromptDetails(promptId: string) {
  let data = null
  let error = null
  let inputs = {}

  try {
    if (!promptId) {
      throw new Error('Prompt ID is required')
    }

    const response = await fetch(`/api/wordware/describe?promptId=${promptId}`)
    data = await response.json()
    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch prompt details')
    }
    inputs = data.inputs.reduce(
      (acc: any, input: { label: any }) => ({
        ...acc,
        [input.label]: ''
      }),
      {}
    )
  } catch (error) {
    console.error('Error fetching prompt details:', error)
    error = (error as Error).message
  } finally {
    return { data, error, inputs }
  }
}

export async function runWordWarePrompt({
  promptId,
  inputs,
  appVersion
}: {
  promptId: string
  appVersion: string
  inputs: Record<string, any>
}) {
  let fullResponse = ''
  let error = null

  try {
    const response = await fetch('/api/wordware/run', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ promptId, inputs })
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const reader = response.body?.getReader()
    if (!reader) {
      throw new Error('No reader available')
    }

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const chunk = new TextDecoder().decode(value)
      fullResponse += chunk
    }

    const parsed = parseWordwareResponse(fullResponse)
    return { fullResponse, parsed, error }
  } catch (err) {
    console.error('Error running prompt:', err)
    error = (err as Error).message
    return { fullResponse, parsed: null, error }
  }
}
