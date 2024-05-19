import React from 'react'
import { cn } from '@/lib/utils'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'dark:text-[#9CA3AF] px-2 text-center text-xs font-normal leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Masterbots isn't infallible; verify crucial facts. Responses are for
      educational use, not legal, medical, financial or specialized advice.
    </p>
  )
}
