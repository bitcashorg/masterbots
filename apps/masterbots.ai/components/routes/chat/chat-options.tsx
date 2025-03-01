import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { IconSpinner } from '@/components/ui/icons'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import { useSonner } from '@/lib/hooks/useSonner'
import { cn } from '@/lib/utils'
import { Eye, EyeOff, MoreVertical, Trash } from 'lucide-react'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import type React from 'react'
import { useState } from 'react'
import { ShareButton } from './share-button'

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
  const url = `/b/${toSlug(thread.chatbot.name)}/${thread.threadId}`
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { customSonner } = useSonner()

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setIsDeleting(true)
    const result = await initiateDeleteThread(threadId)
    if (result?.success) {
      customSonner({ type: 'success', text: result.message })
    } else {
      customSonner({ type: 'error', text: result?.error })
    }
    setIsDeleting(false)
    setIsDeleteOpen(false)
  }

  const AlertDialogue = ({
    deleteDialogOpen
  }: {
    deleteDialogOpen: boolean
  }) => (
    <AlertDialog open={deleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your thread and remove your data from
            our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={e => {
              e.stopPropagation()
              setIsDeleteOpen(false)
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={e => {
              e.stopPropagation()
              handleDelete(e)
            }}
            className={cn(buttonVariants({ variant: 'destructive' }))}
          >
            {isDeleting && <IconSpinner className="w-4 h-4 animate-spin" />}
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return (
    <div className="flex items-center gap-4 sm:gap-3 pt-[3px]">
      <AlertDialogue deleteDialogOpen={isDeleteOpen} />

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({
              variant: 'ghost',
              size: 'icon',
              radius: 'full',
            }),
            'p-1',
          )}
        >
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="end" className="w-[160px] sm:w-[180px] px-0">
          {/* Toggle thread visibility option (only for thread owner) */}
          {isUser && (
            <DropdownMenuItem
              className="flex-col items-start"
              onSelect={(event) => event.preventDefault()}
            >
              <Button
                onClick={async (e) => {
                  e.stopPropagation()
                  try {
                    await toggleVisibility(!thread?.isPublic, threadId)
                    thread.isPublic = !thread?.isPublic
                  } catch (error) {
                    console.error('Failed to update thread visibility:', error)
                  }
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
            onSelect={(event) => event.preventDefault()}
          >
            <ShareButton url={url} />
          </DropdownMenuItem>
          {/* Delete thread option (only for thread owner) */}
          {isUser && (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs" onSelect={(event) => event.preventDefault()}>
                <Button
                  variant={'ghost'}
                  size={'sm'}
                  className="flex justify-between w-full text-red-400"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsDeleteOpen(true)
                  }}
                >
                  <Trash className="w-4 h-4" />
                  <span>Delete</span>
                </Button>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
