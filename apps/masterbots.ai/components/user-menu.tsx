'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { User } from '@supabase/auth-js'
import { useSupabaseClient } from '@/services/supabase'
import { useGlobalStore } from '@/hooks/use-global-store'

export function UserMenu() {
  const supabase = useSupabaseClient()
  const { user } = useGlobalStore()

  const signout = () => supabase.auth.signOut()

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0">
            {/* {user.image ? (
              <Image
                className="transition-opacity duration-300 rounded-full select-none size-6 ring-1 ring-zinc-100/10 hover:opacity-80"
                src={user?.image ? user.image : ''}
                alt={user.name ?? 'Avatar'}
                height={48}
                width={48}
              />
            ) : ( 
             <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
            {user?.name ? getUserInitials(user?.name) : null} 
            </div> */}

            <span className="ml-2"> {user?.email}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">name</div>
            <div className="text-xs text-zinc-500">email</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signout} className="text-xs">
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}
export interface UserMenuProps {
  user: User
}
