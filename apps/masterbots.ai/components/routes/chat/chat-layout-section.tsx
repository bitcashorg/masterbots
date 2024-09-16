'use client'

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import * as React from 'react'

export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
  const { sectionRef, isOpenPopup } = useThread()
  const path = usePathname()
  const isBrowse = !path.includes('/c')

  return (
    <section
      ref={sectionRef as React.Ref<HTMLDivElement>}
      className={cn(
        'h-[calc(100vh-4rem)] group w-full overflow-auto pl-0 animate-in duration-300 ease-in-out relative',
        { 'lg:ml-[250px] xl:ml-[300px]': !isBrowse },
        //  TODO: Check CSS here
        { 'lg:ml-[250px] xl:pl-[300px]': isBrowse }
      )}
    >
      <div className="flex flex-col items-center lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)]">
        {children}
      </div>

      {isOpenPopup ? <ThreadPopup /> : ''}
    </section>
  )
}
