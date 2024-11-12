import { cn } from '@/lib/utils'
import { ExternalLink as ExternalLinkIcon } from 'lucide-react'

export function ExternalLink({
  href,
  children
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      target="_blank"
      className={cn(
        'inline-flex flex-1 items-center justify-center gap-2',
        'border border-[#F4F4F580] rounded-3xl',
        'bg-[#18181B] text-white text-xl py-3.5 px-9 leading-[1.3]',
        'dark:bg-white dark:text-black',
        'hover:underline'
      )}
    >
      <span>{children}</span>
      <ExternalLinkIcon size={20} className="-mt-[1px]" />
    </a>
  )
}
