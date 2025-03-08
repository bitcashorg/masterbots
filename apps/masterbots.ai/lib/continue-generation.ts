import { nanoid } from 'nanoid'
import type { AiClientType, ChatLoadingState } from '@/types/types'
import type { Message as AiMessage } from 'ai'
import type { Thread } from 'mb-genql'
import { saveNewMessage } from '@/services/hasura'
import type { Session } from 'next-auth'
import type { SetStateAction } from 'react'
import { appConfig } from 'mb-env'
import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import type { CustomSonnerProps } from './hooks/useSonner'

export type ContinueGenerationParams = {
  lastMessageContent: string
  threadId: string
  activeThread: Thread | null
  systemPrompts: AiMessage[]
  clientType: AiClientType | undefined
  session: Session | null
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  append: (message: any) => Promise<string | null | undefined>
  setMessages: (messages: SetStateAction<AiMessage[]>) => void
  setLoadingState: (state: ChatLoadingState | undefined) => void
  customSonner: (params: CustomSonnerProps) => string | number
}

/**
 * Utility function to continue an incomplete or errored AI generation
 */

export const continueGeneration = async ({
  lastMessageContent,
  threadId,
  activeThread,
  systemPrompts,
  clientType,
  session,
  append,
  setMessages,
  setLoadingState,
  customSonner,
}: ContinueGenerationParams) => {
  try {
    setLoadingState('generating')

    //? Create a system prompt indicating this is a continuation
    const continuationPrompt: AiMessage = {
      id: 'continuation-' + nanoid(10),
      role: 'system',
      content: `The previous response was cut off. Continue the response from where it left off. Do not repeat any information. The last part of the response was: "${lastMessageContent}"`,
    }

    //? Prepare continuation messages with the system context
    const continuationMessages = [...systemPrompts, continuationPrompt]
    setMessages(continuationMessages)

    //? Call the AI model to continue generation
    const continuationResponse = await append({
      role: 'user',
      content: 'Please continue from where you left off.',
    })

    //? If continuation is successful, update the last message in the database
    if (continuationResponse && activeThread) {
      try {
        //? Find the last assistant message
        const lastAssistantMessage = activeThread.messages
          .filter((m) => m.role === 'assistant')
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

        if (lastAssistantMessage && session?.user?.hasuraJwt) {
          //? First, see if there's existing content to append to
          const existingContent = lastAssistantMessage.content || ''
          const continuedContent = cleanPrompt(continuationResponse)

          //? Create a new message instead of trying to update the existing one
          await saveNewMessage({
            content: existingContent + ' ' + continuedContent,
            threadId: threadId,
            role: 'assistant',
            jwt: session.user.hasuraJwt,
            createdAt: new Date().toISOString(),
          })

          if (appConfig.features.devMode) {
            customSonner({
              type: 'success',
              text: 'Successfully added continuation message.',
            })
          }
        }
      } catch (error) {
        console.error('Error updating message with continuation:', error)
        customSonner({
          type: 'error',
          text: 'Error saving continuation, but response was generated.',
        })
      }
    }

    setLoadingState('finished')
    return continuationResponse
  } catch (error) {
    console.error('Error continuing generation: ', error)
    customSonner({
      type: 'error',
      text: 'Failed to continue the Masterbot message. Please try again.',
    })
    setLoadingState(undefined)
    return null
  }
}
