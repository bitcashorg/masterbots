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
  triggerClass,
  contentClass,
  arrowClass,
  handleTrigger,
  ...props
}: {
  className?: string
  children: React.ReactNode[]
  triggerClass?: string
  contentClass?: string
  onToggle?: (isOpen: boolean) => void
  isOpen?: boolean
  arrowClass?: string
  handleTrigger?: () => void
  thread?: Thread | null
}) => {
  const { activeThread, setActiveThread, setIsNewResponse, isNewResponse } =
    useThread()

  React.useEffect(() => {
    if (
      (thread?.threadId &&
        activeThread !== null &&
        thread?.threadId !== activeThread?.threadId) ||
      (activeThread === null && thread?.threadId)
    ) {
      setActiveThread(thread)
      console.log('Setting activeThread based on thread prop')
    }
  }, [activeThread, setActiveThread, thread])

  const toggle = () => {
    const newState = !isOpen
    console.log('Accordion toggle called, isOpen before toggle:', isOpen)
    if (onToggle) {
      console.log('Accordion toggle called, inside toggle:', isOpen)
      onToggle(!isOpen)
    }
    if (thread?.threadId) {
      setActiveThread(newState ? thread : null)
      console.log('Setting activeThread based on new state')
    }
    if (isNewResponse) {
      setIsNewResponse(false)
      console.log('Setting isNewResponse to false')
    }
  }

  return (
    <div className={className || ''} {...props}>
      <button
        data-state={isOpen ? 'open' : 'closed'}
        onClick={toggle}
        className={`flex flex-1 justify-start flex-col relative
        transition-all ease-in-out duration-200
        border-[transparent] border
        hover:rounded-t-[8px]
        font-medium w-full ${
          isOpen
            ? 'dark:border-b-mirage border-b-gray-300'
            : 'dark:hover:border-b-mirage hover:border-b-gray-300 [&>div>div>button]:!hidden'
        } ${triggerClass || ''}`}
      >
        {children[0]}
        {!isOpen && children[1]}
        <ChevronDown
          {...(handleTrigger
            ? {
                onClick: e => {
                  e.stopPropagation()
                  handleTrigger()
                }
              }
            : {})}
          className={`${isOpen ? '' : '-rotate-90'} absolute -right-2 size-4 shrink-0 mr-4 transition-transform duration-200 ${arrowClass || ''}`}
        />
      </button>
      <div
        className={`text-sm transition-all border ${
          isOpen
            ? 'animate-accordion-down dark:border-mirage border-gray-300 !border-t-[transparent] !border-r-[transparent]'
            : 'overflow-hidden animate-accordion-up h-0 border-[transparent]'
        } ${contentClass || ''}`}
      >
        {children[2]}
      </div>
    </div>
  )
}
