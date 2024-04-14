import Link from 'next/link'
import type { ElementType } from 'react'

export default function FooterCT({ nonFooterTag }: { nonFooterTag?: boolean }) {
  const Footer: ElementType = ({ children }) =>
    nonFooterTag ? (
      <div className="min-h-[64px] whitespace-break-spaces text-xs font-semibold font-['Geist_Mono'] flex justify-center items-center opacity-50">
        {children}
      </div>
    ) : (
      <footer className="min-h-[64px] whitespace-break-spaces text-xs font-semibold font-['Geist_Mono'] flex justify-center items-center opacity-50">
        {children}
      </footer>
    )

  return (
    <Footer>
      <span className="font-['Geist_Mono'] text-center items-center font-normal text-[12px]">
        Robot avatars delivered by{' '}
        <a
          className="text-primary mr-2  underline focus-within:underline"
          href="https://robohash.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          robohash.org
        </a>
        <Link
          shallow
          className="text-primary underline focus-within:underline"
          href="/terms"
        >
          terms & policies
        </Link>
      </span>
    </Footer>
  )
}
