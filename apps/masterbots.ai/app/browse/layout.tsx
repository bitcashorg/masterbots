import { BrowseProvider } from '@/lib/hooks/use-browse'

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <BrowseProvider>
      <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] ">
        <div className="overflow-auto group scrollbar w-full">{children}</div>
      </div>
    </BrowseProvider>
  )
}
