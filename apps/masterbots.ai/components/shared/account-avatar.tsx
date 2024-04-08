import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { IconUser } from '../ui/icons'

export function AccountAvatar({ href, alt, src, size = 32 }: MbAvatarProp) {
  return (
    <Link
      className={cn(
        'flex size-8 shrink-0 select-none items-center justify-center rounded-full border shadow'
      )}
      href={href}
      title={alt}
    >
      {src ? (
        <Image
          alt={alt}
          className="transition-opacity duration-300 rounded-full select-none bg-background dark:bg-primary-foreground hover:opacity-80"
          src={src}
          width={size}
          height={size}
        />
      ) : (
        <IconUser width={size} height={size} />
      )}
    </Link>
  )
}

interface MbAvatarProp {
  href: string
  alt: string
  src?: string
  size?: number
}
