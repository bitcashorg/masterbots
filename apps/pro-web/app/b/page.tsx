import { BotProfileThreadSection } from '@/components/routes/bot/bot-profile-thread-section'
import type { PageProps } from '@/types'

export default async function BotPage(props: PageProps) {
	// When no bot is selected, pass null/undefined to show welcome view
	return (
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		<BotProfileThreadSection threads={[]} count={0} chatbot={null as any} />
	)
}
