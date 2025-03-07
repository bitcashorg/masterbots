import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { TooltipContent } from '@/components/ui/tooltip'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { cn } from '@/lib/utils'
import { Tooltip, TooltipTrigger } from '@radix-ui/react-tooltip'
import Image from 'next/image'

export function AttachmentCards({
  userAttachments,
  isAccordionFocused,
}: { userAttachments: FileAttachment[]; isAccordionFocused: boolean }) {
  const attachmentsLength = userAttachments?.length || 0
  return (
    <div className={cn('flex flex-col items-start gap-2')}>
      {userAttachments && attachmentsLength > 0 && (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span className="text-xs font-medium">Base Knowledge:</span>
            <span className="text-xs font-medium text-accent">{attachmentsLength} File{attachmentsLength > 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {userAttachments.map((attachment) => (
              <Card
                key={(attachment as FileAttachment).id}
                className={cn(
                  'transition duration-300 relative flex flex-col items-center gap-1 text-xs font-medium',
                  isAccordionFocused ? 'size-[240px]' : 'size-[80px]',
                )}
              >
                <CardTitle className="size-full">
                  <Image
                    src={(attachment as FileAttachment).url || ''}
                    alt={(attachment as FileAttachment).name}
                    loading="lazy"
                    width={240}
                    height={240}
                    className="size-full object-cover rounded-lg"
                  />
                </CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <CardDescription
                      className={cn(
                        'transition duration-300 absolute truncate bottom-0 px-3 py-1.5 w-full text-center bg-accent text-accent-foreground rounded-b-lg',
                        isAccordionFocused ? 'text-sm' : 'text-xs',
                      )}
                    >
                      {(attachment as FileAttachment).name}
                    </CardDescription>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={5} side="top" align="center" className="px-2 py-1">
                    {(attachment as FileAttachment).name}
                  </TooltipContent>
                </Tooltip>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
