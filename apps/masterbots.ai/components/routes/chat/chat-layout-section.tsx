'use client'

//* ChatLayoutSection component renders a chat layout with conditional popup and responsive styling.

import { ThreadPopup } from '@/components/routes/thread/thread-popup'
import { useThread } from '@/lib/hooks/use-thread'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import type * as React from 'react'
import { getThread } from '@/services/hasura'
import { useSession } from 'next-auth/react'

//* ChatLayoutSection provides the main chat area layout with optional thread popup and responsive styling.
export function ChatLayoutSection({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const { sectionRef, isOpenPopup, setIsOpenPopup, setActiveThread, setIsActiveThreadContinuous } = useThread()
  const searchParams = useSearchParams()
  const continuousThreadId = searchParams.get('continuousThreadId')

  // Get the continuousThread from the query param url
  const getContinuousThread = async () => {
    if (!session?.user) return
    if (!continuousThreadId) return

    try {
      const thread = await getThread({
        threadId: continuousThreadId,
        jwt: session!.user?.hasuraJwt,
      });

      setActiveThread(thread);
      setIsActiveThreadContinuous(true)
      setIsOpenPopup(true);
    } catch (error) {
      console.error('Error getting continuous thread from the query param:', error)
      throw error
    }
  }

  useEffect(() => {
    getContinuousThread();
  }, [session?.user])

  return (
    <section
      ref={sectionRef as React.Ref<HTMLDivElement>}
      className={cn(
        'flex h-[calc(100vh-4rem)] group w-full overflow-auto animate-in duration-300 ease-in-out relative',
        'lg:w-[calc(100%-250px)] xl:w-[calc(100%-300px)] lg:ml-[250px] xl:ml-[300px]',
        'scrollbar'
      )}
    >
      <div className="flex flex-col w-full max-w-screen-lg gap-10 px-4 pt-5 mx-auto max-h-screen-lg md:px-10">
        {children}
      </div>

      <ThreadPopup className={isOpenPopup ? '' : 'hidden'} />
    </section>
  )
}