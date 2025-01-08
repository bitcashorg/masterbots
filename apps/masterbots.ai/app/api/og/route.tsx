import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { getThreadForOG } from './edge-client'
import OGImage from '@/components/shared/og-image'
import { UUID } from 'crypto'
export const runtime = 'edge'

const defaultContent = {
  thread: {
    chatbot: {
      name: 'Masterbots',
      avatar: null,
      categories: [{ category: { name: 'AI' } }]
    }
  },
  question:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  answer:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  username: 'Masterbots',
  user_avatar: '',
  isLightTheme: false
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const threadId = searchParams.get('threadId') as UUID
  

    if (!threadId) {
      return new ImageResponse(<OGImage {...defaultContent} />, {
        width: 1200,
        height: 627
      })
    }
    const thread = await getThreadForOG(threadId)

    if (!thread?.thread?.length) {
      // Use metadata when thread not found
      return new ImageResponse(<OGImage {...defaultContent} />, {
        width: 1200,
        height: 627
      })
    }

    const threadData = thread.thread[0]
    const question =
      threadData?.messages?.find((m: { role: string }) => m.role === 'user')
        ?.content || 'not found'
    const answer =
      threadData?.messages?.find(
        (m: { role: string }) => m.role === 'assistant'
      )?.content || 'not found'
    const username = threadData?.user?.username || 'Anonymous'
    const user_avatar = threadData?.user?.profilePicture || ''

    return new ImageResponse(
      (
        <OGImage
          thread={threadData}
          question={question}
          answer={answer}
          username={username}
          user_avatar={user_avatar}
          isLightTheme={false}
        />
      ),
      {
        width: 1200,
        height: 627
      }
    )
  } catch (e: any) {
    console.error('OG Image generation error:', e)
    return new Response(`Failed to generate the image: ${e.message}`, {
      status: 500
    })
  }
}
