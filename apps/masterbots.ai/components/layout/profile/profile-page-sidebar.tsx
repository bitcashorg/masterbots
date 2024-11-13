'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocation } from 'react-use';
import { cn } from '@/lib/utils'
import { IconCaretRight } from '@/components/ui/icons';
import { MessagesSquare, Settings, ReceiptIcon } from 'lucide-react';
import { SidebarCategoryGeneral } from '../sidebar/sidebar-category-general';
import { useParams, usePathname } from 'next/navigation';
import { useSidebar } from '@/lib/hooks/use-sidebar';

export const ProfileSidebar = ({ children }: any) => {
  const pathname = usePathname()
  const openSidebar = pathname.includes('/t');
  const [isThreadsOpen, setIsThreadsOpen] = useState(openSidebar);
  const location = useLocation();
  const { slug } = useParams()
  const { isSidebarOpen,  toggleSidebar } = useSidebar();

  return (
    <div className="relative h-screen w-full">
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => toggleSidebar()}
        />
      )}

      <div className="flex h-full">
        {/* Sidebar */}
        <div 
          className={cn(
            "fixed lg:relative z-40 h-full transition-transform duration-300 ease-in-out",
            "w-64 bg-gray-50 dark:bg-black border-r",
            "lg:transform-none lg:transition-none",
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          )}
        >
          <nav className="flex-1 h-full overflow-y-auto scrollbar">
            <div className="flex flex-col space-y-1 mt-3 font-Geist">
              {/* Threads Accordion */}
              <div className="rounded-lg">
                <Link
                  href={`/u/${slug}`}
                  onClick={() => setIsThreadsOpen(!isThreadsOpen)}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3",
                    "hover:bg-gray-200 dark:hover:bg-mirage transition-colors duration-200",
                    isThreadsOpen || location.pathname?.includes('/t/') ? 'bg-gray-200 dark:bg-mirage' : ''
                  )}
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
                    "overflow-hidden transition-all duration-300",
                    isThreadsOpen ? "max-h-[300px]" : "max-h-0"
                  )}
                >
                  <div className="border dark:border-b-mirate border-b-gray-200 overflow-y-auto scrollbar">
                    <SidebarCategoryGeneral page="profile" />
                  </div>
                </div>
              </div>

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

              {/* Subscriptions Link */}
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
            </div>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 w-full overflow-auto">
          <main className="h-full w-full p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};