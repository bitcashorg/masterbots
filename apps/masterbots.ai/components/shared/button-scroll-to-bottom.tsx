'use client'

import { Button, type ButtonProps } from '@/components/ui/button';
import { IconArrowDown } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function ButtonScrollToBottom({
  className,
  isAtBottom,
  scrollToBottom,
  ...props
}: ButtonProps & { textClassName?: string; isAtBottom?: boolean; scrollToBottom: () => void }) {
  return (
    <Button
      variant="outline"
      size="icon"
      className={cn(
        'z-10 bg-background transition-opacity duration-300',
        isAtBottom ? 'opacity-0' : 'opacity-100',
        className
      )}
      onClick={() => {
        scrollToBottom()
      }}
      {...props}
    >
      <IconArrowDown className="transition-all" />
      <span className={props?.textClassName ? props.textClassName : 'sr-only'}>
        Scroll to bottom
      </span>
    </Button>
  )
}
