//* ChatThreadListPanel initializes and renders the chat interface with the active thread's messages and chatbot details.

import { Chat } from '@/components/routes/chat/chat';
import { Pro } from '@/components/routes/pro/pro';
import type { Chatbot } from 'mb-genql';

export default function ChatThreadListPanel({
	variant = 'personal',
	chatbot,
}: { variant?: 'pro' | 'personal'; chatbot?: Chatbot }) {
	return variant === 'pro' ? (
		<Pro chatbot={chatbot} />
	) : (
		<Chat chatbot={chatbot} />
	)
}
