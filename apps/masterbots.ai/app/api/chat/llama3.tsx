import { StreamingTextResponse } from 'ai';
import { initializePerplexity, validateModel, createResponseStream } from '@/app/api/chat/actions/actions';
import { AIModels } from '@/app/api/chat/actions/models';

export const runtime = 'edge';

const perplexity = initializePerplexity(process.env.PERPLEXITY_API_KEY as string);

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { messages, model = AIModels.llama3_8b, previewToken } = json;

    if (previewToken) {
      perplexity.apiKey = previewToken;
    }

    validateModel(model);
    const response = await perplexity.chat.completions.create({
      model,
      messages,
      stream: true,
      max_tokens: 1000,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 1
    });

    const stream = createResponseStream('Perplexity', response, json, messages);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Failed to process request:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
