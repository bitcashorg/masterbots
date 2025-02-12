import { useThread } from '@/lib/hooks/use-thread'
import { urlBuilders } from '@/lib/url'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface SharedAccordionProps {
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
  variant?: 'browse' | 'chat'
  isNestedThread?: boolean
}

const toggleBodyScroll = (disable: boolean) => {
  if (typeof window === 'undefined') return
  document.body.style.overflow = disable ? 'hidden' : 'auto'
  document.body.style.position = disable ? 'fixed' : 'static'
  document.body.style.width = disable ? '100%' : 'auto'
}

export function SharedAccordion({
  className,
  children,
  defaultState = false,
  triggerClass,
  contentClass,
  onToggle,
  isOpen,
  arrowClass,
  handleTrigger,
  handleOpen,
  thread = null,
  disabled = false,
  variant = 'chat',
  isNestedThread = false,
  ...props
}: SharedAccordionProps) {
  const {
    activeThread,
    setActiveThread,
    setIsNewResponse,
    isNewResponse,
    setIsOpenPopup,
    isOpenPopup
  } = useThread()

  const pathname = usePathname()
  const params = useParams()
  const router = useRouter()
  const accordionRef = useRef<HTMLDivElement>(null)

  // State initialization
  const [open, setOpen] = useState(
    defaultState || activeThread?.threadId === thread?.threadId
  )

  // Check if another thread is open (for browse variant)
  const isAnotherThreadOpen =
    variant === 'browse' &&
    !isNestedThread &&
    activeThread !== null &&
    thread?.threadId !== activeThread?.threadId
  const shouldBeDisabled = disabled || isAnotherThreadOpen

  // Handle profile page routing
  const profilePage = /^\/u\/[^/]+\/t(?:\/|$)/.test(pathname)
  const isMainThread = !isOpenPopup

  // Mobile scroll handling
  useEffect(() => {
    if (variant === 'browse') {
      const isMobile = window.innerWidth < 640 // sm breakpoint
      toggleBodyScroll(isMobile && open && !isNestedThread)
      return () => toggleBodyScroll(false)
    }
  }, [open, isNestedThread, variant])

  // Handle active thread changes
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

  // Handle controlled state
  useEffect(() => {
    if (isOpen !== undefined) {
      setOpen(isOpen)
    }
  }, [isOpen])

  // Handle popup state changes
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

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (isMainThread && thread && !profilePage) {
      // Open modal for both variants
      setActiveThread(thread)
      setIsOpenPopup(true)
    } else if (profilePage) {
      // Profile page navigation
      setIsOpenPopup(false)
      setActiveThread(null)
      const category = thread?.chatbot?.categories[0]?.category?.name
      const chatbot = thread?.chatbot?.name
      const slug = params.slug

      if (!category || !chatbot || !slug) {
        console.error('Missing required navigation parameters')
        return
      }

      router.push(
        urlBuilders.threadUrl({
          slug: slug as string,
          category,
          chatbot,
          threadId: thread?.threadId
        })
      )
    } else {
      // Regular toggle
      toggle()
    }
  }

  const toggle = () => {
    if (shouldBeDisabled) return

    setOpen(prevOpen => {
      const newState = !prevOpen

      if (!newState && handleOpen) {
        handleOpen()
      }

      if (thread?.threadId) {
        setActiveThread(newState ? thread : null)
      }

      if (isNewResponse) {
        setIsNewResponse(false)
      }

      if (onToggle) {
        onToggle(newState)
      }

      // Scroll into view for browse variant
      if (
        variant === 'browse' &&
        newState &&
        !isNestedThread &&
        accordionRef.current
      ) {
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

  return (
    <div
      ref={accordionRef}
      className={cn(
        'relative transition-all duration-300',
        className,
        // Browse variant specific styles
        variant === 'browse' &&
        !isNestedThread &&
        (open
          ? 'z-[1] my-8 scale-100'
          : 'scale-[0.98] my-1 hover:scale-[0.99]'),
        variant === 'browse' &&
        !isNestedThread &&
        shouldBeDisabled &&
        'opacity-50 pointer-events-none grayscale cursor-not-allowed',
        variant === 'browse' && isNestedThread && 'my-2',
        variant === 'browse' &&
        !isNestedThread &&
        open &&
        'sm:relative fixed inset-0 sm:inset-auto'
      )}
      id={`thread-${thread?.threadId}`}
      {...props}
    >
      {/* Glow effects for browse variant
      {variant === 'browse' && !isNestedThread && open && (
        <>
          <div className="absolute inset-0 -m-4 rounded-xl blur-xl bg-gradient-to-r dark:from-[#83E56A]/10 dark:via-[#83E56A]/15 dark:to-[#83E56A]/10 from-[#BE17E8]/15 via-[#BE17E8]/20 to-[#BE17E8]/15 animate-pulse" />
          <div className="absolute inset-0 -m-1 rounded-xl opacity-50 bg-gradient-to-r dark:from-[#83E56A]/10 dark:to-[#83E56A]/15 from-[#BE17E8]/10 to-[#BE17E8]/15" />
          <div className="absolute inset-0 border rounded-xl dark:border-[#83E56A]/10 border-[#BE17E8]/10" />
        </>
      )} */}

      {/* Accordion trigger button */}
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        data-state={open ? 'open' : 'closed'}
        onClick={handleClick}
        disabled={shouldBeDisabled}
        className={cn(
          'flex flex-1 mt-2 justify-start flex-col relative',
          'transition-all ease-in-out duration-200',
          'border-transparent border font-medium w-full rounded-lg',
          // Base background color for all states
          'bg-gray-200/90 dark:bg-gray-800/90',
          // Closed state hover effect
          !open && 'hover:bg-gray-100 dark:hover:bg-gray-700',
          // Open state specific styles - maintain background color
          open && [
            'bg-gray-200/90 dark:bg-gray-800/90',
            'hover:bg-gray-100 dark:hover:bg-gray-700'
          ],
          !isNestedThread && 'hover:rounded-t-lg',
          !isNestedThread &&
          open &&
          'dark:border-b-mirage border-b-gray-300 shadow-lg transform-gpu backdrop-blur-sm',
          !isNestedThread &&
          !open &&
          'dark:hover:border-b-mirage hover:border-b-gray-300 [&>div>div>button]:!hidden',
          isNestedThread &&
          open &&
          'dark:bg-[#18181B]/50 bg-white/50 !hover:rounded-t-none',
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
            'absolute size-4 -right-4 shrink-0 mr-8 transition-transform duration-200',
            open ? '' : '-rotate-90',
            arrowClass,
            disabled && 'hidden'
          )}
        />

        {variant === 'browse' &&
          !isNestedThread &&
          shouldBeDisabled &&
          !open && (
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-lg backdrop-blur-[1px]" />
          )}
      </button>

      {/* Accordion content */}
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

      {variant === 'browse' && !isNestedThread && !open && (
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent opacity-30" />
      )}
    </div>
  )
}
