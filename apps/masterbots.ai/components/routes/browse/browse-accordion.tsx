/* eslint-disable tailwindcss/migration-from-tailwind-2 */
/**
 * BrowseAccordion Component
 *
 * This component implements an accordion UI element that can expand and collapse to show or hide content.
 * It is designed to handle threads in a chat application, allowing users to view messages related to a specific thread.
 *
 * Props:
 * - thread: The thread object associated with this accordion.
 * - className: Additional CSS classes for styling.
 * - children: React nodes to be rendered inside the accordion.
 * - onToggle: Callback function triggered when the accordion is toggled.
 * - isOpen: Controls the open state of the accordion.
 * - defaultState: Initial open state of the accordion.
 * - triggerClass: CSS classes for the trigger button.
 * - contentClass: CSS classes for the content area.
 * - arrowClass: CSS classes for the arrow icon.
 * - handleOpen: Callback for handling open state changes.
 * - handleTrigger: Callback for handling trigger actions.
 * - disabled: Disables the accordion if true.
 * - isNestedThread: Indicates if the accordion is part of a nested thread.
 *
 * Key Features:
 * - State Management: Uses local state to manage the open/closed state of the accordion.
 * - Thread Management: Integrates with a custom hook to manage active threads and responses.
 * - Accessibility: Implements ARIA attributes for better accessibility.
 * - Smooth Scrolling: Scrolls to the accordion when opened for better user experience.
 * - Dynamic Styling: Applies different styles based on the open state and whether the accordion is nested.
 * - Conditional Rendering: Renders different UI elements based on the state and props.
 */

import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { useEffect, useRef, useState } from 'react'

// Helper function to handle body scroll
const toggleBodyScroll = (disable: boolean) => {
  if (typeof window === 'undefined') return

  document.body.style.overflow = disable ? 'hidden' : 'auto'
  // Prevent iOS Safari bouncing
  document.body.style.position = disable ? 'fixed' : 'static'
  document.body.style.width = disable ? '100%' : 'auto'
}

export function BrowseAccordion({
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
  isNestedThread = false,
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
  isNestedThread?: boolean
}) {
  const {
    activeThread,
    setActiveThread,
    setIsNewResponse,
    isNewResponse,
    isOpenPopup
  } = useThread()
  const [open, setOpen] = useState(
    defaultState || activeThread?.threadId === thread?.threadId
  )
  const accordionRef = useRef<HTMLDivElement>(null)
  // TODO: Implement inViewport hook for thread visibility
  // const inViewport = useInView(accordionRef, {
  //   margin: '0px'
  // })
  // console.log('inViewport', inViewport)


  const isAnotherThreadOpen =
    !isNestedThread &&
    activeThread !== null &&
    thread?.threadId !== activeThread?.threadId
  const shouldBeDisabled = disabled || isAnotherThreadOpen

  //? Handle body scroll locking
  useEffect(() => {
    const isMobile = window.innerWidth < 640 // sm breakpoint

    toggleBodyScroll(isMobile && open && !isNestedThread)

    // Cleanup on unmount
    return () => toggleBodyScroll(false)
  }, [open, isNestedThread])

  // const checkViewport = () => {
  //   if (!inViewport && activeThread && open) {
  //     open && setOpen(false)
  //     setActiveThread(null)
  //   }
  // }

  // // biome-ignore lint/correctness/useExhaustiveDependencies: functions in array dep are not needed
  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     checkViewport()
  //     clearTimeout(timeout)
  //   }, 2000)
  // }, [inViewport])

  useEffect(() => {
    if (
      (thread?.threadId &&
        activeThread !== null &&
        thread?.threadId !== activeThread?.threadId) ||
      (activeThread === null && thread?.threadId)
    ) {
      setOpen(false)
    }
  }, [activeThread, thread])

  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen)
    }
  }, [isOpen])

  const toggle = () => {
    if (shouldBeDisabled) return

    setOpen((prevOpen: boolean) => {
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

      if (newState && !isNestedThread && accordionRef.current) {
        setTimeout(() => {
          accordionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }, 100)
      }

      return newState
    })
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: functions in array dep are not needed
  useEffect(() => {
    if (
      !isOpenPopup &&
      activeThread &&
      activeThread.threadId === thread?.threadId &&
      !open
    ) {
      toggle()
    }
  }, [isOpenPopup, activeThread, thread, open])

  return (
    <div
      ref={accordionRef}
      className={cn(
        'relative transition-all duration-300',
        className,
        !isNestedThread &&
        (open
          ? 'z-10 my-8 scale-100'
          : 'scale-[0.98] my-1 hover:scale-[0.99]'),
        !isNestedThread &&
        shouldBeDisabled &&
        !open &&
        'opacity-50 pointer-events-none filter grayscale',
        !isNestedThread && shouldBeDisabled && 'cursor-not-allowed',
        isNestedThread && 'my-2',
        //? mobile when open
        !isNestedThread && open && 'sm:relative fixed inset-0 sm:inset-auto'

      )}
      id={`thread-${thread?.threadId}`}
      {...props}
    >
      {!isNestedThread && open && (
        <>
          {/* Background glow effect */}
          <div className="absolute inset-0 -m-4 rounded-xl blur-xl bg-gradient-to-r dark:from-[#83E56A]/10 dark:via-[#83E56A]/15 dark:to-[#83E56A]/10 from-[#BE17E8]/15 via-[#BE17E8]/20 to-[#BE17E8]/15 animate-pulse" />
          {/* Additional subtle glow layer */}
          <div className="absolute inset-0 -m-1 rounded-xl opacity-50 bg-gradient-to-r dark:from-[#83E56A]/10 dark:to-[#83E56A]/15 from-[#BE17E8]/10 to-[#BE17E8]/15" />
          {/* Border glow */}
          <div className="absolute inset-0 border rounded-xl dark:border-[#83E56A]/10 border-[#BE17E8]/10" />
        </>
      )}

      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        data-state={open ? 'open' : 'closed'}
        onClick={toggle}
        disabled={shouldBeDisabled}
        className={cn(
          'flex flex-1 justify-start flex-col relative',
          'transition-all ease-in-out duration-200',
          'border-transparent border',
          'hover:rounded-t-[8px]',
          'font-medium w-full',
          !isNestedThread &&
          open &&
          'dark:border-b-mirage border-b-gray-300 dark:bg-[#18181B]/95 bg-white/95 rounded-t-lg shadow-lg transform-gpu backdrop-blur-sm',
          !isNestedThread &&
          !open &&
          'dark:hover:border-b-mirage hover:border-b-gray-300 [&>div>div>button]:!hidden',
          isNestedThread &&
          open &&
          'dark:bg-[#18181B]/50 bg-white/50 rounded-t-lg',
          shouldBeDisabled && !open && 'cursor-not-allowed hover:scale-100',
          triggerClass
        )}
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
          className={cn(
            'absolute -right-2 size-4 shrink-0 mr-4 transition-transform duration-200',
            open ? '' : '-rotate-90',
            arrowClass,
            disabled && 'hidden'
          )}
        />

        {!isNestedThread && shouldBeDisabled && !open && (
          <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-lg backdrop-blur-[1px]" />
        )}
      </button>

      <div
        className={cn(
          'text-sm transition-all border relative',
          !isNestedThread &&
          open &&
          'animate-accordion-down dark:bg-[#18181B]/95 bg-white/95 dark:border-b-mirage border-b-gray-300 !border-t-transparent last-of-type:rounded-b-lg shadow-lg backdrop-blur-sm',
          isNestedThread &&
          open &&
          'animate-accordion-down dark:bg-[#18181B]/50 bg-white/50 dark:border-b-mirage border-b-gray-300/10 !border-t-transparent last-of-type:rounded-b-lg',
          !open &&
          'overflow-hidden animate-accordion-up h-0 border-transparent',
          contentClass
        )}
      >
        {children[2]}
      </div>

      {!isNestedThread && !open && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent opacity-30" />
      )}
    </div>
  )
}
