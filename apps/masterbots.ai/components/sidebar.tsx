'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import useClickOutside from '@/lib/hooks/use-click-outside'
import { CategoryMainTabs } from './category-main-tabs'

export interface SidebarProps extends React.ComponentProps<'div'> {}

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading, toggleSidebar } = useSidebar()

  const ref = React.useRef(null)
  useClickOutside(ref, () => {
    toggleSidebar(false)
  })
  return (
    <div
      ref={ref}
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(className, 'h-full flex-col dark:bg-zinc-950')}
    >
      <CategoryMainTabs />
      <div className="overflow-y-auto scrollbar h-[calc(100%-3rem)]">
        {children}
      </div>
    </div>
  )
}
