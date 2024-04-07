import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function MbAvatar({ href, alt, src }: MbAvatarProp) {
  return (
    <Link
      className={cn(
        'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
      )}
      href={href}
      title={alt}
    >
      <Image
        alt={alt}
        className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
        height={32}
        src={src}
        width={32}
      />
    </Link>
  )
}

interface MbAvatarProp {
  href: string
  alt: string
  src: string
}
