import { cleanPrompt } from '@/lib/helpers/ai-helpers'
import type { useSonner } from '@/lib/hooks/useSonner'
import { extractBetweenMarkers, getRouteType } from '@/lib/utils'
import { getThread } from '@/services/hasura'
import type * as AI from 'ai'
import type { Message, Thread } from 'mb-genql'
import { toSlug } from 'mb-lib'

export interface MessagePair {
	userMessage: AI.Message & Message
	chatGptMessage: (AI.Message & Message)[]
}

export function convertMessage(message: Message) {
	return {
		id: message.messageId,
		content: message.content,
		createAt: message.createdAt,
		role: message.role,
	} as AI.Message
}

export function getAllUserMessagesAsStringArray(
	allMessages: Message[] | AI.Message[],
) {
	const userMessages = allMessages.filter((m) => m.role === 'user')
	const cleanMessages = userMessages.map((m) =>
		extractBetweenMarkers(
			cleanPrompt(m.content),
			// 'OK, so following the same pattern, how would you answer the question:',
			// 'First, think about the following questions and requests: [',
			'Here are a list of questions that may be relevant for you to understand my chain of thoughts: [',
		),
	)
	// Making sure each array item is a string and it is unique
	const uniqueCleanMessages = Array.from(new Set(cleanMessages.map(String)))

	return uniqueCleanMessages.map((msg) => `"${msg}"`).join(', ')
}

export function getThreadLink({
	chat = false,
	thread,
}: {
	chat?: boolean
	thread: Thread
}) {
	return chat
		? `/c/${toSlug(thread.chatbot.name)}/${thread.threadId}`
		: `/${toSlug(thread.chatbot.categories[0]?.category.name)}/${thread.threadId}`
}

export async function getOpeningActiveThreadHelper(
	currentActiveThread: Thread | null,
	sonner: ReturnType<typeof useSonner>['customSonner'],
	activatePopup: (thread: Thread) => void,
) {
	if (currentActiveThread) return

	const pathname = window.location.pathname
	const pathNameParts = pathname.split('/')
	const routeType = getRouteType(pathname)
	const isPublic = routeType === 'public'
	const isProfile = routeType === 'profile'
	const isBotProfile = routeType === 'bot'
	const isPersonal = routeType === 'chat'

	// ? We repeat the pathname parts here to make it simple to read
	// ? We could use a switch case here, but it would be more verbose
	// ? We could also use a map to store the values, but it would be less readable
	// ? and much less if with regex
	// ... you get the idea. 😁
	const [
		,
		_publicCategory,
		_publicDomain,
		_publicChatbot,
		publicThreadSlug,
		publicThreadQuestionSlug,
	] = pathNameParts
	const [
		,
		_chatbotProfileRootBase,
		_chatbotProfileChatbotName,
		chatbotProfileThreadSlug,
		chatbotProfileThreadQuestionSlug,
	] = pathNameParts
	const [
		,
		_personalRootBase,
		_personalCategory,
		_personalDomain,
		_personalChatbot,
		personalThreadSlug,
		personalThreadQuestionSlug,
	] = pathNameParts
	const [
		,
		_userProfileRootBase,
		_userProfileSlug,
		_userProfileThreadRootBase,
		_userProfileCategory,
		_userProfileDomain,
		_userProfileChatbot,
		userProfileThreadSlug,
		userProfileThreadQuestionSlug,
	] = pathNameParts

	// console.log('pathname', {
	// 	pathNameParts,
	// 	isPersonal,
	// 	isPublic,
	// 	isProfile,
	// 	isBotProfile,
	// })

	if (isPublic && !publicThreadSlug && !publicThreadQuestionSlug) return
	if (isPersonal && !personalThreadSlug && !personalThreadQuestionSlug) return
	if (
		isBotProfile &&
		!chatbotProfileThreadSlug &&
		!chatbotProfileThreadQuestionSlug
	)
		return
	if (isProfile && !userProfileThreadSlug && !userProfileThreadQuestionSlug)
		return

	const threadSlug =
		(isPublic && publicThreadSlug) ||
		(isPersonal && personalThreadSlug) ||
		(isProfile && userProfileThreadSlug) ||
		(isBotProfile && chatbotProfileThreadSlug) ||
		''
	const thread = await getThread({
		threadSlug,
		isPersonal,
	})

	if (!thread) {
		sonner({
			type: 'error',
			text: 'Error finding the thread that you were looking for.',
		})
		return
	}
	if (
		(isPublic && (publicThreadQuestionSlug || publicThreadSlug)) ||
		(isProfile && (userProfileThreadQuestionSlug || userProfileThreadSlug)) ||
		(isPersonal && (personalThreadQuestionSlug || personalThreadSlug)) ||
		(isBotProfile &&
			(chatbotProfileThreadQuestionSlug || chatbotProfileThreadSlug))
	) {
		console.log(
			'scrolling to',
			publicThreadQuestionSlug ||
				personalThreadQuestionSlug ||
				userProfileThreadQuestionSlug ||
				chatbotProfileThreadQuestionSlug,
		)
		await activatePopup(thread)
	}
}
