import { Card, CardDescription, CardHeader, CardTitle } from '@masterbots/mb-ui'
import { Filter, MessageSquareXIcon, SearchX } from 'lucide-react'
import { NoResultsSkeleton } from './skeletons/no-results-skeleton'

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
	isLoading = false,
}: NoResultsProps) {
	if (isLoading) {
		return <NoResultsSkeleton />
	}

	const noMoreThreads = customMessage
		?.toLocaleLowerCase()
		.includes('no more threads')
	const defaultNoResultsIcon = searchTerm ? (
		<SearchX className="size-12 text-muted-foreground" />
	) : (
		<Filter className="size-12 text-muted-foreground" />
	)
	const noResultsIcon = noMoreThreads ? (
		<MessageSquareXIcon className="size-12 text-muted-foreground" />
	) : (
		defaultNoResultsIcon
	)

	return (
		<Card className="bg-transparent border-none shadow-none mt-10">
			<CardHeader className="flex flex-col items-center gap-2">
				{noResultsIcon}
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
