'use client'

import { Check, CopyIcon, LoaderCircle } from 'lucide-react'
import { useAsyncFn } from 'react-use'
import { cn } from '@/lib/utils'
import { shorten } from '@/services/dub'

export default function Shortlink() {
  // for local dev
  const url = window.location.href.replace(
    'http://localhost:3000',
    'https://alpha.masterbots.ai'
  )

  const [shortlink, getShortlink] = useAsyncFn(async () => {
    const formData = new FormData()
    formData.set('url', url)
    const { shortLink } = await shorten({}, formData)
    return navigator.clipboard.writeText(shortLink).then(() => shortLink)
  })

  const handleIconClick = async (e: any) => {
    // Stop propagation to prevent form submission when clicking on the icon
    e.preventDefault()
    e.stopPropagation()
    getShortlink()
  }

  const Icon = shortlink.value
    ? Check
    : shortlink.loading
      ? LoaderCircle
      : CopyIcon

  return (
    <Icon
      className={cn(
        'pointer transition-all',
        shortlink.loading && 'animate-spin'
      )}
      onClick={handleIconClick}
      size={15}
    />
  )
}
