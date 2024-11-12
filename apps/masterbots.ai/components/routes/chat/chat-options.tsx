import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { BadgeCheck, Eye, EyeOff, MoreVertical, Trash } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import type React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { ShareButton } from './share-button'
import { AlertDialogue } from '@/components/shared/alert-dialogue'

interface ChatOptionsProps {
  threadId: string
  thread: Thread
  isBrowse: boolean
}

export function ChatOptions({ threadId, thread, isBrowse }: ChatOptionsProps) {
  const { toggleVisibility, isSameUser, initiateDeleteThread } =
    useThreadVisibility()
  const isUser = isSameUser(thread)
  const title = thread?.messages[0]?.content ?? 'Untitled'
  const text =
    thread?.messages[1]?.content.substring(0, 100) ?? 'No description found...'
  const url = `/${toSlug(thread.chatbot.categories[0].category.name)}/${thread.threadId}`
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsDeleting(true)
    const result = await initiateDeleteThread(threadId)
    if (result?.success) {
      toast.success(result.message)
    } else {
      toast.error(result?.message)
    }
    setIsDeleting(false)
    setIsDeleteOpen(false)
  }

  return (
    <div className="flex items-center gap-1 sm:gap-3 pt-[3px]">
      <AlertDialogue title="Are you absolutely sure?" description="This will permanently delete your thread and remove your data from our servers." deleteDialogOpen={isDeleteOpen} isDeleting={isDeleting} setIsDeleteOpen={setIsDeleteOpen} handleDelete={handleDelete} />
      {!isBrowse && (
        <div className="flex items-center gap-1 sm:gap-3">
          <div>
            {thread?.isApproved ? (
              <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#388DE2] text-white rounded-full" />
            ) : (
              <BadgeCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            )}
          </div>
          <div className="px-1.5 sm:px-2 py-0.5 bg-gray-200 rounded-full dark:bg-gray-700">
            <span className="text-[10px] sm:text-xs whitespace-nowrap">
              {thread?.isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 p-0 sm:h-8 sm:w-8"
          >
            <MoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={8}
          align="end"
          className="w-[160px] sm:w-[180px] px-0"
        >
          {/* Toggle thread visibility option (only for thread owner) */}
          {isUser && (
            <DropdownMenuItem
              className="flex-col items-start"
              onSelect={event => event.preventDefault()}
            >
              <Button
                onClick={e => {
                  e.stopPropagation()
                  toggleVisibility(!thread?.isPublic, threadId)
                }}
                variant={'ghost'}
                size={'sm'}
                className="flex justify-between w-full"
              >
                {thread?.isPublic ? (
                  <>
                    <EyeOff className="w-4 h-4" />
                    <span className="font-light">Make private</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-4 h-4" />
                    <span>Make public</span>
                  </>
                )}
              </Button>
            </DropdownMenuItem>
          )}
          {/* Share thread option */}
          <DropdownMenuItem
            className="flex-col items-start"
            onSelect={event => event.preventDefault()}
          >
            <ShareButton url={url} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Delete thread option (only for thread owner) */}
          {isUser && (
            <DropdownMenuItem
              className="text-xs"
              onSelect={event => event.preventDefault()}
            >
              <Button
                variant={'ghost'}
                size={'sm'}
                className="flex justify-between w-full text-red-400"
                onClick={e => {
                  e.stopPropagation()
                  setIsDeleteOpen(true)
                }}
              >
                <Trash className="w-4 h-4" />
                <span>Delete</span>
              </Button>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
