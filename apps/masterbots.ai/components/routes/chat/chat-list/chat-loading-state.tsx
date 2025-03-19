import { useThread } from '@/lib/hooks/use-thread'
import { GlobeIcon } from 'lucide-react'

export function ChatLoadingState() {
	const { activeTool, loadingState } = useThread()

	const isPreProcessing = Boolean(
		loadingState?.match(/processing|digesting|polishing/),
	)

	switch (activeTool?.toolName) {
		case 'webSearch':
			return (
				<div className="flex items-center w-full h-20 gap-4 opacity-65">
					<GlobeIcon className="relative size-6 animate-bounce top-2" />
					<p className="flex flex-col gap-1 leading-none">
						<span>
							Searching on the web{' '}
							{['first-dot', 'second-dot', 'third-dot'].map((key, index) => (
								<span
									key={key}
									className="animate-pulse rounded-full text-4xl h-0.5 leading-none"
									style={{ animationDelay: `${index * 100}ms` }}
								>
									.
								</span>
							))}
						</span>
						<b className="text-xs">
							Searching for &quot;{activeTool.args.query as string}&quot;
						</b>
					</p>
				</div>
			)
		default:
			return isPreProcessing ? (
				<div className="flex items-center justify-center w-full h-20">
					<div className="w-8 h-8 border-4 border-t-4 border-gray-200 rounded-full animate-ping" />
				</div>
			) : null
	}
}
