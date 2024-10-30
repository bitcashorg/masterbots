'use client'

import { type Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { appConfig } from 'mb-env'

export interface UserMenuProps {
  user: Session['user']
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function UserMenu({ user }: UserMenuProps) {
  return (
    <div className="flex items-center justify-between">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="pl-0 rounded-full">
            {user?.image ? (
              <Image
                className="transition-opacity duration-300 rounded-full select-none size-8 bg-foreground/10 ring-1 ring-zinc-100/10 hover:opacity-80"
                src={user?.image ? user.image : ''}
                alt={user.name ?? 'Avatar'}
                height={32}
                width={32}
              />
            ) : (
              <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
                {user?.name ? getUserInitials(user?.name) : null}
              </div>
            )}
            <span className="ml-2">{user?.name}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={8} align="start" className="w-[180px]">
          <DropdownMenuItem className="flex-col items-start">
            <div className="text-xs font-medium">{user?.name}</div>
            <div className="text-xs text-zinc-500">{user?.email}</div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          <div className="md:hidden">
            <DropdownMenuItem asChild>
              <Link href="/c" className="text-xs">Chat</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/" className="text-xs">Browse</Link>
            </DropdownMenuItem>
            
            {appConfig.devMode && (
              <>
                <DropdownMenuItem asChild>
                  <Link href="/c/p" className="text-xs">Pro</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wordware" className="text-xs">Wordware</Link>
                </DropdownMenuItem>
              </>
            )}
            <DropdownMenuSeparator />
          </div>

          <DropdownMenuItem
            onClick={() =>
              signOut({
                callbackUrl: '/'
              })
            }
            className="text-xs"
          >
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
