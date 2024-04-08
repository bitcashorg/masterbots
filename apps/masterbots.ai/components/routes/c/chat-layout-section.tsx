'use client'

import * as React from 'react'
import { useThread } from '@/hooks/use-thread'
import { ThreadPopup } from './chat-thread-popup'

export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
  const { sectionRef, isOpenPopup } = useThread()

  return (
    <section
      className="h-[calc(100vh-4rem)] group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out lg:ml-[250px] xl:ml-[300px] relative"
      ref={sectionRef as React.Ref<HTMLDivElement>}
    >
      <div className="flex flex-col items-center lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)]">
        {children}
      </div>

      {isOpenPopup ? <ThreadPopup /> : ''}
    </section>
  )
}
