import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { AnimatePresence, motion } from 'framer-motion'
import { FileIcon, XIcon } from 'lucide-react'
import Image from 'next/image'

export function AttachmentsDisplay({
  isDragging,
  attachments,
  onRemove,
}: {
  isDragging: boolean
  attachments: (FileAttachment & { contentType?: string })[]
  onRemove: (id: string) => void
}) {
  return (
    <AnimatePresence>
      {isDragging && (
        <motion.div
          className="absolute left-0 top-0 pointer-events-none dark:bg-zinc-900/90 size-full rounded-md z-10 justify-center items-center flex flex-col gap-1 bg-zinc-100/90"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div>Drag and drop files here</div>
          <div className="text-sm dark:text-zinc-400 text-zinc-500">{'(images and text)'}</div>
        </motion.div>
      )}

      {attachments.length > 0 && (
        <ul className="flex flex-nowrap gap-2 px-2 py-1 mb-2 scrollbar w-full">
          {attachments.map((attachment) => (
            <motion.li
              className="flex flex-wrap gap-2 p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              key={attachment.id}
            >
              <Popover>
                <PopoverTrigger className="flex items-center gap-2 bg-zinc-100 dark:bg-zinc-900 rounded-full h-10">
                  <div className="relative rounded-full size-10 bg-zinc-200 dark:bg-zinc-800">
                    {(attachment?.contentType || attachment?.type)?.includes('image') ? (
                      <Image
                        src={attachment.url as string}
                        width={40}
                        height={40}
                        alt={attachment.name}
                        className="size-10 rounded-full object-cover"
                      />
                    ) : (
                      <FileIcon />
                    )}
                  </div>
                  <div className="p-2 flex items-center gap-2">
                    <span className="truncate">{attachment.name}</span>
                    <Button
                      type="reset"
                      variant="ghost"
                      size="icon"
                      radius="full"
                      onClick={() => onRemove(attachment.id)}
                    >
                      <XIcon className="transform" />
                      <span className="sr-only">Remove attachment</span>
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="p-2 rounded-lg">
                    <img src={attachment.url} alt={attachment.name} className="w-full h-auto" />
                  </div>
                </PopoverContent>
              </Popover>
            </motion.li>
          ))}
        </ul>
      )}
    </AnimatePresence>
  )
}
