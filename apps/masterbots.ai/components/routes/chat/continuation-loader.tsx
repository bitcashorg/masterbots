
export function MessageContinuationLoader() {
	return (
		<div className="flex flex-col items-center p-4 space-y-2">
			<div className="flex items-center gap-2">
				<div className="w-4 h-4 rounded-full bg-accent animate-pulse" />
				<div className="w-4 h-4 delay-150 rounded-full bg-accent animate-pulse" />
				<div className="w-4 h-4 delay-300 rounded-full bg-accent animate-pulse" />
			</div>
			<p className="text-sm text-muted-foreground">
				Continuing the response, please wait...
			</p>
		</div>
	)
}
