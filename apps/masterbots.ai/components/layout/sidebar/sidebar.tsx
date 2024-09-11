'use client'

import * as React from 'react'
import FooterCT from '@/components/layout/footer/footer-ct'
import { SidebarFooter } from '@/components/layout/sidebar/sidebar-footer'
import { SidebarHeader } from '@/components/layout/sidebar/sidebar-header'
import { SidebarCategoryGeneral } from '@/components/layout/sidebar/sidebar-category-general'
import { SidebarItems } from '@/components/layout/sidebar/sidebar-items'
import useClickOutside from '@/lib/hooks/use-click-outside'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'

export interface SidebarProps extends React.ComponentProps<'div'> {
  categories: any[] // Replace 'any' with your actual category type
  chats: any[] // Replace 'any' with your actual chat type
}

export function Sidebar({ className, categories, chats }: SidebarProps) {
  const {
    isSidebarOpen,
    isLoading,
    toggleSidebar
  } = useSidebar()

  const ref = React.useRef<HTMLElement>(null)

  useClickOutside(ref, () => {
    toggleSidebar(false)
  })

  const renderSidebarContent = React.useMemo(() => (
    <>
      <SidebarHeader />
      <div className="flex-grow overflow-y-auto scrollbar">
        <SidebarCategoryGeneral categories={categories} />
        <SidebarItems chats={chats} />
      </div>
    </>
  ), [categories, chats])

  return (
    <aside
      ref={ref}
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(className, 'h-full flex flex-col dark:bg-zinc-950 z-[5000]')}
    >
      {renderSidebarContent}
      <SidebarFooter>
        <FooterCT />
      </SidebarFooter>
    </aside>
  )
}