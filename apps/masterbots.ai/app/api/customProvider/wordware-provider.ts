import { loadApiKey, withoutTrailingSlash } from '@ai-sdk/provider-utils'
import { WordwareChatLanguageModel } from './wordware-chat-language-model'
import {
  WordwareChatModelId,
  WordwareChatSettings
} from './wordware-chat-settings'

export interface WordwareProvider {
  (
    modelId: WordwareChatModelId,
    settings?: WordwareChatSettings
  ): WordwareChatLanguageModel

  chat(
    modelId: WordwareChatModelId,
    settings?: WordwareChatSettings
  ): WordwareChatLanguageModel
}

export interface WordwareProviderSettings {
  baseURL?: string
  apiKey?: string
  headers?: Record<string, string>
}

export function createWordware(
  options: WordwareProviderSettings = {}
): WordwareProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL) ?? 'https://api.wordware.ai/v1'

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'WORDWARE_API_KEY',
      description: 'Wordware'
    })}`,
    ...options.headers
  })

  const createChatModel = (
    modelId: WordwareChatModelId,
    settings: WordwareChatSettings = {}
  ) =>
    new WordwareChatLanguageModel(modelId, settings, {
      provider: 'wordware.chat',
      baseURL,
      headers: getHeaders
    })

  const provider = function (
    modelId: WordwareChatModelId,
    settings?: WordwareChatSettings
  ) {
    if (new.target) {
      throw new Error(
        'The Wordware model function cannot be called with the new keyword.'
      )
    }

    return createChatModel(modelId, settings)
  }

  provider.chat = createChatModel

  return provider as WordwareProvider
}

export const wordware = createWordware()
