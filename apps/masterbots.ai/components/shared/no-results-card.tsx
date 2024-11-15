import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { SearchX, Filter } from 'lucide-react'
import { NoResultsSkeleton } from '../routes/browse/skeletons/no-results-skeleton'

interface NoResultsProps {
  searchTerm?: string
  totalItems?: number
  customMessage?: string
  isLoading?: boolean
}

export function NoResults({
  searchTerm,
  totalItems,
  customMessage,
  isLoading = false
}: NoResultsProps) {

  if (isLoading) {
    return <NoResultsSkeleton />
  }

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader className="flex flex-col items-center gap-2">
        {searchTerm ? (
          <SearchX className="size-12 text-muted-foreground" />
        ) : (
          <Filter className="size-12 text-muted-foreground" />
        )}
        <CardTitle className="text-xl">No results found</CardTitle>
        <CardDescription className="text-center">
          {customMessage ||
            (searchTerm ? (
              <>
                No threads found matching &quot;{searchTerm}&quot;
                <br />
                Try adjusting your search term or spelling
                <br />
                Showing 0 of {totalItems} total threads
              </>
            ) : (
              'No threads available in the selected categories'
            ))}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
