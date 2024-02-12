'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

export const ChatAccordion = ({
  className,
  children,
  defaultState = false,
  ...props
}: {
  className?: string
  children: React.ReactNode[]
  defaultState?: boolean
  triggerClass?: string
  contentClass?: string
}) => {
  const [open, setOpen] = React.useState(defaultState)
  const toggle = () => {
    setOpen(!open)
  }
  return (
    <div className={cn('border-b', className)} {...props}>
      <button
        onClick={toggle}
        className={`flex flex-1 justify-start flex-col pb-4 relative pr-4
        border-[rgb(30,41,59)]
        font-medium w-full ${
          open
            ? 'border-b-[1px]'
            : 'hover:border-b-[1px] [&>div>div>button]:!hidden'
        }`}
      >
        {children[0]}
        {!open && children[1]}
        <ChevronDown
          className={`${open ? '' : '-rotate-90'} absolute -right-2 h-4 w-4 shrink-0 mr-4 transition-transform duration-200 mt-2`}
        />
      </button>
      <div
        className={`text-sm transition-all
      ${
        open
          ? 'animate-accordion-down py-4 border-[1px] border-t-0 border-r-0 border-[rgb(30,41,59)]'
          : 'overflow-hidden animate-accordion-up h-0'
      }`}
      >
        {children[2]}
      </div>
    </div>
  )
}
