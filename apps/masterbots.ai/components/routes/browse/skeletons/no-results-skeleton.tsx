import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function NoResultsSkeleton() {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="flex flex-col items-center gap-2">
        <Skeleton className="rounded-full size-12" />
        <Skeleton className="h-6 w-36" />
        <div className="flex flex-col items-center gap-2">
          <Skeleton className="w-64 h-4" />
          <Skeleton className="w-48 h-4" />
        </div>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Skeleton className="w-32 h-4" />
      </CardContent>
    </Card>
  )
}
