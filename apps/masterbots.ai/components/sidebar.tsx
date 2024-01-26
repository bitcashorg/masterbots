'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { cn } from '@/lib/utils'
import { ModalComingSoon } from './modal-coming-soon'
import useClickOutside from '@/lib/hooks/use-click-outside'

export interface SidebarProps extends React.ComponentProps<'div'> {}

export function Sidebar({ className, children }: SidebarProps) {
  const { isSidebarOpen, isLoading, tab, changeTab, toggleSidebar } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(false)

  const ref = React.useRef(null)
  useClickOutside(ref, () => { toggleSidebar(false)})
  return (
    <div
      ref={ref}
      data-state={isSidebarOpen && !isLoading ? 'open' : 'closed'}
      className={cn(className, 'h-full flex-col dark:bg-zinc-950')}
    >
      <div className='w-full flex'>
        <button
        onClick={() => { changeTab('general') }}
        className={`flex justify-center items-center w-1/2 h-[48px] ${tab === 'general' ? '' : 'dark:bg-[#27272A80] bg-[#71717A80] text-white rounded-r-[5px]'}`}>
          General
        </button>
        <button onClick={() => { setIsOpen(true) }} className={`flex justify-center items-center w-1/2 h-[48px] ${tab !== 'general' ? '' : 'dark:bg-[#27272A80] bg-[#71717A80] text-white rounded-l-[5px]'}`}>
          Work
        </button>
      </div>
      <div className='grow overflow-y-auto scrollbar'>
        {children}
      </div>
      <ModalComingSoon isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
    </div>
  )
}
