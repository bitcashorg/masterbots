'use client'

import { SidebarCategoryGeneral } from '@/components/layout/sidebar/sidebar-category-general'
import { SidebarHeader } from '@/components/layout/sidebar/sidebar-header'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import React from 'react'
import { usePathname } from 'next/navigation'
import { useThread } from '@/lib/hooks/use-thread'

export function Sidebar({ className }: React.ComponentProps<'div'>) {
  const { isSidebarOpen, isLoading } = useSidebar()
  const prevPathRef = React.useRef(usePathname())
  const pathname = usePathname()
  const { setActiveThread, setIsOpenPopup } = useThread()
  const rootAndChatRegex = /^\/(?:c)?$/
  const isChatRoute = pathname?.startsWith('/c')

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    if (rootAndChatRegex.test(pathname)) {
      setActiveThread(null)
      setIsOpenPopup(false)
    }
    prevPathRef.current = pathname
  }, [pathname])

  if (isLoading) return null

  return (
    <>
      <aside
        data-state={isSidebarOpen ? 'open' : 'closed'}
        className={cn(
          className,
          'h-full flex flex-col z-40',
          isChatRoute 
            ? 'bg-[#fae8ff] dark:bg-[#17021D]' // For /c routes
            : 'bg-[#eeffea] dark:bg-[#0B1608]'  // For other routes
        )}
      >
        <div className="overflow-y-auto scrollbar h-[calc(100%-113px)]">
          <SidebarHeader />
          <div className="p-4 overflow-y-auto grow scrollbar">
            <SidebarCategoryGeneral />
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar;