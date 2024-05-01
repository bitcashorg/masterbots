'use server';

import OpenAI from 'openai';
import Anthropic from '@anthropic-ai/sdk';
import { OpenAIStream, AnthropicStream } from 'ai';
import { AIModels } from './models';
import { nanoid } from '@/lib/utils';

export function initializeOpenAI(apiKey: string): OpenAI {
  return new OpenAI({ apiKey });
}

export function initializeAnthropic(apiKey: string): Anthropic {
  return new Anthropic({ apiKey });
}

export function initializePerplexity(apiKey: string): OpenAI {
  return new OpenAI({
    apiKey,
    baseURL: 'https://api.perplexity.ai'
  });
}

export function validateModel(model: AIModels) {
  if (!Object.values(AIModels).includes(model)) {
    throw new Error('Unsupported model specified');
  }
}

export function createResponseStream(
  clientType: 'OpenAI' | 'Anthropic' | 'Perplexity',
  response: any,
  json: any,
  messages: any[]
) {
  switch (clientType) {
    case 'OpenAI':
      return OpenAIStream(response, {
        async onCompletion(completion: any) {
          const payload = createPayload(json, messages, completion);
          // Implement what to do with the payload, e.g., logging or database storage
        }
      });
    case 'Anthropic':
      return AnthropicStream(response);
    case 'Perplexity':
      return OpenAIStream(response); // Assuming similar streaming response handling as OpenAI
    default:
      throw new Error('Unsupported client model type');
  }
}

export function createPayload(
  json: { id: string },
  messages: { content: string }[],
  completion: any
) {
  const title = messages[0]?.content.substring(0, 100);
  const id = json.id ?? nanoid();
  const createdAt = Date.now();
  const path = `/chat/${id}`;
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
