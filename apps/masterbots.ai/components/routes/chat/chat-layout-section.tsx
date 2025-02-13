'use client'

//* ChatLayoutSection component renders a chat layout with conditional popup and responsive styling.

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import type * as React from 'react'

//* ChatLayoutSection provides the main chat area layout with optional thread popup and responsive styling.
export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
  const { sectionRef, isOpenPopup } = useThread()

  return (
    <section
      ref={sectionRef as React.Ref<HTMLDivElement>}
      className={cn(
        'flex h-full max-h-[calc(100vh-219px)] group w-full overflow-auto animate-in duration-300 ease-in-out relative',
        'lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] lg:ml-[250px] xl:ml-[300px]',
        'scrollbar'
      )}
    >
      <div className="flex flex-col w-full max-w-screen-lg gap-10 px-4 pt-5 mx-auto max-h-screen-lg md:px-10">
        {children}
      </div>

      <ThreadPopup className={isOpenPopup ? '' : 'hidden'} />
    </section>
  )
}