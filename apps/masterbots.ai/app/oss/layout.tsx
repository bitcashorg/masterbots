import Link from 'next/link'

export default async function OssLayout({ children }: OssLayoutProps) {
  return (
    <main className="container flex flex-col min-h-screen">
      <div className="px-6 py-12">
        <div className="space-y-0.5 mb-10 pb-10 border-b-[1px] dark:border-mirage border-gray-300">
          <h1 className="text-2xl font-bold tracking-tight">
            Open Source Manifest
          </h1>
          <p className="text-muted-foreground">Why and how to collab</p>
        </div>
        <div className="flex gap-8">
          <div className="flex min-w-[150px]">
            <nav aria-label="Sidebar" className="space-y-1">
              <div className="space-y-3">
                <Link
                  className="block text-base font-medium text-gray-300 hover:text-white"
                  href="/Oss"
                >
                  Some data
                </Link>
                <Link
                  className="block text-base font-medium text-gray-300 hover:text-white"
                  href="/Oss/appereance"
                >
                  Some link
                </Link>
                {/* Add more links as needed */}
              </div>
            </nav>
          </div>
          <div className="space-y-6 flew grow">{children}</div>
        </div>
      </div>
    </main>
  )
}

interface OssLayoutProps {
  children: React.ReactNode
  params: { category: string }
}
