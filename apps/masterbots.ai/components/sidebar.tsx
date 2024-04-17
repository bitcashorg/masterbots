'use client'

import * as React from 'react'

import useClickOutside from '@/lib/hooks/use-click-outside'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'

export interface SidebarProps extends React.ComponentProps<'div'> { }

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading, toggleSidebar } = useSidebar()

  const ref = React.useRef(null)
  useClickOutside(ref, () => {
    toggleSidebar(false)
  })
  return (
    <aside
      ref={ref}
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(className, 'h-full flex-col dark:bg-zinc-950 z-[5000]')}
    >
      <div className="overflow-y-auto scrollbar h-[calc(100%-113px)]">
        {children}
      </div>
    </aside>
  )
}
