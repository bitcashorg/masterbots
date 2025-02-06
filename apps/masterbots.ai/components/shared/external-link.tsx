import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'

export function ExternalLink({
  href,
  className,
  children
}: {
  href: string
  className: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        buttonVariants({ variant: 'link' }),
        className,
      )}
    >
      {children}
      <ExternalLinkIcon size={20} className="-mt-[1px]" />
    </a>
  )
}
