import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import type { FileAttachment } from '@/lib/hooks/use-chat-attachments'
import { cn } from '@/lib/utils'
import { Maximize2Icon, Minimize2Icon } from 'lucide-react'
import Image from 'next/image'

export function AttachmentDialog({
	attachment,
	absolutePosition = false,
}: {
	attachment: FileAttachment
	absolutePosition?: boolean
}) {
	const { id, name, url, contentType } = attachment
	return (
		<Dialog key={`dialog-${id}`}>
			<DialogTrigger className="w-12" id={id} asChild>
				<Button
					variant="ghost"
					size="icon"
					radius="full"
					className={cn(
						'p-1.5 size-auto',
						absolutePosition ? 'absolute top-2 right-2 bg-background/50' : '',
					)}
				>
					<span className="sr-only">Open {name} attachment</span>
					<Maximize2Icon className="size-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="min-w-[66vw] max-h-[90vh] -mt-5">
				<DialogTitle hidden>User attachment file {name}</DialogTitle>
				<DialogDescription className="size-full max-h-[calc(90vh-48px)]">
					<DialogClose asChild>
						<Button
							type="button"
							variant="ghost"
							size="icon"
							radius="full"
							className="z-10 absolute right-4 top-4 bg-background/50"
						>
							<Minimize2Icon className="size-4" />
						</Button>
					</DialogClose>
					{contentType?.includes('image') ? (
						<picture className="block size-full border rounded-sm border-foreground/20">
							<Image
								src={url}
								alt={name}
								loading="lazy"
								className="relative w-full max-h-full rounded-sm object-contain"
								width={1920}
								height={0}
							/>
						</picture>
					) : (
						// text render from base64 string
						<>
							{attachment.content ? (
								<pre className="size-full scrollbar p-2 border rounded-sm border-foreground/20 bg-muted text-sm whitespace-pre-wrap">
									{typeof window !== 'undefined'
										? window.atob(
												(attachment.content as string).split(',')[1] || '',
											)
										: ''}
								</pre>
							) : null}
						</>
					)}
				</DialogDescription>
				<DialogFooter className="fixed -bottom-10 flex items-center !justify-center text-center w-full">
					{name} | {(attachment.size / 1024 / 1024).toFixed(2)}MB
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
