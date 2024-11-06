'use client'

//* ChatScrollAnchor tracks chat scroll position to auto-scroll to the bottom when new messages appear.

import * as React from 'react'
import { useInView } from 'react-intersection-observer'

interface ChatScrollAnchorProps {
  trackVisibility?: boolean  // Enables visibility tracking to trigger scroll into view
  isAtBottom: boolean  // Indicates if chat is scrolled to the bottom
}

// ChatScrollAnchor auto-scrolls to the anchor position when `isAtBottom` and `trackVisibility` are true.
export function ChatScrollAnchor({
  trackVisibility,
  isAtBottom
}: ChatScrollAnchorProps) {
  const { ref, entry, inView } = useInView({
    trackVisibility,
    delay: 100,
    rootMargin: '0px 0px -150px 0px'  // Trigger when near the bottom
  })

  React.useEffect(() => {
    if (isAtBottom && trackVisibility && !inView) {
      entry?.target.scrollIntoView({
        block: 'start'
      })
    }
  }, [inView, entry, isAtBottom, trackVisibility])

  return <div ref={ref} className="w-full h-px" />  // Invisible anchor for scroll tracking.
}