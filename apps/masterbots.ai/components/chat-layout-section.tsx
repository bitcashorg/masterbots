'use client'

import * as React from 'react'
import { ThreadPopup } from './thread-popup'
import { useThread } from '@/lib/hooks/use-thread'

export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
  const { sectionRef, isOpenPopup } = useThread()

  return (
    <section
      ref={sectionRef as React.Ref<HTMLDivElement>}
      className="group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out lg:ml-[250px] xl:ml-[300px] relative"
    >
      <div
        className={`${isOpenPopup ? 'h-full overflow-hidden absolute z-[-1]' : ''}`}
      >
        {children}
      </div>

      {isOpenPopup ? <ThreadPopup /> : ''}
    </section>
  )
}
