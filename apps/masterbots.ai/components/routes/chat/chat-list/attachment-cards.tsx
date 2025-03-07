import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { cn } from '@/lib/utils'
import { AnimatePresence, type MotionProps, motion } from 'framer-motion'
import { FileIcon } from 'lucide-react'
import Image from 'next/image'

export const cardSlideUpShowAnimationProps: MotionProps = {
  initial: { opacity: 0, y: 5 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 5 },
}

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
            <span className="text-xs font-medium text-accent">
              {attachmentsLength} File{attachmentsLength > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex flex-wrap gap-1">
            <AnimatePresence>
              {userAttachments.map((attachment) => {
                const { id, name, url, contentType } = attachment as FileAttachment
                return (
                  <motion.div key={id} {...cardSlideUpShowAnimationProps}>
                    <Card
                      className={cn(
                        'transition duration-300 relative flex flex-col items-center gap-1 text-xs font-medium',
                        isAccordionFocused ? 'size-[240px]' : 'size-[80px]',
                      )}
                    >
                      <CardTitle className="size-full">
                        {contentType?.includes('image') ? (
                          <Image
                            src={url}
                            alt={name}
                            loading="lazy"
                            width={240}
                            height={240}
                            className="size-full object-cover rounded-lg"
                          />
                        ) : (
                          <div className="size-full flex items-center justify-center bg-muted rounded-lg">
                            <FileIcon className="size-5" />
                          </div>
                        )}
                      </CardTitle>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CardDescription
                            className={cn(
                              'transition duration-300 absolute truncate bottom-0 px-3 py-1.5 w-full text-center bg-accent text-accent-foreground rounded-b-lg',
                              isAccordionFocused ? 'text-sm' : 'text-xs',
                            )}
                          >
                            {name}
                          </CardDescription>
                        </TooltipTrigger>
                        <TooltipContent sideOffset={5} side="top" align="center" className="px-2 py-1">
                          {name}
                        </TooltipContent>
                      </Tooltip>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  )
}
