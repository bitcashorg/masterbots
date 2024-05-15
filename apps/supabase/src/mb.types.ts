
import { Camelize } from 'camelize-ts';
import { Tables } from './supa.types';
import type * as AI from 'ai'

// TODO:  move this to packages/mb-types
export namespace MB {
  export type Message = Camelize<Tables<'message'>>
  export type Chatbot = Camelize<Tables<'chatbot'>>
  export type Category = Camelize<Tables<'category'>>
  export type Prompt = Camelize<Tables<'prompt'>>
  export type User = Camelize<Tables<'user'>>
  export type ChatbotWithPrompts = Chatbot & {prompts: Prompt[]}
  export type MessagePair = {
    question: AI.Message & { role : 'user' }
    answer: AI.Message & { role : 'assistant' }
  }
  export type Thread = Camelize<Tables<'thread'>>
  export type ThreadWithQuestion = Thread & {
      firstUserMessage: AI.Message
      firstAssistantMessage: AI.Message
      messageCount: number
  }
  export type ThreadFull = ThreadWithQuestion & {
    message: Pick<Message, 'id' | 'content' | 'createdAt'>
    chatbot: Pick<Chatbot, 'chatbotId' | 'name' | 'avatar'> & {
      categories: Category[]
      prompts: Prompt[]
    }
    user: Pick<User, 'userId' | 'username' |'avatar'>
  }
}
