'use client'

import { shorten } from '@/app/actions'
import { CopyIcon } from 'lucide-react'

export default function Shortlink() {
  const url = window.location.href.replace(
    'http://localhost:3000',
    'https://dev.masterbots.ai'
  )

  const handleIconClick = async (e: any) => {
    // Stop propagation to prevent form submission when clicking on the icon
    e.preventDefault()
    e.stopPropagation()
    const formData = new FormData()
    formData.set('url', url)
    const { shortLink } = await shorten({}, formData)
    navigator.clipboard
      .writeText(shortLink)
      .then(() => console.log('Shortlink copied to clipboard'))
      .catch(error =>
        console.error('Error copying shortlink to clipboard: ', error)
      )
  }

  return <CopyIcon size={15} onClick={handleIconClick} className="pointer" />
}
