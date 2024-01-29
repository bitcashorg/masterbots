import { BrowseProvider } from '@/lib/hooks/use-browse'

interface BrowseLayoutProps {
  children: React.ReactNode
}

export default async function BrowseLayout({ children }: BrowseLayoutProps) {
  return (
    <BrowseProvider>
      <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] ">
        <div className="max-w-[1024px] pb-10 mx-auto w-full overflow-auto group">
          {children}
        </div>
      </div>
    </BrowseProvider>
  )
}
