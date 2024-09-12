'use client'

import React from 'react'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { SidebarHeader } from '@/components/layout/sidebar/sidebar-header'
import { SidebarFooter } from '@/components/layout/sidebar/sidebar-footer'
import { SidebarCategoryGeneral } from '@/components/layout/sidebar/sidebar-category-general'
import FooterCT from '@/components/layout/footer/footer-ct'
import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle'
import { cn } from '@/lib/utils'

export function Sidebar({ className }: React.ComponentProps<'div'>) {
  const { isSidebarOpen, isLoading } = useSidebar()

  if (isLoading) return null

  return (
    <>
      <SidebarToggle />
      <aside
        data-state={isSidebarOpen ? 'open' : 'closed'}
        className={cn(
          className,
          'h-full flex flex-col dark:bg-zinc-950 z-[5000]'
        )}
      >
        <div className="overflow-y-auto scrollbar h-[calc(100%-113px)]">
          <SidebarHeader />
          <div className="flex-grow p-4 overflow-y-auto scrollbar">
            <SidebarCategoryGeneral />
          </div>
        </div>
        <SidebarFooter>
          <FooterCT />
        </SidebarFooter>
      </aside>
    </>
  )
}
