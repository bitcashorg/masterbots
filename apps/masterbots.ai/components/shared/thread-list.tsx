import { MB } from '@repo/supabase'
import { ThreadDialog } from './thread-dialog'
import { ThreadListAccordion } from './thread-list-accordion'
import { ThreadListChatItem } from './thread-list-chat-item'
import { ThreadListReload } from './thread-list-reload'

export function ThreadList({
  initialThreads,
  chat = false,
  dialog = false
}: ThreadListProps) {
  // ThreadList can displays the rigth list item based on the context
  // ThreadListChatItem is next shallow link for chat ui lists
  // ThreadDialog is user preference
  // ThreadListAccordion is the defualt public list item
  const ThreadComponent = chat
    ? ThreadListChatItem
    : dialog
      ? ThreadDialog
      : ThreadListAccordion

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      {!initialThreads.length ? (
        <div>No threads founds</div>
      ) : (
        initialThreads.map(thread => (
          <ThreadComponent
            chat={chat}
            defaultOpen={false} // we can have one open by default
            key={thread.threadId}
            thread={thread}
          />
        ))
      )}
      <ThreadListReload />
    </div>
  )
}

interface ThreadListProps {
  initialThreads: MB.ThreadFull[]
  chat?: boolean
  dialog?: boolean
}
