import { Suspense } from 'react'
import { WorkEarlyAccessForm } from '@/components/p/early-access-from'

export default function WorkPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] items-center py-10">
      <h1>Masterbots for professional work is coming soon!</h1>
      <p>
        Let us know what areas are you most interested in to obtain early
        access.
      </p>
      <br />
      <Suspense fallback={<div className="flex-1 overflow-auto" />}>
        <WorkEarlyAccessForm />
      </Suspense>
    </div>
  )
}
