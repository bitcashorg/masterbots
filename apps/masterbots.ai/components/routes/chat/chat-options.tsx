import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Eye,
  EyeOff,
  MoreVertical,
  Trash,
  BadgeCheck
} from 'lucide-react'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility'
import type React from 'react'
import { useState } from 'react'
import type { Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'
import { ShareButton } from './share-button'
import { AlertDialogFooter, AlertDialogHeader , AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { IconSpinner } from '@/components/ui/icons'
import toast from 'react-hot-toast';

interface ChatOptionsProps {
  threadId: string
  thread: Thread
  isBrowse: boolean
}

export function ChatOptions({ threadId, thread, isBrowse }: ChatOptionsProps) {
  const { toggleVisibility, isSameUser, initiateDeleteThread} = useThreadVisibility()
  const isUser = isSameUser(thread)
  const url = `/${toSlug(thread.chatbot.categories[0].category.name)}/${thread.threadId}`
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  
  // Handle thread deletion with loading state and toast notifications
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
     setIsDeleting(true);
       const result =  await initiateDeleteThread(threadId);
       if(result?.success){
        toast.success(result.message)
       }else{
        toast.error(result?.message);
       }
     setIsDeleting(false);
     setIsDeleteOpen(false)
     
     };

// Confirmation dialog component for thread deletion
const AlertDialogue = ({ deleteDialogOpen} :{ deleteDialogOpen: boolean}) => (
  <AlertDialog open={deleteDialogOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This will permanently delete your thread  and remove your
        data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={(e) => {
         e.stopPropagation()
        setIsDeleteOpen(false)
      }} >
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction
      onClick={(e) => {
        e.stopPropagation()
        handleDelete(e)
      }}
      >
       {
        isDeleting && <IconSpinner className="w-4 h-4 animate-spin" />
       }
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
)
  return (
    <div className="flex  items-center space-x-3 pt-[3px]">
      <AlertDialogue  deleteDialogOpen={isDeleteOpen}  />
        {/* Display approval badge and public/private status */}
        {
            !isBrowse && (
                <div className="flex items-center space-x-3">
                <div>
                  {thread?.isApproved ? (
                    <BadgeCheck className="w-4 h-4 bg-[#388DE2]  text-white rounded-full" />
                  ) : (
                    <BadgeCheck className="w-4 h-4 text-gray-400 dark:text-gray-100 " />
                  )}
                </div>
                <div className="px-2 bg-gray-200 rounded-full dark:bg-gray-400 dark:text-gray-100 ">
                  <span className="text-xs">
                    {thread?.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            )
        }
    
      {/* Dropdown menu for thread actions */}
      <DropdownMenu>
        <DropdownMenuTrigger  asChild>
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={8}
          align="end"
          className="w-[180px] px-0"
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
           <ShareButton  url={url} />
           {/* <ShareLink /> */}
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
