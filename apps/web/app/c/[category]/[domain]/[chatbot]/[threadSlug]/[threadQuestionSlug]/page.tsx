import { authOptions } from '@/auth'
import { botNames } from '@/lib/constants/bots-names'
import { PAGE_SIZE } from '@/lib/constants/hasura'
import { type RoleTypes, isAdminOrModeratorRole } from '@/lib/utils'
import { getChatbot, getThreads } from '@/services/hasura'
import { MainContentSkeleton } from '@masterbots/mb-ui'
import { ChatPanelSkeleton } from '@masterbots/mb-ui'
import { isTokenExpired } from 'mb-lib'
import { getServerSession } from 'next-auth'
import dynamic from 'next/dynamic'
import { redirect } from 'next/navigation'

const ThreadPanel = dynamic(
	() => import('@/components/routes/thread/thread-panel'),
)
const ChatChatbot = dynamic(
	() => import('@/components/routes/chat/chat').then((mod) => mod.Chat),
	{
		loading: () => <ChatPanelSkeleton />,
	},
)

export { generateMbMetadata as generateMetadata } from '@/lib/metadata'

export default async function BotThreadPopUpQuestionPage(props: {
	params: Promise<{ category: string; chatbot: string }>
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
	const params = await props.params
	const session = await getServerSession(authOptions)
	// NOTE: maybe we should use same expiration time
	const jwt = session ? session.user?.hasuraJwt : null
	if (!jwt) {
		console.error('Session JWT is missing.')
	}
	if (isTokenExpired(jwt as string)) {
		redirect('/auth/signin')
	}

	const chatbotName = (await botNames).get(params.chatbot)
	if (!chatbotName) {
		throw new Error(`Chatbot name for ${params.chatbot} not found`)
	}
	const chatbot = await getChatbot({ chatbotName, jwt: jwt as string })

	if (!chatbot) throw new Error(`Chatbot ${chatbotName} not found`)

	// session will always be defined

	const userId = session?.user?.id
	if (!userId) {
		throw new Error('User ID is missing.')
	}
	const role = session.user.role as RoleTypes
	const { threads, count } = await getThreads({
		chatbotName,
		jwt: jwt as string,
		userId,
		limit: PAGE_SIZE,
	})

	return (
		<>
			<ThreadPanel
				threads={threads}
				count={count}
				isAdminMode={isAdminOrModeratorRole(role)}
			/>
			<ChatChatbot chatbot={chatbot} />
		</>
	)
}
