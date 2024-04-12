'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useSupabaseClient } from '@/services/supabase'
import type { UserProfile } from '@/hooks/use-global-store'
import { useGlobalStore } from '@/hooks/use-global-store'

export function UserMenu() {
  const supabase = useSupabaseClient()
  const { user } = useGlobalStore()
  const router = useRouter()

  const signout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('ERROR:', error)
    }
    router.push('/')
    router.refresh()
  }

  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="pl-0" variant="ghost">
            {user.image ? (
              <Image
                alt={user.name ?? 'Avatar'}
                className="transition-opacity duration-300 rounded-full select-none size-6 ring-1 ring-zinc-100/10 hover:opacity-80"
                height={48}
                src={user.image ? user.image : ''}
                width={48}
              />
            ) : (
              <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                {user.name ? getUserInitials(user.name) : null}
              </div>
            )}

            <span className="ml-2"> {user.username}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[180px]" sideOffset={8}>
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">name</div>
            <div className="text-xs text-zinc-500">email</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-xs" onClick={signout}>
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
  user: UserProfile
}
