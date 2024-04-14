import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { GeistMono } from 'geist/font/mono' // Import the GeistMono font

export const runtime = 'edge'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const postTitle = searchParams.get('title')

  // You may need to convert GeistMono or fetch it as ArrayBuffer if needed
  // const font = GeistMono; // Assuming GeistMono can be directly used, modify as needed

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: `url('/images/masterbots.png') no-repeat center center / cover`
        }}
      >
        <div
          style={{
            marginLeft: 190,
            marginRight: 190,
            display: 'flex',
            fontSize: 130,
            fontFamily: GeistMono.className,
            letterSpacing: '-0.05em',
            fontStyle: 'normal',
            color: 'white',
            lineHeight: '120px',
            whiteSpace: 'pre-wrap'
          }}
        >
          {postTitle}
        </div>
      </div>
    ),
    {
      width: 1920,
      height: 1080
      // Optionally, if font needs to be loaded as data
      // fonts: [
      //   {
      //     name: 'GeistMono',
      //     data: font, // Assuming font data is handled accordingly
      //     style: 'normal'
      //   }
      // ]
    }
  )
}
