import { useThread } from '@/lib/hooks/use-thread'
import { ChevronDown } from 'lucide-react'
import type { Thread } from 'mb-genql'
import React from 'react'

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
  const {
    activeThread,
    setActiveThread,
    setIsNewResponse,
    setIsOpenPopup,
    isNewResponse,
    isOpenPopup
  } = useThread()

  const initialState = defaultState

  const [open, setOpen] = React.useState(initialState)

  // Determine if this is a main thread or sub-conversation
  const isMainThread = !isOpenPopup

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isMainThread && thread) {
      // Main thread click - open modal
      setActiveThread(thread)
      setIsOpenPopup(true)
    } else {
      // Sub-conversation click - toggle accordion
      toggle()
    }
  }

  const toggle = React.useCallback(() => {
    setOpen((prevOpen: boolean) => {
      const newState = !prevOpen
      if (!newState && handleOpen) {
        handleOpen()
      }
      if (thread?.threadId && !isMainThread) {
        setActiveThread(newState ? thread : null)
      }
      if (isNewResponse) setIsNewResponse(false)
      if (onToggle) {
        onToggle(newState)
      }
      return newState
    })
  }, [
    handleOpen,
    thread,
    isNewResponse,
    setIsNewResponse,
    onToggle,
    setActiveThread,
    isMainThread
  ])

  return (
    <div className={className} id={`thread-${thread?.threadId}`} {...props}>
      {!disabled && (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          data-state={open ? 'open' : 'closed'}
          onClick={handleClick}
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
