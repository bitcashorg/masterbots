import { Thread } from '@repo/mb-genql'
import { ShortMessage } from './thread-short-message'
import { AccountAvatar } from './account-avatar'
import { cn } from '@/lib/utils'
import Shortlink from './copy-shortlink'

export function ThreadHeading({
  thread,
  response,
  question,
  copy = false,
  chat = false
}: ThreadHeadingProps) {
  return (
    <div
      className={cn(
        `flex flex-col font-medium w-full dark:hover:border-b-mirage`
      )}
    >
      <div
        className={cn(
          'flex items-center font-normal md:text-lg transition-all w-full gap-3 pr-4 justify-between'
        )}
      >
        <div className="flex grow gap-3">
          <AccountAvatar
            alt={thread.chatbot.name}
            src={thread.chatbot.avatar}
            href={`/${chat ? 'c' : 'b'}/${thread.chatbot.name.toLowerCase()}`}
          />

          <div
            className={cn(
              'w-[calc(100%-64px)] m:w-[calc(100%-28px)] flex items-center gap-3 text-left'
            )}
          >
            {question}
            {!chat ? (
              <>
                <span className="opacity-50 text-[0.875rem]">by</span>
                <AccountAvatar
                  alt={thread.user.username.replace('_', ' ')}
                  src={thread.user.profilePicture || ''}
                  href={`/u/${thread.user.slug}`}
                />
              </>
            ) : null}
          </div>
        </div>
        {copy ? <Shortlink /> : null}
      </div>

      {response ? (
        <div className="overflow-hidden text-sm text-left opacity-50 flex-1 space-y-2 mt-3 mx-10">
          <ShortMessage content={response} />
        </div>
      ) : null}
    </div>
  )
}

interface ThreadHeadingProps {
  thread: Thread
  response?: string
  question: string
  copy?: boolean
  chat?: boolean
}
