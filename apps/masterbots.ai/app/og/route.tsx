import { getThread } from '@/app/actions'
import '@/app/globals.css'
import OgImage from '@/components/og-image'
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const threadId = searchParams.get('threadId');
    const thread = await getThread({ threadId })
    const question = thread.firstMessage.content
    const answer = thread.firstAnswer.content
    const username = thread.account?.username
    const user_avatar = thread.account?.avatar || ''

    let theme = 'dark'
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('theme') || 'dark'
    }
    const isLightTheme = theme === 'light'
    return new ImageResponse(
      (
        <OgImage
          thread={thread}
          question={question}
          answer={answer}
          username={username}
          user_avatar={user_avatar}
          isLightTheme={isLightTheme}
        />
      ),
      {
        width: 1200,
        height: 627
      }
    )
  } catch (e: any) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
function useTheme() {
  throw new Error('Function not implemented.')
}
