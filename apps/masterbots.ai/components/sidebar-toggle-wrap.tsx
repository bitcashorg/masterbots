'use client';

import { usePathname } from 'next/navigation'
import { SidebarToggle } from './sidebar-toggle'

function SidebarToggleWrap() {
  const pathname = usePathname()

  if (pathname !== '/chat') {
    return null
  }

  return <SidebarToggle />
}

export default SidebarToggleWrap
