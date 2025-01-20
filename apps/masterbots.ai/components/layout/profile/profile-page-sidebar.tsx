'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocation } from 'react-use';
import { cn } from '@/lib/utils'
import { IconCaretRight } from '@/components/ui/icons';
import { MessagesSquare, Settings, ReceiptIcon } from 'lucide-react';
import { SidebarCategoryGeneral } from '../sidebar/sidebar-category-general';
import { useParams, usePathname } from 'next/navigation';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import { useProfile } from '@/lib/hooks/use-profile';
import { useSession } from 'next-auth/react';
import { useAsync  } from 'react-use'
import { urlBuilders } from '@/lib/url';

export const ProfileSidebar = ({ children }: any) => {
  const pathname = usePathname()
  const openSidebar = pathname.includes('/t');
  const [isThreadsOpen, setIsThreadsOpen] = useState(openSidebar);
  const location = useLocation();
  const { slug } = useParams()
  const { isSidebarOpen,  toggleSidebar, setActiveCategory,
    setActiveChatbot, } = useSidebar();
  const { currentUser, isSameUser } = useProfile()
  const { data: session } = useSession()
  const { value: user } = useAsync(async () => {
    if (currentUser === null) return null;
    return currentUser;
  }, [slug, currentUser]);

  const userSlug = slug as string
  const sameUser = isSameUser(user?.userId)

  const handleToggleThreads = () => {
    setIsThreadsOpen(!isThreadsOpen);
    setActiveCategory(null);
    setActiveChatbot(null);
  }

  return (
    <div className="relative h-screen w-full">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
           onClick={() => toggleSidebar()}
           role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              toggleSidebar();
            }
          }}
        />
      )}

      <div className="flex h-full  ">
        {/* Sidebar */}
        <div 
            className={cn(
              "fixed lg:relative z-40 h-screen top-10 md:top-0 transition-transform duration-300 ease-in-out",
              "w-64 bg-gray-50 dark:bg-black border-r",
              "lg:transform-none lg:transition-none",
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            )}
        >
          <nav className="flex-1   overflow-y-auto scrollbar">
            <div className="flex flex-col space-y-1 mt-4 md:mt-0 font-Geist">
              {/* Threads Accordion */}
              <div className="rounded-lg">
                <Link
                  href={urlBuilders.userProfileUrl({ userSlug })}
                  onClick={handleToggleThreads}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3",
                    "hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200",
                    isThreadsOpen || location.pathname?.includes('/t/') ? 'bg-gray-200 dark:bg-mirage' : ''
                  )}
                  role="button"
                  aria-expanded={isThreadsOpen}
                  aria-controls="threads-panel"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === 'Space') {
                      handleToggleThreads();
                    }
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <MessagesSquare className="w-5 h-5" />
                    <span className='font-normal'>Threads</span>
                  </div>
                  <IconCaretRight
                    className={cn(
                      'transition-transform duration-300 stroke-[#09090b] dark:stroke-[#FAFAFA]',
                      isThreadsOpen ? 'rotate-90' : 'rotate-0'
                    )}
                  />
                </Link>
                <div
                  className={cn(
                    "overflow-y-auto scrollbar  transition-all duration-300",
                    isThreadsOpen ? "max-h-[300px]   border dark:border-b-mirate border-b-gray-200" : "max-h-0"
                  )}
                >
                    <SidebarCategoryGeneral page="profile" />
                </div>
              </div>
            {
              sameUser && session?.user.hasuraJwt && (
                <>
                  {/* Preferences Link */}
                  <Link
                        href={`/u/${slug}/s/pref`}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-3",
                          "hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200",
                          location.pathname?.includes('/s/pref') ? 'bg-gray-200 dark:bg-mirage' : ''
                        )}
                      >
                        <Settings className="w-5 h-5" />
                        <span>Preferences</span>
                      </Link>

                      <Link
                        href={`/u/${slug}/s/subs`}
                        className={cn(
                          "flex items-center space-x-2 px-4 py-3",
                          "hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200",
                          location.pathname?.includes('/s/subs') ? 'bg-gray-200 dark:bg-mirage' : ''
                        )}
                      >
                        <ReceiptIcon className="w-5 h-5" />
                        <span>Subscriptions</span>
                      </Link>
                </>
              )
            }
           
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 w-full overflow-auto" id="threads-panel">
          <main className="h-full w-full">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};