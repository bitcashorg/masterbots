import { createResponseStream } from '@/app/api/chat/actions/actions'
import { getModelClientType } from '@/lib/ai-helpers'

export const runtime = 'edge'

export async function POST(req: Request) {
  const json = await req.json()
  const { model } = json

  // TODO: Check this (user session). Users should have their session up to 30-days.
  // const userId = (await getServerSession())?.user.id

  // if (!userId) {
  //   return new Response('Unauthorized', {
  //     status: 401
  //   })
  // }

  const clientModel = getModelClientType(model)

  // ? this condition is for internal test phase only. When moving to Ai SDK 3.1,
  // ? It will be all together in the createResponseStream function
  return createResponseStream(clientModel, json, req)
}
