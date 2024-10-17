import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
  } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff, MoreVertical, Share2, Trash, Verified } from 'lucide-react'
import { useThreadVisibility } from '@/lib/hooks/use-thread-visibility';
import React,{  useEffect } from 'react';

interface ChatOptionsProps {
    threadId: string;
    thread: any
}

export function ChatOptions({  threadId, thread }: ChatOptionsProps)  {
    const { isPublic, isApproved, toggleVisibility, fetchThreadById} = useThreadVisibility();
    // fetchThreadById(threadId);

    // useEffect(() => { 
    //     fetchThreadById(threadId);
    // } , [threadId])

    console.log({ thread })

    return(
        <div className='flex  items-center space-x-3 pt-[3px]'>
            <div className='flex  items-center space-x-3'>
                 <div>
                    { 
                        thread?.isApproved ? (
                            <Verified className='w-4 h-4 bg-[#388DE2]  text-white rounded-full' />
                        ) : (
                            <Verified className='w-4 h-4 text-gray-400' />
                        )
                    }
                 </div>
                 <div className='bg-gray-200 rounded-full px-2 '>
                    <span className='text-xs'>{ thread?.isPublic ? 'Public' : 'Private' }</span>
                 </div> 
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <MoreVertical className='w-4 h-4' />
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={8} align="end" className="w-[180px] px-0">
                    <DropdownMenuItem className="flex-col items-start" onSelect={(event) => event.preventDefault()}>
                    <Button
                        onClick={(e) => {
                        e.stopPropagation();
                        toggleVisibility(!thread?.isPublic, threadId);
                        }}
                        variant={'ghost'}
                        size={'sm'}
                        className='flex justify-between w-full'
                    >
                        {thread?.isPublic ? (
                        <>
                            <EyeOff className='w-4 h-4' />
                            <span className='font-light'>Make private</span>
                        </>
                        ) : (
                        <>
                            <Eye className='w-4 h-4' />
                            <span>Make public</span>
                        </>
                        )}
                    </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex-col items-start" onSelect={(event) => event.preventDefault()}>
                    <Button
                        type='button'
                        variant={'ghost'}
                        size={'sm'}
                        className='flex justify-between w-full'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Share2 className='w-4 h-4' />
                        <span>Share</span>
                    </Button>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-xs" onSelect={(event) => event.preventDefault()}>
                    <Button
                        variant={'ghost'}
                        size={'sm'}
                        className='text-red-400 flex justify-between w-full'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Trash className='w-4 h-4' />
                        <span>Delete</span>
                    </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
             </DropdownMenu>
        </div>
    )
}