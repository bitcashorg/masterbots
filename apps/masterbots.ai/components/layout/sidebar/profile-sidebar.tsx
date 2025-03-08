'use client'

import { ThemeToggle } from '@/components/shared/theme-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { LogOut } from 'lucide-react'
import { appConfig } from 'mb-env'
import { toSlugWithUnderScore } from 'mb-lib'
import type { Session } from 'next-auth'
import { signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

interface ProfileSidebarProps {
  user: Session['user'] & {
    hasuraJwt?: string
  }
}

function getUserInitials(name: string) {
  const [firstName, lastName] = name.split(' ')
  return lastName ? `${firstName[0]}${lastName[0]}` : firstName.slice(0, 2)
}

export function ProfileSidebar({ user }: ProfileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleNavigation = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  const handleLogout = useCallback(async () => {
    try {
      setIsOpen(false)
      await new Promise(resolve => setTimeout(resolve, 100))
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Logout error:', error)
      window.location.href = '/'
    }
  }, [])

  const goToProfile = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      const userSlug = toSlugWithUnderScore(user.name || '')
      if (userSlug) {
        setIsOpen(false)
        router.push(`/u/${userSlug}/t`)
      }
    },
    [router, user.name]
  )

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className={cn(buttonVariants({ variant: 'ghost', radius: 'full' }), 'block h-full p-2 rounded-full md:hidden')}>
        {user?.image ? (
          <Image
            className="transition-opacity duration-300 rounded-full select-none size-8 bg-foreground/10 ring-1 ring-zinc-100/10 hover:opacity-80"
            src={user?.image ? user.image : ''}
            alt={user.name ?? 'Avatar'}
            height={32}
            width={32}
            priority
          />
        ) : (
          <div className="flex items-center justify-center text-xs font-medium uppercase rounded-full select-none size-7 shrink-0 bg-muted/50 text-muted-foreground">
            {user?.name ? getUserInitials(user?.name) : null}
          </div>
        )}
        <span className="sr-only">{user?.name}</span>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px] p-0">
        <div className="flex flex-col h-full">
          {/* Profile Header */}
          <div className="p-4 border-b">
            <Button
              onClick={goToProfile}
              variant="sideBarProfile"
              size="sideBarProfile"
            >
              {user?.image ? (
                <Image
                  className="rounded-full size-10"
                  src={user.image}
                  alt={user.name ?? 'Avatar'}
                  height={40}
                  width={40}
                  priority
                />
              ) : (
                <div className="flex justify-center text-sm font-medium uppercase rounded-full size-10 bg-muted/50">
                  {user?.name ? getUserInitials(user?.name) : null}
                </div>
              )}
              <div className="space-y-1">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </Button>
          </div>

          {/* Navigation Links - Only visible on mobile */}
          <nav className="flex flex-col p-4 lg:hidden">
            <Button
              variant="ghost"
              className="justify-start w-full text-sm"
              onClick={() => handleNavigation('/c')}
            >
              Chat
            </Button>

            <Button
              variant="ghost"
              className="justify-start w-full text-sm"
              onClick={() => handleNavigation('/')}
            >
              Public
            </Button>

            {appConfig.features.devMode && (
              <>
                <Button
                  variant="ghost"
                  className="justify-start w-full text-sm"
                  onClick={() => handleNavigation('/c/p')}
                >
                  Pro
                </Button>
                <Button
                  variant="ghost"
                  className="justify-start w-full text-sm"
                  onClick={() => handleNavigation('/wordware')}
                >
                  Ww
                </Button>
              </>
            )}
          </nav>

          {/* Logout Button */}
          <div className="flex items-center justify-between p-4 mt-auto border-t">
            <Button
              variant="ghost"
              className="justify-start text-sm"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 size-4" />
              Log Out
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
