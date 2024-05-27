'use server'
import { cookies } from 'next/headers'
import axios from 'axios'
import { Resend } from 'resend'
import { z } from 'zod'

// generate dub.co links
export async function generateShortLink(path: string) {
  const cookieStorage = cookies()
  try {
     const resolved: DubShareLinkResponse = await axios
          .post(
            `https://api.dub.co/links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
            {
              domain: 'mbots.to',
              url: `https://masterbots.ai${path}`
            },
            {
              headers: {
                Authorization: `Bearer ${process.env.DUB_API_KEY}`,
                'Content-Type': 'application/json'
              }
            }
          )
          .then(res => res.data)

    if (!resolved) throw new Error('Failed to generate short link')

    return {
      data: {
        key: resolved.key,
        shortLink: resolved.shortLink,
        qrCode: resolved.qrCode
      },
      error: null
    }
  } catch (error) {
     console.log(path+'Failed to generate short link: ==> ', error)
    return {
      data: null,
     }
  }
}

export interface DubShareLinkResponse {
  key: string
  shortLink: string
  qrCode: string
}

export type ActionState = {
  data?: string
  error?: string
}
