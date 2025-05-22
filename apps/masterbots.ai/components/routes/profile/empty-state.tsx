import { FolderX } from 'lucide-react'

export function EmptyState({
	title = 'No Data Available',
	description = 'There is no data available for this user.',
}) {
	return (
		<div className="flex flex-col justify-center items-center h-full w-full text-center p-6">
			<div className="mb-6">
				<FolderX
					className="mx-auto text-gray-400 dark:text-white"
					size={100}
					strokeWidth={1}
				/>
			</div>
			<h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
				{title}
			</h2>
			<p className="text-gray-600 dark:text-gray-100 max-w-md">{description}</p>
		</div>
	)
}
