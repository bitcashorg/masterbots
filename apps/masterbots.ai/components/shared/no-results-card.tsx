import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card'
import { SearchX, Filter } from 'lucide-react'

interface NoResultsProps {
  searchTerm?: string
  totalItems?: number
  customMessage?: string
}

export function NoResults({
  searchTerm,
  totalItems,
  customMessage
}: NoResultsProps) {
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
              </>
            ) : (
              'No threads available in the selected categories'
            ))}
        </CardDescription>
      </CardHeader>
      {totalItems && totalItems > 0 && (
        <CardContent className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Showing 0 of {totalItems} total threads
          </p>
        </CardContent>
      )}
    </Card>
  )
}
