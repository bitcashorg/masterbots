import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'

export function ExternalLink({
	href,
	className,
	children,
	...props
}: React.ComponentProps<'a'>) {
	return (
		<a
			href={href}
			target="_blank"
			rel="canonical noopener noreferrer"
			className={cn(buttonVariants({ variant: 'link' }), className)}
			{...props}
		>
			{children}
			<ExternalLinkIcon size={20} className="-mt-[1px]" />
		</a>
	)
}
