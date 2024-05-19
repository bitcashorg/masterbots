/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { GeistMono } from 'geist/font/mono' // Import the GeistMono font
import '@/app/globals.css'
import { getThread } from '../actions'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const threadId = searchParams.get('threadId')
    const thread = await getThread({ threadId })

    // You may need to convert GeistMono or fetch it as ArrayBuffer if needed
    // const font = GeistMono; // Assuming GeistMono can be directly used, modify as needed

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            backgroundColor: '#17171b',
            padding: '40px'
            // fontFamily: GeistMono.className
          }}
        >
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
                  color: 'white'
                }}
              >
                {thread.chatbot.name}
              </p>
              <h1 style={{ fontSize: '68px', color: 'white' }}>
                {thread.firstMessage.content}
              </h1>
              <p
                style={{ color: '#ef4444', fontSize: '18px', marginTop: '0px' }}
              >
                {thread.chatbot.categories[0].name}
              </p>
            </div>
            {thread.chatbot.avatar ? (
              <div style={{ display: 'flex', position: 'relative' }}>
                <svg
                  height="600"
                  style={{
                    position: 'absolute',
                    top: '-300px',
                    left: '-100px',
                    opacity: '0.2'
                  }}
                  version="1.1"
                  viewBox="0 0 900 600"
                  width="900"
                >
                  <g transform="translate(444.3593826782917 273.8643784322123)">
                    <path
                      d="M186.1 -166.4C230.8 -141.4 249.4 -70.7 237.7 -11.7C226 47.4 184.1 94.8 139.4 139.9C94.8 185.1 47.4 228 -2.2 230.3C-51.9 232.5 -103.7 194 -149.2 148.9C-194.7 103.7 -233.9 51.9 -229.5 4.4C-225.1 -43.1 -177.3 -86.3 -131.8 -111.3C-86.3 -136.3 -43.1 -143.1 13.8 -156.9C70.7 -170.7 141.4 -191.4 186.1 -166.4"
                      fill="#ef4444"
                    />
                  </g>
                </svg>

                <img
                  alt=""
                  src={thread.chatbot.avatar}
                  style={{
                    objectFit: 'cover',
                    margin: 'auto',
                    border: '8px solid #ef4444',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%'
                  }}
                />
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
  } catch (e) {
    console.log(`${e.message}`)
    return new Response(`Failed to generate the image`, {
      status: 500
    })
  }
}
