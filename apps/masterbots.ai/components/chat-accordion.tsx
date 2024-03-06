'use client'

import { ChevronDown } from 'lucide-react'
import * as React from 'react'
import { useThread } from '@/lib/hooks/use-thread'
import { Thread } from 'mb-genql'

export const ChatAccordion = ({
  thread = null,
  className,
  children,
  onToggle,
  isOpen,
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
  onToggle?: (isOpen: boolean) => void
  isOpen?: boolean
  arrowClass?: string
  handleTrigger?: () => void
  handleOpen?: () => void
  thread?: Thread | null
}) => {
  const { activeThread, setActiveThread, setIsNewResponse, isNewResponse } =
    useThread()
  const [open, setOpen] = React.useState(defaultState)

  React.useEffect(() => {
    if (
      (thread?.threadId &&
        activeThread !== null &&
        thread?.threadId !== activeThread?.threadId) ||
      (activeThread === null && thread?.threadId)
    ) {
      setOpen(false)
    }
  }, [activeThread, thread])

  React.useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen)
    }
  }, [isOpen])

  const toggle = () => {
    const newState = !open
    setOpen(newState)
    if (onToggle) {
      onToggle(newState)
    }
    if (!newState && handleOpen) {
      handleOpen()
    }
    if (thread?.threadId) {
      setActiveThread(newState ? thread : null)
    }
    if (isNewResponse) setIsNewResponse(false)
  }

  return (
    <div className={className || ''} {...props}>
      <button
        data-state={open ? 'open' : 'closed'}
        onClick={toggle}
        className={`flex flex-1 justify-start flex-col relative
        transition-all ease-in-out duration-200
        border-[transparent] border
        hover:rounded-t-[8px]
        font-medium w-full ${
          open
            ? 'dark:border-b-mirage border-b-gray-300'
            : 'dark:hover:border-b-mirage hover:border-b-gray-300 [&>div>div>button]:!hidden'
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
          className={`${open ? '' : '-rotate-90'} absolute -right-2 size-4 shrink-0 mr-4 transition-transform duration-200 ${arrowClass || ''}`}
        />
      </button>
      <div
        className={`text-sm transition-all border
      ${
        open
          ? 'animate-accordion-down dark:border-mirage border-gray-300 !border-t-[transparent] !border-r-[transparent]'
          : 'overflow-hidden animate-accordion-up h-0 border-[transparent]'
      } ${contentClass || ''}`}
      >
        {children[2]}
      </div>
    </div>
  )
}
