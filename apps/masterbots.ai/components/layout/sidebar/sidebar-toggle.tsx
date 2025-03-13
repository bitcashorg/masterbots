'use client'

import { Button } from '@/components/ui/button'
import { IconSidebar } from '@/components/ui/icons'
import { useSidebar } from '@/lib/hooks/use-sidebar'
import { usePathname } from 'next/navigation'
import * as React from 'react'
import { usePrevious } from 'react-use'

export function SidebarToggle() {
  const { isSidebarOpen, activeChatbot, toggleSidebar } = useSidebar()
  const pathname = usePathname()
  const prevPathname = usePrevious(pathname)

  // Close sidebar if it is open on pathname change.
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const isSmallScreen = window.innerWidth < 1024 
    if (isSidebarOpen && pathname !== prevPathname && isSmallScreen && activeChatbot) {
      toggleSidebar()
    }
  }, [pathname, activeChatbot])

  return (
    <Button
      variant="ghost"
      className="flex p-0 -ml-2 size-9 lg:hidden"
      onClick={(e) => {
        e.stopPropagation()
        toggleSidebar()
      }}
    >
      <IconSidebar className="size-6" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}
