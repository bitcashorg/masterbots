export function PreferenceItemTitle({
	description,
	title,
}: {
	title: string
	description: string
}) {
	return (
		<div className="flex flex-col items-start gap-y-0 text-left">
			<p className="text-lg font-medium">{title}</p>
			<p className="text-sm font-normal text-[#A1A1AA]">{description}</p>
		</div>
	)
}
