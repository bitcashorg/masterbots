'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { useLocation } from 'react-use';
import { cn } from '@/lib/utils'
import { IconCaretRight } from '@/components/ui/icons';
import { MessagesSquare, Settings, ReceiptIcon } from 'lucide-react';
import { SidebarCategoryGeneral } from '../sidebar/sidebar-category-general';
import { useParams } from 'next/navigation';

export const ProfileSidebar = ({ children }: any) => {
  const [isThreadsOpen, setIsThreadsOpen] = useState(false);
  const location = useLocation();
  const { slug } = useParams()

  return (
    <div className="flex h-screen w-full">
      {/* Sidebar with a fixed position and scrollable content */}
      <div className="w-64 border-r bg-gray-50 dark:bg-black flex flex-col">
        <nav className="flex-1 overflow-y-auto scrollbar">
          <div className="flex flex-col space-y-1 mt-3 font-Geist">
            {/* Threads Accordion */}
            <div className="rounded-lg">
              <button
                onClick={() => setIsThreadsOpen(!isThreadsOpen)}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 hover:bg-gray-200 dark:hover:bg-mirage",
                  isThreadsOpen ? 'bg-gray-200 dark:bg-mirage' : ''
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
              </button>
              {isThreadsOpen && (
                <div className="max-h-[300px]  border dark:border-b-mirate  border-b-gray-200 overflow-y-auto scrollbar">
                  <SidebarCategoryGeneral page="profile" />
                </div>
              )}
            </div>

            {/* Preferences Link */}
            <Link
              href={`/u/${slug}/s/pref`}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 hover:bg-gray-200 dark:hover:bg-mirage",
                location.pathname === '/preferences' ? 'bg-gray-200 dark:bg-mirage' : ''
              )}
            >
              <Settings className="w-5 h-5" />
              <span>Preferences</span>
            </Link>

            {/* Subscriptions Link */}
            <Link
                href={`/u/${slug}/s/sub`}
              className={cn(
                "flex items-center space-x-2 px-4 py-3 hover:bg-gray-200 dark:hover:bg-mirage",
                location.pathname === '/subscriptions' ? 'bg-gray-200 dark:bg-mirage' : ''
              )}
            >
              <ReceiptIcon className="w-5 h-5" />
              <span>Subscriptions</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <main className="h-full w-full p-6">
          {children}
        </main>
      </div>
    </div>
  );
};