import { ThreadDialog } from './thread-dialog'
import { ThreadListAccordion } from './thread-list-accordion'
import { ThreadListChatItem } from './thread-list-chat-item'
import { FilteredThreads } from '@/app/actions'

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
          // <div>{thread.messages[0]?.content}</div>
          <ThreadComponent
            chat={chat}
            defaultOpen={false} // we can have one open by default
            key={thread.threadId}
            thread={thread}
          />
        ))
      )}
    </div>
  )
}

interface ThreadListProps {
  initialThreads: FilteredThreads
  chat?: boolean
  dialog?: boolean
}
