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
        className={`flex flex-1 items-center justify-between pb-4
        border-[rgb(30,41,59)]
        font-medium w-full ${open ? '' : '[&>div>div>button]:!hidden'}`}
      >
        {children[0]}
        <ChevronDown
          className={`${open ? '' : '-rotate-90'}  h-4 w-4 shrink-0 mr-4 transition-transform duration-200`}
        />
      </button>
      <div
        className={`text-sm transition-all
      ${
        open
          ? 'animate-accordion-down py-4'
          : 'overflow-hidden animate-accordion-up h-0'
      }`}
      >
        {children[1]}
      </div>
    </div>
  )
}
