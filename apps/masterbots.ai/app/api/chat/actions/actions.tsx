import { streamText, CoreMessage } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { AiClientType, JSONResponseStream } from '@/lib/types';
import Anthropic from '@anthropic-ai/sdk';
import { MessageParam } from '@anthropic-ai/sdk/resources';
import { ChatCompletionMessageParam } from 'openai/resources';
import { setStreamerPayload } from '@/lib/ai-helpers';

// Initialize OpenAI provider
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict', // Using strict mode for OpenAI API
});

export async function initializeAnthropic(apiKey: string) {
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY is not defined in environment variables');
  }
  return new Anthropic({ apiKey });
}

export async function initializePerplexity(apiKey: string) {
  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY is not defined in environment variables');
  }
  return createOpenAI({
    apiKey,
    baseURL: 'https://api.perplexity.ai',
    compatibility: 'compatible', // Using compatible mode for third-party provider
  });
}

function convertToCoreMessages(messages: ChatCompletionMessageParam[]): CoreMessage[] {
  return messages.map(msg => {
    switch (msg.role) {
      case 'system':
        return { role: 'system', content: msg.content as string };
      case 'user':
        return { role: 'user', content: msg.content as string };
      case 'assistant':
        return { role: 'assistant', content: msg.content as string };
      default:
        throw new Error(`Unsupported message role: ${msg.role}`);
    }
  });
}

export async function createResponseStream(
  clientType: AiClientType,
  json: JSONResponseStream,
  req?: Request
) {
  const { model, messages: rawMessages, previewToken } = json;
  const messages = setStreamerPayload(clientType, rawMessages);

  try {
    switch (clientType) {
      case 'OpenAI': {
        const openaiModel = openai(model);
        const coreMessages = convertToCoreMessages(messages as ChatCompletionMessageParam[]);
        const response = await streamText({
          model: openaiModel,
          messages: coreMessages,
          temperature: 0.7,
        });
        return response.toDataStreamResponse();
      }
      case 'Anthropic': {
        const anthropic = await initializeAnthropic(previewToken || process.env.ANTHROPIC_API_KEY as string);
        // Note: We need to implement Anthropic streaming using the AI SDK
        // This is a placeholder and needs to be updated
        const response = await anthropic.messages.create({
          model,
          messages: messages as MessageParam[],
          stream: true,
          max_tokens: 300
        });
        // This is a placeholder and needs to be properly implemented
        return new Response(response as any);
      }
      case 'Perplexity': {
        const perplexity = await initializePerplexity(previewToken || process.env.PERPLEXITY_API_KEY as string);
        const perplexityModel = perplexity(model);
        const coreMessages = convertToCoreMessages(messages as ChatCompletionMessageParam[]);
        const response = await streamText({
          model: perplexityModel,
          messages: coreMessages,
          temperature: 0.5,
          maxTokens: 1000,
          topP: 1,
          frequencyPenalty: 1,
        });
        return response.toDataStreamResponse();
      }
      default: {
        throw new Error('Unsupported client model type');
      }
    }
  } catch (error) {
    console.error('Error in createResponseStream:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
