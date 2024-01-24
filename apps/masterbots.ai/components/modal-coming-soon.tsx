'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'
import { IconClose } from './ui/icons'

export interface ModalComingSoonProps extends React.ComponentProps<'div'> {
  isOpen: boolean
  onClose: () => void
}

export function ModalComingSoon({ className, children, isOpen, onClose }: ModalComingSoonProps) {


  return (
    <div
      className={`h-screen w-screen dark:bg-gray z-[51] bg-none fixed top-0 left-0 ease-in-out duration-1000 transition-all ${isOpen ? '' : 'hidden'}`}
    >
      <div className='h-full w-full relative' onClick={onClose} />
      <div 
        className={cn(className,
          `bg-zinc-300 flex flex-col dark:bg-zinc-600 z-[10] rounded-lg duration-1000 ease-in-out
          absolute min-h-[200px] min-w-[300px] z-1 top-[35vh] left-[50%] translate-x-[-50%] translate-y-[-50%]
          transition-opacity ${isOpen ? 'opacity-1' : 'opacity-0'}`)}
      >
        <div
          className='h-[50px] relative border-b-[1px]'
        >
          <button className='absolute right-0 top-[50%] translate-y-[-50%] px-[1rem]' onClick={onClose}><IconClose /></button>
        </div>
        <div className='flex justify-center items-center grow'>
          Coming Soon!
        </div>
      </div>
    </div>
  )
}
