import { AIModels } from '@/app/api/chat/models/models';
import { AiClientType } from '@/lib/types';
import { MessageParam } from '@anthropic-ai/sdk/resources';
import {generateId, CoreMessage} from 'ai'; //* Replacing nanoid with generateId
import { ChatCompletionMessageParam } from 'openai/resources';

export function getModelClientType(model: AIModels) {
  switch (model) {
    case AIModels.GPT4:
    case AIModels.Default:
      return 'OpenAI';
    case AIModels.Claude3:
      return 'Anthropic';
    case AIModels.llama3_7b:
    case AIModels.llama3_8b:
      return 'Perplexity';
    case AIModels.WordWare:
      return 'WordWare';
    default:
      throw new Error('Unsupported model specified');
  }
}

//* Generate a payload for a new thread
export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any
) {
  const title = messages[0]?.content.substring(0, 100);
  const id = json.id ?? generateId();
  const createdAt = Date.now();
  const path = `/c/${id}`;
  return {
    id,
    title,
    userId: 1,
    createdAt,
    path,
    messages: [
      ...messages,
      {
        content: completion,
        role: 'assistant'
      }
    ]
  };
}

//* Manipulates payloads to match format of the streamText function
export function setStreamerPayload(
  model: AiClientType,
  payload: ChatCompletionMessageParam[] | MessageParam[]
): ChatCompletionMessageParam[] | MessageParam[] {
  switch (model) {
    case 'WordWare':
      return payload;
    case 'Anthropic':
      return payload.map(
        (message, index) =>
          ({
            role: !index
              ? message.role.replace('system', 'user')
              : message.role.replace('system', 'assistant'),
            content: message.content
          }) as MessageParam
      );
    case 'OpenAI':
    case 'Perplexity':
    default:
      return payload;
  }
}

//* Convert an array of messages into the CoreMessage format
export function convertToCoreMessages(messages: ChatCompletionMessageParam[]): CoreMessage[] {
  return messages.map(msg => 
    msg.role.match(/(user|system|assistant)/)
      ? { role: msg.role as 'user' | 'system' | 'assistant', content: msg.content as string }
      : (() => { throw new Error(`Unsupported message role: ${msg.role}`) })()
  )
}