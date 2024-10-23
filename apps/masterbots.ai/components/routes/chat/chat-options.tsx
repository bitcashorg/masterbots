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
import React, { useState } from 'react'
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
  const title =  thread?.messages[0]?.content;
  const text = thread?.messages[1]?.content.substring(0, 100);
  const url = `/${toSlug(thread.chatbot.categories[0].category.name)}/${thread.threadId}`
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  


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
     
        Delete
        {isDeleting && <span>....</span>}
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
)
  return (
    <div className="flex  items-center space-x-3 pt-[3px]">
      <AlertDialogue  deleteDialogOpen={isDeleteOpen}  />
        {
            !isBrowse && (
                <div className="flex  items-center space-x-3">
                <div>
                  {thread?.isApproved ? (
                    <BadgeCheck className="w-4 h-4 bg-[#388DE2]  text-white rounded-full" />
                  ) : (
                    <BadgeCheck className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="bg-gray-200 rounded-full px-2 ">
                  <span className="text-xs">
                    {thread?.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            )
        }
    
      <DropdownMenu>
        <DropdownMenuTrigger  asChild>
          <MoreVertical className="w-4 h-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          sideOffset={8}
          align="end"
          className="w-[180px] px-0"
        >
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
          <DropdownMenuItem
            className="flex-col items-start"
            onSelect={event => event.preventDefault()}
          >
           <ShareButton title={title} text={text} url={url} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isUser && (
            <DropdownMenuItem
              className="text-xs"
              onSelect={event => event.preventDefault()}
            >
              <Button
                variant={'ghost'}
                size={'sm'}
                className="text-red-400 flex justify-between w-full"
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
