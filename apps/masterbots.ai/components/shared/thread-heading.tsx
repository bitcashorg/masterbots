import { MB } from '@repo/supabase'
import { cn } from '@/lib/utils'
import { toSlug } from '@/lib/url-params'
import { ShortMessage } from './thread-short-message'
import { AccountAvatar } from './account-avatar'
import Shortlink from './copy-shortlink'

export function ThreadHeading({
  thread,
  response,
  question,
  copy = false,
  chat = false
}: ThreadHeadingProps) {
  return (
    <div className={cn(`flex flex-col font-medium w-full`)}>
      <div
        className={cn(
          'flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4 justify-between '
        )}
      >
        <div className="flex gap-3 grow">
          <AccountAvatar
            alt={thread.chatbot.name}
            href={`/${chat ? 'c' : 'b'}/${toSlug(thread.chatbot.name)}`}
            src={thread.chatbot.avatar}
          />

          <div
            className={cn(
              'w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex items-center gap-3 text-left'
            )}
          >
            {question}
            {chat ? null : (
              <>
                <span className="opacity-50 text-[0.875rem]">by</span>
                <AccountAvatar
                  alt={thread.account.username}
                  href={`/u/${thread.account.username}`}
                  src={thread.account.avatar}
                />
              </>
            )}
          </div>
        </div>
        {copy ? <Shortlink /> : null}
      </div>

      <ShortMessage content={response} />
    </div>
  )
}

interface ThreadHeadingProps {
  thread: MB.ThreadFull
  response?: string
  question: string
  copy?: boolean
  chat?: boolean
}