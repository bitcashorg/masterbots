import { cn } from "@/lib/utils"
import { ElementType } from "react"

export default function FooterCT({ nonFooterTag, fixed }: { nonFooterTag?: boolean, fixed?: boolean }) {
  const Footer: ElementType = ({ children }) => nonFooterTag ?
    <div className={cn("min-h-[58px] whitespace-break-spaces text-xs font-semibold font-['Geist_Mono'] flex justify-center items-center opacity-50", fixed && 'opacity-100 fixed w-full z-[99999] bottom-0 bg-accent')}>
      {children}
    </div> :
    <footer className={cn("min-h-[58px] whitespace-break-spaces text-xs font-semibold font-['Geist_Mono'] flex justify-center items-center opacity-50", fixed && 'opacity-100 fixed w-full z-[99999] bottom-0 bg-accent')}>
      {children}
    </footer>

  return (
    <Footer>
      <span className="font-['Geist_Mono'] text-center items-center font-normal text-[12px]">Robot avatars delivered by{' '}
        <a href="https://robohash.org" target="_blank" rel="noopener noreferrer" className="mr-2 underline text-primary focus-within:underline">
          robohash.org
        </a>
        {' • '}
        <a href="/terms" className="underline text-primary focus-within:underline">
          terms & policies
        </a>
      </span>
    </Footer>
  )
}