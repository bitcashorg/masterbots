import { CommandItem } from '@/components/ui/command'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { IndexedDBItem } from '@/lib/hooks/use-indexed-db'
import { FileIcon } from 'lucide-react'
import Image from 'next/image'

export function UserAttachments({
  attachments,
  onChange,
}: {
  attachments: IndexedDBItem[] | undefined
  onChange: (id: string) => void
}) {
  return attachments?.map((attach) => {
    // TODO: fix type to be just one type (FileAttachment)
    const attachment = attach as FileAttachment & { contentType?: string }
    const attachmentType = (attachment?.type ?? attachment?.contentType)?.split('/')[0]
    if (!attachment) return null
    return (
      <CommandItem key={attachment.id} value={attachment.id} className="w-full">
        <Tooltip>
          <TooltipTrigger className="flex items-center gap-2 w-full">
            <label
              className="flex items-center gap-2 w-full"
              htmlFor={`attachment-${attachment.id}`}
            >
              <input
                type="checkbox"
                id={`attachment-${attachment.id}`}
                name={`attachment-${attachment.id}`}
                checked={attachment.isSelected}
                onChange={() => onChange(attachment.id)}
              />
              <div className="size-10 flex flex-shrink-0 items-center justify-center bg-muted rounded">
                {attachmentType?.includes('image') ? (
                  <Image
                    src={attachment.url as string}
                    width={40}
                    height={40}
                    alt={attachment.name}
                    className="size-10 object-cover rounded"
                  />
                ) : (
                  <FileIcon className="size-5" />
                )}
              </div>
              <span className="truncate w-full">{attachment.name}</span>
            </label>
          </TooltipTrigger>
          <TooltipContent sideOffset={5} side="top" align="center" className="px-2 py-1">
            {attachment.name}
          </TooltipContent>
        </Tooltip>
      </CommandItem>
    )
  })
}
