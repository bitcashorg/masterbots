'use client';

import { SidebarToggle } from '@/components/layout/sidebar/sidebar-toggle';
import { usePathname } from 'next/navigation';

function SidebarToggleWrap() {
  const pathname = usePathname()

  if (!pathname.includes('/c')) {
    return null
  }

  return <SidebarToggle />
}

export default SidebarToggleWrap
