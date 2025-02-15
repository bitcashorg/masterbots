'use client'

import { IconCaretRight } from '@/components/ui/icons';
import { useProfile } from '@/lib/hooks/use-profile';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import { urlBuilders } from '@/lib/url';
import { cn } from '@/lib/utils';
import { MessagesSquare, ReceiptIcon, Settings } from 'lucide-react';
import { appConfig } from 'mb-env';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAsync, useLocation } from 'react-use';
import { SidebarCategoryGeneral } from '../sidebar/sidebar-category-general';
import FooterCT from '../footer/footer-ct';

export const ProfileSidebar = ({ children }: any) => {
  const pathname = usePathname()
  const openSidebar = pathname.includes('/t');
  const [isThreadsOpen, setIsThreadsOpen] = useState(openSidebar);
  const location = useLocation();
  const { slug } = useParams()
  const { isSidebarOpen, toggleSidebar, setActiveCategory,
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
    if(!sameUser) return;
    setIsThreadsOpen(!isThreadsOpen);
    setActiveCategory(null);
    setActiveChatbot(null);
  }

  return (
    <div className={cn(
      'transition-all relative w-full flex h-full'
    )}>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden"
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
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky z-[70] top-0 h-full", // Changed to sticky and match parent height
          "w-[18.75rem] bg-gray-50 dark:bg-black border-r",
          "overflow-y-auto", // Allow scrolling within sidebar
          "lg:transform-none lg:transition-none", 
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <nav className="flex-1 scrollbar h-full">
          <div className="flex flex-col space-y-1 font-Geist">
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
                  "overflow-y-auto scrollbar transition-all duration-300",
                  {
                    "max-h-[300px] border dark:border-b-mirage border-b-gray-200": isThreadsOpen,
                    "max-h-0": !isThreadsOpen,
                    'border-b-none': !sameUser
                  }
                )}
              >
                <SidebarCategoryGeneral page="profile" />
              </div>
            </div>
            {
              sameUser && session?.user.hasuraJwt && (
                <>
                  {appConfig.features.devMode && (
                    <>
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
                  )}
                </>
              )
            }
          </div>
        </nav>
      </aside>
  
      {/* Main content */}
      <section
        className={cn(
          'flex flex-col w-full overflow-auto  h-full',
        )}
      >
        <div className="flex flex-col w-full gap-10 pt-5 mx-auto flex-grow">
          {children}
        </div>
        <div className="sticky bottom-0 w-full left-0 z-10 dark:bg-black bg-white">          
          <FooterCT className='flex justify-start items-center text-center' />         
        </div> 
      </section>
    </div>
  );
};