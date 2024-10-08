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
  disabled = false,
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
  disabled?: boolean
}) => {
  const { activeThread, setActiveThread, setIsNewResponse, isNewResponse, isOpenPopup } =
    useThread()

  // If the thread is the active, we keep the thread open
  let initialState

  if (defaultState) {
    initialState = defaultState
  } else {
    const { threadId: activeThreadId } = activeThread || {}
    const { threadId } = thread || {}
    initialState = activeThreadId && threadId === activeThreadId
  }

  const [open, setOpen] = React.useState(initialState)

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

  const toggle = React.useCallback(() => {
    setOpen((prevOpen: any) => {
      const newState = !prevOpen
      if (!newState && handleOpen) {
        handleOpen()
      }
      if (thread?.threadId) {
        setActiveThread(newState ? thread : null)
      }
      if (isNewResponse) setIsNewResponse(false)
      if (onToggle) {
        onToggle(newState)
      }
      return newState
    })
  }, [handleOpen, thread, isNewResponse, setIsNewResponse, onToggle, setActiveThread])

  React.useEffect(() => {
    if (
      !isOpenPopup &&
      activeThread &&
      activeThread.threadId === thread?.threadId &&
      !open // ? This condition to prevent unnecessary toggles
    ) {
      toggle()
    }
  }, [isOpenPopup, activeThread, thread, open, toggle])

  return (
    <div className={className || ''} id={`thread-${thread?.threadId}`}  {...props}>
      {!disabled && (
          <button
            data-state={open ? 'open' : 'closed'}
            onClick={toggle}
            className={`flex flex-1 justify-start flex-col relative
          transition-all ease-in-out duration-200
          border-transparent border
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
              className={`${open ? '' : '-rotate-90'} absolute -right-2 size-4 shrink-0 mr-4 transition-transform duration-200 ${arrowClass || ''} ${disabled ? 'hidden' : ''}`}
            />
          </button>
      )}
      {open && (
        <div
          className={`text-sm transition-all border
          ${
            open
              ? 'animate-accordion-down dark:border-mirage border-gray-300 !border-t-transparent !border-r-transparent'
              : 'overflow-hidden animate-accordion-up h-0 border-transparent'
          } ${contentClass || ''}`}
        >
          {children[2]}
        </div>
      )}
    </div>
  )
}
