'use client'

import * as React from 'react'

import { useSidebar } from '@/lib/hooks/use-sidebar'

/**
 * `CategoryMainTabs` Component
 *
 * Usage:
 * This component is used in the context where a sidebar/mainbar (or a similar UI component)
 * needs tab functionality to switch between "General" and "Work" categories.
 * It leverages the `useSidebar` custom hook to handle active tab state and switching logic.
 * More components can be added as modals or additional content by toggling the `isOpen` state.
 *
 * Details:
 * - The component maintains its own state to manage the visibility of modal or additional content
 *   through the `isOpen` state variable. This state is controlled by the "Work" button.
 * - It uses the `useSidebar` hook to:
 *   - Get the current active tab (`tab`).
 *   - Change the current tab (`changeTab`) to "General" when the "General" button is clicked.
 */

export function CategoryMainTabs() {
  const { tab, changeTab } = useSidebar()
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <div className="w-full flex">
        <button
          onClick={() => {
            changeTab('general')
          }}
          className={`flex justify-center items-center w-1/2 h-12 ${tab === 'general' ? '' : 'dark:bg-[#27272A80] bg-[#71717A80] text-white rounded-r-[5px]'}`}
        >
          General
        </button>
        <button
          onClick={() => {
            setIsOpen(true)
          }}
          className={`flex justify-center items-center w-1/2 h-12 ${tab !== 'general' ? '' : 'dark:bg-[#27272A80] bg-[#71717A80] text-white rounded-l-[5px]'}`}
        >
          Work
        </button>
      </div>
    </>
  )
}
