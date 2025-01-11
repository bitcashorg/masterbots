'use client'

//* ChatLayoutSection component renders a chat layout with conditional popup and responsive styling.

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import type * as React from 'react'

//* ChatLayoutSection provides the main chat area layout with optional thread popup and responsive styling.
export function ProfileLayoutSection({ children }: { children: React.ReactNode }) {
  const { sectionRef, isOpenPopup } = useThread()

  return (
    <section
      ref={sectionRef as React.Ref<HTMLDivElement>}
      className={cn(
        'flex h-[calc(100vh-4rem)] group w-full overflow-auto animate-in duration-300 ease-in-out relative',
        'scrollbar'
      )}
    >
      <div className="flex flex-col w-full  gap-10  mx-auto max-h-screen-lg ">
        {children}
      </div>

      {/* <ThreadPopup className={isOpenPopup ? '' : 'hidden'} /> */}
    </section>
  )
}