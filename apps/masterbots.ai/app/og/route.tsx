/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { GeistMono } from 'geist/font/mono' // Import the GeistMono font
import { getThread } from '@/services/hasura'
import '@/app/globals.css'
import OgBgImage from '@/components/og-bg-image'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const threadId = searchParams.get('threadId');
    const thread = await getThread({ threadId })
    const question =
      thread.messages.find(m => m.role === 'user')?.content || 'not found'
    const answer =
      thread.messages.find(m => m.role === 'assistant')?.content || 'not found'
    const username = thread.user?.username
    const user_avatar = thread.user?.profilePicture || ''

    let theme = 'light'
    if (typeof window !== 'undefined') {
      theme = localStorage.getItem('theme') || 'dark'
    }
    const isLightTheme = theme === 'light'
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: isLightTheme ? '#ffff' : '#17171b',
            padding: '40px',
            color: isLightTheme ? '#17171b' : '#ffff'
          }}
        >
       
          

          <OgBgImage  isLightTheme={isLightTheme} />

          <div
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <div
              style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                marginRight: '20px'
              }}
            >
              <p
                style={{
                  fontWeight: 'bold',
                  marginBottom: '0px',
                  fontSize: 32,
                  color: isLightTheme ? '#17171b' : '#ffff'
                }}
              >
                {thread.chatbot.name}
              </p>
              <p
                style={{ color: '#ef4444', fontSize: '18px', marginTop: '0px' }}
              >
                {' '}
                {thread.chatbot.categories[0]?.category.name}
              </p>
              <h1
                style={{
                  fontSize: '64px',
                  lineHeight: '75px',
                  color: isLightTheme ? '#17171b' : '#ffff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  maxHeight: '3.6em'
                }}
              >
                {question}
              </h1>
              <p
                style={{
                  fontSize: '24px',
                  color: isLightTheme ? '#17171b' : '#ffff',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  maxHeight: '96px'
                }}
              >
                {answer}
              </p>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '20px'
                }}
              >
                <img
                  alt=""
                  style={{
                    objectFit: 'cover',
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    border: '2px solid #388DE2'
                  }}
                  src={user_avatar}
                />
                <p
                  style={{
                    color: isLightTheme ? '#17171b' : '#ffff',
                    fontSize: '34px',
                    marginLeft: '15px',
                    marginTop: '40px',
                    textTransform: 'lowercase'
                  }}
                >
                  {username}
                </p>
              </div>
            </div>
            {thread.chatbot.avatar ? (
              <div style={{ display: 'flex' }}>
                <div
                  style={{
                    backgroundColor: '#1E293B',
                    display: 'flex',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%'
                  }}
                >
                  <img
                    alt=""
                    style={{
                      objectFit: 'cover',
                      margin: 'auto',
                      border: '8px solid #388DE2',
                      width: '300px',
                      height: '300px',
                      borderRadius: '50%',
                      zIndex: '1px' // Ensure the image is above the SVG
                    }}
                    src={thread.chatbot.avatar}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
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
