'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'
import { ModalComingSoon } from './modal-coming-soon'

export function CategoryMainTabs() {
    const { tab, changeTab } = useSidebar()
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <>
            <ModalComingSoon isOpen={isOpen} onClose={() => { setIsOpen(false) }} />
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
        </>
    )
}
