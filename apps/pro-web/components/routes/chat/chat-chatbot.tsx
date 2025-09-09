//* Component for rendering a chatbot interface

import { ChatPanelSkeleton } from '@/components/shared/skeletons/chat-panel-skeleton'
import type { Chatbot } from 'mb-genql'
import dynamic from 'next/dynamic'

const Chat = dynamic(
	() => import('@/components/routes/chat/chat').then((mod) => mod.Chat),
	{
		loading: () => <ChatPanelSkeleton />,
	},
)

export const ChatChatbot = ({
	chatbot, //* Chatbot data to interact with
}: {
	chatbot?: Chatbot
}) => {
	return <Chat chatbot={chatbot} />
}
