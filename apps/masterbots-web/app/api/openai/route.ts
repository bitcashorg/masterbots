import { OpenAIStream, StreamingTextResponse } from 'ai';
import { serverEnv } from 'masterbots-lib/constants';
import {
  ChatCompletionRequestMessage,
  Configuration,
  CreateChatCompletionRequest,
  OpenAIApi
} from 'openai-edge';
// import { OpenAI } from 'openai'

const config = new Configuration({
  apiKey: serverEnv.openai.secret
});
const openai = new OpenAIApi(config);
// const openai = new OpenAI({ apiKey: serverEnv.openai.secret });

export const runtime = 'edge';

export async function POST(req: Request) {
  const { prompt } = await req.json();
  const messages: ChatCompletionRequestMessage[] = [{
    role: 'user',
    content: prompt,
  }]

  const openAiChatCompletionProps: CreateChatCompletionRequest = {
    model: 'gpt-3.5-turbo-16k-0613',
    messages,
    stream: true,
  };

  const response = await openai.createChatCompletion(openAiChatCompletionProps);

  const stream = OpenAIStream(response, {
    async onStart() {
      console.log('Start OpenAi::saving prompt to database...');
    },
    async onToken(token) {
      console.log('Token::saving token to database...', token);
    },
    async onCompletion(completion) {
      console.log('Completion::saving on completion to database...', completion);
    },
    async onFinal(completion) {
      console.log('Final OpenAi::saving on final to database...', completion);
    }
  });

  return new StreamingTextResponse(stream);
}
