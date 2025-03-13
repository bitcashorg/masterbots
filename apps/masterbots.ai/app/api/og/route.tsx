import OGImage from '@/components/shared/og-image'
import type { UUID } from '@/types/types'
import type { Chatbot, Thread } from 'mb-genql'
import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'
import { getChatbotForOG, getThreadForOG } from './edge-client'
export const runtime = 'edge'

const IMAGE_DIMENSIONS = {
  width: 1200,
  height: 700,
}

const defaultContent = {
  thread: {
    chatbot: {
      name: 'Masterbots',
      avatar: process.env.NEXT_PUBLIC_BASE_URL + '/images/masterbots.png',
      categories: [{ category: { name: 'AI' } }],
    },
  },
  question:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  answer:
    'Elevating AI Beyond ChatGPT: Specialized Chatbots, Social Sharing and User-Friendly Innovation',
  username: 'Masterbots',
  user_avatar: process.env.NEXT_PUBLIC_BASE_URL + '/images/masterbots.png',
  isLightTheme: false,
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const rawThreadId = searchParams.get('threadId')
    const rawChatbotId = searchParams.get('chatbotId')
    const rawThreadQuestionSlug = searchParams.get('threadQuestionSlug')
    const threadId = rawThreadId?.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    )
      ? (rawThreadId as UUID)
      : null
    const chatbotId = rawChatbotId?.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    )
      ? (rawChatbotId as UUID)
      : null

    if (!threadId) {
      return new ImageResponse(<OGImage {...defaultContent} />, IMAGE_DIMENSIONS)
    }
    // TODO: Update this to use mb-genql package
    const { thread }: { thread: Thread[] } = await getThreadForOG(threadId)
    
    // Initialize chatbot data
    let chatbotData: { chatbot: Chatbot[] } = { chatbot: [] }
    if (chatbotId) {
      chatbotData = await getChatbotForOG(chatbotId)
    }
    const { chatbot } = chatbotData

    if (chatbot?.length) {
      return new ImageResponse(
        <OGImage
          thread={chatbot[0].threads[0]}
          question={chatbot[0].name}
          answer={chatbot[0]?.description || ''}
          user_avatar={chatbot[0]?.avatar || ''}
          username={chatbot[0].metadata[0]?.domainName || 'General'}
          isLightTheme={false}
        />,
        IMAGE_DIMENSIONS,
      )
    }


    if (!thread?.length) {
      // Use metadata when thread not found
      return new ImageResponse(<OGImage {...defaultContent} />, IMAGE_DIMENSIONS)
    }

    const threadData = thread[0]
    const question =
      threadData?.messages?.find(
        (m) => (rawThreadQuestionSlug && m.slug === rawThreadQuestionSlug) || m.role === 'user',
      )?.content || 'not found'
    const questionSlugIndex = threadData?.messages.findIndex(
      (m) => m.slug === rawThreadQuestionSlug,
    )
    const answer = !questionSlugIndex
      ? threadData?.messages?.find((m) => m.role === 'assistant')?.content || 'not found'
      : threadData?.messages[questionSlugIndex + 1]?.content || 'not found' // next message after the question is (and should be) the assistant response
    const username = threadData?.user?.username || 'Anonymous'
    const user_avatar = threadData?.user?.profilePicture || ''

    return new ImageResponse(
      <OGImage
        thread={threadData}
        question={question}
        answer={answer}
        username={username}
        user_avatar={user_avatar}
        isLightTheme={false}
      />,
      IMAGE_DIMENSIONS,
    )
  } catch (e: unknown) {
    console.error('OG Image generation error:', e)
    return new Response(`Failed to generate the image: ${(e as Error).message}`, {
      status: 500,
    })
  }
}
