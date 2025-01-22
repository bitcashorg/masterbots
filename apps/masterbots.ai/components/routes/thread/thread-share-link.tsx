'use client'

import { generateShortLink } from '@/app/actions'
import { Button } from '@/components/ui/button'
import { AnimatePresence } from 'framer-motion'
import { LucideCheck, LucideLoader2, LucideX } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ShareLinkProps {
  variant?: 'default' | 'active'
}

export default function ShareLink({ variant = 'default' }: ShareLinkProps) {
  const [status, setStatus] = useState<
    'default' | 'loading' | 'copied' | 'error'
  >('default')

  const copyToClipboard = async () => {
    setStatus('loading')
    try {
      const { data, error } = await generateShortLink(window.location.pathname)
      if (error) throw new Error(`Error generating link: ${error}`)
      if (!data) throw new Error('No data received from link generation')
      navigator.clipboard.writeText(data.shortLink)
      setStatus('copied')
      const timer = setTimeout(() => setStatus('default'), 5000)
      return () => clearTimeout(timer)
    } catch (error) {
      console.error('Failed to copy share link:', error)
      setStatus('error')
      const timer = setTimeout(() => setStatus('default'), 5000)
      return () => clearTimeout(timer)
    }
  }

  const getIconColor = () => {
    switch (status) {
      case 'copied':
        return 'stroke-success'
      case 'error':
        return 'stroke-destructive'
      case 'loading':
        return 'stroke-muted-secondary'
      default:
        return variant === 'active' ? 'fill-[#388DE2]' : 'fill-[#FAFAFA]'
    }
  }

  const iconsMap = {
    loading: (
      <LucideLoader2 size={26} className={cn('animate-spin', getIconColor())} />
    ),
    copied: <LucideCheck size={26} className={getIconColor()} />,
    error: <LucideX size={26} className={getIconColor()} />,
    default: (
      // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Share Icon"
        className={cn('transition-colors', getIconColor())}
      >
        <path d="M19.0166 15.4186C17.6362 15.4186 16.4053 16.0764 15.6179 17.093L9.02489 13.4103C9.17938 12.9668 9.26409 12.4884 9.26409 11.995C9.26409 11.4967 9.17938 11.0233 9.01991 10.5748L15.608 6.89701C16.3903 7.9186 17.6262 8.5814 19.0116 8.5814C21.3737 8.5814 23.3023 6.65781 23.3023 4.2907C23.3023 1.92359 21.3787 0 19.0116 0C16.6445 0 14.7209 1.92359 14.7209 4.2907C14.7209 4.78904 14.8056 5.26744 14.9651 5.71096L8.38203 9.3887C7.59964 8.36213 6.36376 7.70432 4.97838 7.70432C2.61625 7.70432 0.687683 9.62791 0.687683 11.995C0.687683 14.3621 2.61625 16.2857 4.98336 16.2857C6.36875 16.2857 7.60463 15.6229 8.392 14.5963L14.98 18.2791C14.8206 18.7276 14.7309 19.211 14.7309 19.7093C14.7309 22.0714 16.6545 24 19.0216 24C21.3887 24 23.3123 22.0764 23.3123 19.7093C23.3123 17.3422 21.3837 15.4186 19.0166 15.4186ZM19.0166 1.3505C20.6412 1.3505 21.9618 2.6711 21.9618 4.29568C21.9618 5.92027 20.6412 7.24086 19.0166 7.24086C17.392 7.24086 16.0714 5.92027 16.0714 4.29568C16.0714 2.6711 17.397 1.3505 19.0166 1.3505ZM4.98336 14.9402C3.35878 14.9402 2.03818 13.6196 2.03818 11.995C2.03818 10.3704 3.35878 9.04983 4.98336 9.04983C6.60795 9.04983 7.92855 10.3704 7.92855 11.995C7.92855 13.6196 6.60297 14.9402 4.98336 14.9402ZM19.0166 22.6495C17.392 22.6495 16.0714 21.3289 16.0714 19.7043C16.0714 18.0797 17.392 16.7591 19.0166 16.7591C20.6412 16.7591 21.9618 18.0797 21.9618 19.7043C21.9618 21.3289 20.6412 22.6495 19.0166 22.6495Z" />
      </svg>
    )
  }

  return (
    <Button
      onClick={copyToClipboard}
      variant="ghost"
      className={cn(
        'h-auto px-1',
        variant === 'active' && 'hover:bg-[#388DE2]/10'
      )}
    >
      <AnimatePresence>{iconsMap[status]}</AnimatePresence>
    </Button>
  )
}
