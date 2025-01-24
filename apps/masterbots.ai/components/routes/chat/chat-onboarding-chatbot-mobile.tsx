import { Card, CardHeader } from '@/components/ui/card'
import { PanelLeft } from 'lucide-react'

export function OnboardingMobileView() {
  return (
    <div className="md:hidden h-[calc(100vh-196px)] flex items-center justify-center -translate-y-8">
      <Card className="w-full bg-white dark:bg-[#09090B]">
        <CardHeader>
          <div className="flex flex-col gap-4">
            <div className="px-4 pt-2.5">
              <h1 className="text-xl font-bold text-zinc-950 dark:text-gray-300">
                Welcome to Masterbots!
              </h1>
            </div>
            <div className="h-[3px] bg-zinc-200 dark:bg-slate-800" />

            <div className="flex flex-col justify-center gap-4 px-4">
              <p className="w-full text-sm text-zinc-500 dark:text-zinc-500 min-h-24">
                Here you can create new threads and share them to your network!
                Navigate with the sidebar and pick any bot of your interest.
              </p>
            </div>
            <div className="flex flex-col items-center py-4">
              <div className="flex items-center py-2 space-x-4">
                <PanelLeft className="size-6 text-[#be16e8] dark:text-[#82e46a]" />
                <p className="text-lg text-[#be16e8] dark:text-[#82e46a]">
                  Go To Sidebar And Select One Bot
                </p>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  )
}
