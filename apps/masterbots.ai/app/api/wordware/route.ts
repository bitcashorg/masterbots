import {streamText} from 'ai';
import { wordwareModel } from '@/app/api/wordware/models/wordwareModel';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { promptId, inputs } = await req.json();
  const API_KEY = process.env.WORDWARE_API_KEY;

  if (!API_KEY) {
    return new Response('Wordware API key is not set', { status: 500 });
  }

  try {
    const result = await streamText({
      model: wordwareModel(API_KEY) as any,
      messages: [{ role: 'user', content: JSON.stringify({ promptId, inputs }) }],
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error in Wordware API route:', error);
    return new Response('Error processing your request', { status: 500 });
  }
}