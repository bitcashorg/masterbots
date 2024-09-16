'use client'

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import * as React from 'react'

export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
  const { sectionRef, isOpenPopup } = useThread()

  return (
    <section
      ref={sectionRef as React.Ref<HTMLDivElement>}
      className={cn(
        'flex h-[calc(100vh-4rem)] group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out relative lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] px-4 md:px-10 lg:ml-[250px] xl:ml-[300px]'
      )}
    >
      <div className="flex flex-col pt-5 w-full gap-10 max-w-screen-lg mx-auto">
        {children}
      </div>

      {isOpenPopup ? <ThreadPopup /> : ''}
    </section>
  )
}
