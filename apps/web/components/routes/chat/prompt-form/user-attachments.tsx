import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import type { IndexedDBItem } from '@/lib/hooks/use-indexed-db'
import { CommandItem } from '@masterbots/mb-ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@masterbots/mb-ui'
import { FileIcon, FileTextIcon } from 'lucide-react'
import { appConfig } from 'mb-env'
import Image from 'next/image'

export function UserAttachments({
	attachments,
	onChange,
}: {
	attachments: IndexedDBItem[] | undefined
	onChange: (id: string) => void
}) {
	return attachments?.map((attach) => {
		const attachment = attach as FileAttachment
		const attachmentType = attachment.contentType?.split('/')[0]
		if (!attachment) return null
		if (appConfig.features.devMode) {
			console.log('attachment content ——>', {
				attachment: `${(attachment.content as string).substring(0, 100)}...`,
			})
		}
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
										width={40}
										height={40}
										loading="lazy"
										src={attachment.url}
										alt={attachment.name}
										className="size-10 object-cover rounded"
									/>
								) : (
									<FileTextIcon className="size-5" />
								)}
							</div>
							<span className="truncate w-full">{attachment.name}</span>
						</label>
					</TooltipTrigger>
					<TooltipContent
						sideOffset={5}
						side="top"
						align="center"
						className="px-2 py-1"
					>
						{attachment.name}
					</TooltipContent>
				</Tooltip>
			</CommandItem>
		)
	})
}
