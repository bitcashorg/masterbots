import { createResponseStream } from '@/app/api/chat/actions/actions';
import { getModelClientType } from '@/lib/ai';
import OpenAI from 'openai';

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken, model } = json

  // TODO: Check this (user session). Users should have their session up to 30-days.
  // const userId = (await auth())?.user.id

  // if (!userId) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   })
  // }

  const clientModel = getModelClientType(model)

  // ? this condition is for test only. When moving to Ai SDK 3.1, 
  // ? It will be all together in the createResponseStream function
  return createResponseStream(clientModel, json, req)
}
