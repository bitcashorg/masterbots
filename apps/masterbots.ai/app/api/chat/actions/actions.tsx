import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { AiClientType, JSONResponseStream } from '@/lib/types';
import { ChatCompletionMessageParam } from 'openai/resources';
import { convertToCoreMessages, setStreamerPayload } from '@/lib/ai-helpers';
import { createAnthropic } from '@ai-sdk/anthropic';

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});

const anthropic = createAnthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

//* Perplexity API uses openai-sdk with compatible mode and a different base URL
export async function initializePerplexity(apiKey: string) {
  if (!apiKey) {
    throw new Error('PERPLEXITY_API_KEY is not defined in environment variables');
  }
  return createOpenAI({
    apiKey,
    baseURL: 'https://api.perplexity.ai',
    compatibility: 'compatible',
  });
}

//* Create a response stream based on the client model type
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
        const anthropicModel = anthropic(model, { cacheControl: true });
        const coreMessages = convertToCoreMessages(messages as ChatCompletionMessageParam[]);
        const response = await streamText({
          model: anthropicModel,
          messages: coreMessages,
          temperature: 0.7,
          maxTokens: 300,
        });
        return response.toDataStreamResponse();
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
