'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { useThread } from '@/lib/hooks/use-thread'
import { Thread } from 'mb-genql'

export const ChatAccordion = ({
  thread = null,
  className,
  children,
  defaultState = false,
  triggerClass,
  contentClass,
  arrowClass,
  handleOpen,
  handleTrigger,
  ...props
}: {
  className?: string
  children: React.ReactNode[]
  defaultState?: boolean
  triggerClass?: string
  contentClass?: string
  arrowClass?: string
  handleTrigger?: () => void
  handleOpen?: () => void
  thread?: Thread | null
}) => {
  const { activeThread, setActiveThread, setIsNewResponse, isNewResponse } =
    useThread()
  const [open, setOpen] = React.useState(defaultState)
  const toggle = () => {
    if (!open && handleOpen) {
      handleOpen()
    }
    if (!open && thread?.threadId) {
      setActiveThread(thread)
    } else if (thread?.threadId) {
      setActiveThread(null)
    }
    setOpen(!open)
    if (isNewResponse) setIsNewResponse(false)
  }
  React.useEffect(() => {
    if (
      thread?.threadId &&
      activeThread !== null &&
      thread?.threadId !== activeThread?.threadId
    ) {
      setOpen(false)
    }
  }, [activeThread, thread])

  return (
    <div className={cn('border-b', className)} {...props}>
      <button
        onClick={toggle}
        className={`flex flex-1 justify-start flex-col relative
        dark:border-mirage border-gray-300
        font-medium w-full ${
          open
            ? 'border-b-[1px]'
            : 'hover:border-b-[1px] [&>div>div>button]:!hidden'
        } ${triggerClass || ''}`}
      >
        {children[0]}
        {!open && children[1]}
        <ChevronDown
          {...(handleTrigger
            ? {
                onClick: e => {
                  e.stopPropagation()
                  handleTrigger()
                }
              }
            : {})}
          className={`${open ? '' : '-rotate-90'} absolute -right-2 h-4 w-4 shrink-0 mr-4 transition-transform duration-200 ${arrowClass || ''}`}
        />
      </button>
      <div
        className={`text-sm transition-all
      ${
        open
          ? 'animate-accordion-down pb-4 border-[1px] border-t-0 border-r-0 dark:border-mirage border-gray-300'
          : 'overflow-hidden animate-accordion-up h-0'
      } ${contentClass || ''}`}
      >
        {children[2]}
      </div>
    </div>
  )
}
