'use client';

import Image from 'next/image';
import { useSidebar } from '@/lib/hooks/use-sidebar';
import { cn } from '@/lib/utils'
import type { Thread } from 'mb-genql'

export function ChatbotAvatar({ thread }: { thread: Thread }) {
  const { activeChatbot } = useSidebar();

  if (activeChatbot === null || !thread.chatbot?.avatar) return null;

  return (
    <div
    className={cn(
      'md:flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow hidden'
    )}
  >
    <Image
      className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
      src={thread.chatbot?.avatar}
      alt={thread.chatbot?.name ?? 'BotAvatar'}
      height={32}
      width={32}
    />{' '}
  </div>
  );
};