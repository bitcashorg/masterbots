'use client';

import { useSidebar } from '@/lib/hooks/use-sidebar';
import { cn, getRouteType } from '@/lib/utils';
import type { Thread } from 'mb-genql';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export function ChatbotAvatar({ thread }: { thread: Thread }) {
  const { activeChatbot } = useSidebar();
  const pathname = usePathname()

  if (getRouteType(pathname) !== 'public' && (activeChatbot || !thread.chatbot?.avatar)) return null;

  return (
    <div
      className={cn(
        'md:flex size-10 shrink-0 select-none items-center justify-center rounded-full border'
      )}
    >
      <Image
        className="transition-all duration-300 rounded-full select-none bg-background/100 hover:bg-background/30"
        src={thread.chatbot?.avatar ?? '/images/robohash1.png'}
        alt={thread.chatbot?.name ?? 'Default BotAvatar'}
        height={42}
        width={42}
      />{' '}
    </div>
  );
};