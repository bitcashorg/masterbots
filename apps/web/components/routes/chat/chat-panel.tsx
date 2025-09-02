'use client'

import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { PromptForm } from '@/components/routes/chat/prompt-form'
import { useContinueGeneration } from '@/lib/hooks/use-continue-generation'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { useMBChat } from '@/lib/hooks/use-mb-chat'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { logErrorToSentry } from '@/lib/sentry'
import { cn } from '@/lib/utils'
import { getUserBySlug } from '@/services/hasura'
import type { ExampleQuestion } from '@/types'
import { ButtonScrollToBottom } from '@masterbots/mb-ui'
import { FeatureToggle } from '@masterbots/mb-ui'
import { ImageGenerationToggle } from '@masterbots/mb-ui'
import { ImageGenerator } from '@masterbots/mb-ui'
import { LoadingIndicator } from '@masterbots/mb-ui'
import { Button } from '@masterbots/mb-ui'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@masterbots/mb-ui'
import { IconShare, IconStop } from '@masterbots/mb-ui/icons'
import type { Message as AiMessage } from 'ai'
import type { UseChatHelpers } from 'ai/react'
import {
	ChevronsLeftRightEllipsis,
	GlobeIcon,
	GraduationCap,
	Sparkles,
} from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot } from 'mb-genql'
import { useImageToggle } from 'mb-lib'
import { useSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { useAsync } from 'react-use'

// Mock example questions - these will come from Hasura eventually
const mockExampleQuestions: ExampleQuestion[] = [
	{
		id: '1',
		prompt: 'What are the best practices for React performance optimization?',
		category: 'Development',
	},
	{
		id: '2',
		prompt: 'How can I implement authentication in a Next.js application?',
		category: 'Development',
	},
	{
		id: '3',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '4',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '5',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '6',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
	{
		id: '7',
		prompt: 'What are the key differences between TypeScript and JavaScript?',
		category: 'Development',
	},
]

export interface ChatPanelProps
	extends Pick<
		UseChatHelpers,
		'append' | 'isLoading' | 'reload' | 'stop' | 'input' | 'setInput'
	> {
	scrollToBottom: () => void
	id?: string
	title?: string
	chatbot?: Chatbot
	showReload?: boolean
	placeholder: string
	isAtBottom?: boolean
	className?: string
	messages: AiMessage[]
}

const WHITELIST_USERS = appConfig.features.proWhitelistUsers

export function ChatPanel({
	id,
	title,
	isLoading,
	stop,
	append,
	reload,
	input,
	setInput,
	messages,
	chatbot,
	placeholder,
	showReload = true,
	isAtBottom,
	scrollToBottom,
	className,
}: ChatPanelProps) {
	const { isOpenPopup, loadingState, webSearch, setWebSearch } = useThread()
	const { isPowerUp, togglePowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()
	const [shareDialogOpen, setShareDialogOpen] = useState(false)
	const [exampleQuestionsOpen, setExampleQuestionsOpen] = useState(false)
	const [selectedExample, setSelectedExample] = useState<string | null>(null)
	const {
		isCutOff,
		getContinuationPrompt,
		continueGeneration,
		setIsCutOff,
		setIsContinuing,
	} = useContinueGeneration()
	const [, { appendWithMbContextPrompts }] = useMBChat()
	const { isImageGeneration } = useImageToggle()
	const { data: session } = useSession()

	const {
		error: errorUserData,
		loading: loadingUserData,
		value: userData,
	} = useAsync(async () => {
		if (!session?.user?.hasuraJwt) return null
		const userResults = await getUserBySlug({
			slug: session?.user.slug || '',
			isSameUser: true,
		})

		if (userResults.error) {
			throw new Error(userResults.error)
		}

		return userResults.user
	}, [session?.user?.hasuraJwt])

	const handleExampleClick = (question: string, id: string) => {
		setSelectedExample(id)
		setInput(question)
		setExampleQuestionsOpen(false)

		//? Custom event for other components that might need to know
		const event = new CustomEvent('exampleQuestionSelected', {
			detail: { question },
		})
		window.dispatchEvent(event)
	}

	const handleContinueGeneration = async () => {
		if (formDisabled) {
			return
		}
		const continuationPrompt = getContinuationPrompt()

		try {
			await appendWithMbContextPrompts({
				// id: crypto.randomUUID(),
				role: 'user',
				content: continuationPrompt,
			})
			await continueGeneration()
		} catch (error) {
			console.error('Error during continuation flow:', error)

			logErrorToSentry('Continuation generation failed', {
				error,
				message: 'Failed to generate continuation for the response.',
				level: 'error',
				extra: {
					continuationPrompt,
					chatbotName: chatbot?.name,
				},
				tags: {
					feature: 'continuation-flow',
					component: 'ChatPanel',
				},
			})
		} finally {
			//? Reset states
			setIsCutOff(false)
			setIsContinuing(false)
		}
	}

	const isPreProcessing = Boolean(
		loadingState?.match(/processing|digesting|polishing/),
	)
	const formDisabled = isLoading || !chatbot || isPreProcessing
	const hiddenAnimationClasses =
		'p-2 gap-0 w-auto relative overflow-hidden [&:hover_span]:opacity-100 [&:hover_span]:w-auto [&:hover_span]:duration-300 [&:hover_svg]:mr-2 [&:hover_span]:transition-all'
	const hiddenAnimationItemClasses =
		'transition-all w-[0px] opacity-0 whitespace-nowrap duration-300'

	const prepareMessageOptions = useCallback(
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(chatOptions: any) => ({
			...chatOptions,
			powerUp: isPowerUp,
			reasoning: isDeepThinking,
			webSearch: webSearch,
		}),
		[isPowerUp, isDeepThinking, webSearch],
	)

	const isUserWhitelisted = userData?.proUserSubscriptionId
		? userData?.proUserSubscriptionId
		: WHITELIST_USERS.includes(userData?.email || '')

	return (
		<div
			className={cn(
				'fixed inset-x-0 bottom-0 z-20 w-full',
				'pb-4',
				'duration-300 ease-in-out animate-in',
				'bg-gradient-to-b from-background/50 to-background',
				'dark:from-background/0 dark:to-background/80',
				'lg:pl-[250px] xl:pl-[300px]',
				className,
			)}
		>
			<div className="relative mx-auto w-full">
				{/* Header Section */}
				<div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
					<div className="flex gap-4 justify-between items-center mx-2 w-full">
						<div className="flex items-center space-x-6 w-full max-w-[60%] overflow-y-hidden scrollbar scrollbar-thin">
							{/* Feature Toggles */}
							<FeatureToggle
								id="powerUp"
								name="Deep Expertise"
								icon={<GraduationCap />}
								activeIcon={<GraduationCap />}
								isActive={isPowerUp}
								onChange={togglePowerUp}
								activeColor="yellow"
							/>
							{/* Image Generation Toggle */}
							{appConfig.features.imageGeneration && isUserWhitelisted && (
								<ImageGenerationToggle />
							)}

							{appConfig.features.webSearch && (
								<FeatureToggle
									id="webSearch"
									name="Web Search"
									icon={<GlobeIcon />}
									activeIcon={<GlobeIcon />}
									isActive={webSearch}
									onChange={(newValue) => {
										console.log('ChatPanel: Toggle Web Search:', newValue)
										setWebSearch()
									}}
									activeColor="cyan"
								/>
							)}

							{/* Example Questions Toggle */}
							{appConfig.features.exampleQuestions && (
								<FeatureToggle
									id="exampleQuestions"
									name="Example Questions"
									icon={<Sparkles />}
									activeIcon={<Sparkles />}
									isActive={exampleQuestionsOpen}
									onChange={() =>
										setExampleQuestionsOpen(!exampleQuestionsOpen)
									}
									activeColor="cyan"
								/>
							)}
						</div>

						{/* Right side controls */}
						<div className="flex items-center gap-3.5">
							{showReload && (isLoading || isPreProcessing) && (
								<>
									{loadingState !== 'finished' && (
										<LoadingIndicator state={loadingState} />
									)}
									{isLoading && (
										<Button
											variant="outline"
											onClick={stop}
											className="bg-background"
										>
											<IconStop className="mr-2" />
										</Button>
									)}
								</>
							)}
							<ButtonScrollToBottom
								scrollToBottom={scrollToBottom}
								isAtBottom={isAtBottom}
								className={hiddenAnimationClasses}
								textClassName={hiddenAnimationItemClasses}
							/>
							{messages?.length >= 2 && isCutOff && (
								<Button
									variant="outline"
									size="icon"
									className={cn(
										hiddenAnimationClasses,
										'text-yellow-500 bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/30',
									)}
									onClick={() => handleContinueGeneration()}
								>
									<ChevronsLeftRightEllipsis className="transition-all" />
									<span className={hiddenAnimationItemClasses}>
										Continue message
									</span>
								</Button>
							)}
							{id && title && (
								<>
									<Button
										variant="outline"
										onClick={() => setShareDialogOpen(true)}
									>
										<IconShare className="mr-2" />
										Share
									</Button>
									<ChatShareDialog
										onCopy={() => setShareDialogOpen(false)}
										chat={{
											id,
											title,
											messages,
										}}
									/>
								</>
							)}
						</div>
					</div>
				</div>

				{/* Prompt Form Section */}
				<div
					className={cn(
						'flex relative flex-col w-full',
						'p-2 space-y-2 md:px-4 sm:space-y-4',
						'border-t shadow-lg bg-background',
						'dark:border-zinc-800 border-zinc-200',
						isOpenPopup ? 'dark:border-mirage border-iron' : '',
						'min-h-[64px] sm:min-h-[80px]',
					)}
				>
					{/* Conditionally render image generator or prompt form */}
					{isImageGeneration ? (
						<ImageGenerator />
					) : (
						<PromptForm
							onSubmit={async (value, chatOptions) => {
								scrollToBottom()
								await append(
									{
										id,
										content: value,
										role: 'user',
									},
									prepareMessageOptions(chatOptions),
								)
							}}
							disabled={formDisabled}
							input={input}
							setInput={setInput}
							isLoading={isLoading || isPreProcessing}
							placeholder={placeholder}
						/>
					)}
				</div>
			</div>

			{/* Example Questions Modal */}
			<Dialog
				open={exampleQuestionsOpen}
				onOpenChange={setExampleQuestionsOpen}
			>
				<DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden">
					<DialogHeader className="pb-4">
						<DialogTitle className="flex gap-4 items-center text-xl">
							Example questions
						</DialogTitle>
					</DialogHeader>

					<div className="overflow-y-auto max-h-[60vh] scrollbar-thin">
						<div className="flex flex-col p-4 space-y-2">
							{mockExampleQuestions.map((example) => (
								<Button
									key={example.id}
									variant="outline"
									className={cn(
										'justify-start text-left h-auto min-h-[70px] w-full p-4 border-2 transition-all duration-300',
										'hover:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950/20',
										'hover:shadow-lg hover:-translate-y-0.5',
										'group relative overflow-hidden',
										selectedExample === example.id
											? 'border-purple-500 bg-purple-50 dark:bg-purple-950/20 shadow-lg -translate-y-0.5'
											: 'border-zinc-200 dark:border-zinc-700 hover:border-purple-400',
									)}
									onClick={() => handleExampleClick(example.prompt, example.id)}
								>
									<div className="flex justify-between items-center w-full">
										<p className="text-sm font-medium leading-relaxed transition-colors duration-200 text-zinc-950 dark:text-gray-300 group-hover:text-purple-900 dark:group-hover:text-purple-100">
											{example.prompt}
										</p>
										<span className="text-xs opacity-0 transition-opacity text-muted-foreground group-hover:opacity-100">
											Click to use
										</span>
									</div>
								</Button>
							))}
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}
