/* eslint-disable react/no-unescaped-entities */
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export function FooterText({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-2 text-center text-sm text-muted-foreground dark:text-[#9CA3AF]',
        className
      )}
      {...props}
    >
      <span>
        Masterbots isn't infallible; verify crucial facts. Nonprofessional advice.
      </span>
      <span className='px-1'>
        Robot avatars by{' '}
        <Link 
          href="https://robohash.org" 
          target="_blank" 
          rel="nofollow noopener noreferrer" 
          className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          robohash.org
        </Link>
        {' • '}
        <Link 
          href="/terms" 
          className="underline hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          terms & policies
        </Link>
      </span>
    </div>
  )
}