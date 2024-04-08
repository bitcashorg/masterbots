'use client'

import * as React from 'react'
import useClickOutside from '@/hooks/use-click-outside'
import { useSidebar } from '@/hooks/use-sidebar'
import { cn } from '@/lib/utils'

export type SidebarProps = React.ComponentProps<'div'>

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading, toggleSidebar } = useSidebar()

  const ref = React.useRef(null)
  useClickOutside(ref, () => {
    toggleSidebar(false)
  })
  return (
    <aside
      className={cn(className, 'h-full flex-col dark:bg-zinc-950 z-[5000]')}
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      ref={ref}
    >
      <div className="overflow-y-auto scrollbar h-[calc(100%-113px)]">
        {children}
      </div>
    </aside>
  )
}
