import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { getThread } from '@/services/hasura'
import '@/app/globals.css'
import OGImage from '@/components/og-image'
export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const threadId = searchParams.get('threadId');
    const thread = await getThread({ threadId,jwt: "" }, )
    const question =
      thread.messages.find(m => m.role === 'user')?.content || 'not found'
    const answer =
      thread.messages.find(m => m.role === 'assistant')?.content || 'not found'
    const username = thread.user?.username
    const user_avatar = thread.user?.profilePicture || ''

    let theme = 'dark'
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('theme') || 'dark'
    }
    const isLightTheme = theme === 'light'
    return new ImageResponse(
      (
        <OGImage  
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
