'use client'

import { ChatMessage } from '@/components/routes/chat/chat-message'
import { ChatShareDialog } from '@/components/routes/chat/chat-share-dialog'
import { ButtonScrollToBottom } from '@/components/shared/button-scroll-to-bottom'
import { FeatureToggle } from '@/components/shared/feature-toggle'
import { LoadingIndicator } from '@/components/shared/loading-indicator'
import { Button } from '@/components/ui/button'
import { IconRefresh, IconShare, IconStop } from '@/components/ui/icons'
import { useDeepThinking } from '@/lib/hooks/use-deep-thinking'
import { usePowerUp } from '@/lib/hooks/use-power-up'
import { useThread } from '@/lib/hooks/use-thread'
import { useWorkspace } from '@/lib/hooks/use-workspace'
import { cn } from '@/lib/utils'
import { EnterIcon } from '@radix-ui/react-icons'
import type { Message as AiMessage } from 'ai'
import type { UseChatHelpers } from 'ai/react'
import { BrainIcon, FileEditIcon, GlobeIcon, GraduationCap } from 'lucide-react'
import { appConfig } from 'mb-env'
import type { Chatbot } from 'mb-genql'
import { useCallback, useState } from 'react'

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
	// Optional prop to control workspace toggle from parent
	onToggleWorkspace?: () => void
}

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
	onToggleWorkspace,
}: ChatPanelProps) {
	const { isOpenPopup, loadingState, webSearch, setWebSearch } = useThread()
	const { isPowerUp, togglePowerUp } = usePowerUp()
	const { isDeepThinking, toggleDeepThinking } = useDeepThinking()
	const { isWorkspaceActive, toggleWorkspace } = useWorkspace()
	const [shareDialogOpen, setShareDialogOpen] = useState(false)

	const isPreProcessing = Boolean(
		loadingState?.match(/processing|digesting|polishing/),
	)
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

	// Display the chat messages with the correct components
	const renderMessages = () => {
		return messages.map((message, index) => (
			<ChatMessage
				key={message.id || `message-${index}`}
				message={message}
				onCreateDocument={(props) => {
					// Handle document creation
					console.log('ChatPanel: Create document', props)
					// @ts-ignore
					if (props.onCreateDocument) {
						// @ts-ignore
						props.onCreateDocument()
					}
				}}
			/>
		))
	}

	return (
		<div
			className={cn(
				'z-[2] fixed inset-x-0 bottom-0 w-full',
				'pb-4',
				'animate-in duration-300 ease-in-out',
				'bg-gradient-to-b from-background/50 to-background',
				'dark:from-background/0 dark:to-background/80',
				'lg:pl-[250px] xl:pl-[300px]',
				className,
			)}
		>
			<div className="relative w-full mx-auto">
				{/* Message Display Area */}
				<div
					className="px-4 py-2 space-y-4 mx-auto max-w-screen-lg"
					// Add a stable container ID to prevent message conflicts
					id="chat-messages-container"
				>
					{/* Message list container */}
					<div>{renderMessages()}</div>
				</div>

				{/* Header Section */}
				<div className="flex flex-col items-center justify-between w-full px-2 py-3.5 space-y-2 bg-background md:flex-row md:space-y-0">
					<div className="flex items-center justify-between w-full gap-4 mx-2">
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

							<FeatureToggle
								id="reasoning"
								name="Deep Thinking"
								icon={<BrainIcon />}
								activeIcon={<BrainIcon />}
								isActive={isDeepThinking}
								onChange={() => {
									console.log('ChatPanel: Toggle Deep Thinking')
									toggleDeepThinking()
								}}
								activeColor="green"
							/>

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

							{/* Workspace Toggle */}
							<FeatureToggle
								id="workspace"
								name="Workspace"
								icon={<FileEditIcon />}
								activeIcon={<FileEditIcon />}
								isActive={isWorkspaceActive}
								onChange={onToggleWorkspace || toggleWorkspace}
								activeColor="cyan"
							/>
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
							{messages?.length >= 2 && (
								<Button
									variant="outline"
									size="icon"
									className={hiddenAnimationClasses}
									onClick={() => reload()}
								>
									<IconRefresh className="transition-all" />
									<span className={hiddenAnimationItemClasses}>Regenerate</span>
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
						'relative flex flex-col w-full',
						'p-2 sm:px-4 space-y-2 sm:space-y-4',
						'border-t shadow-lg bg-background',
						'dark:border-zinc-800 border-zinc-200',
						isOpenPopup ? 'dark:border-mirage border-iron' : '',
						'min-h-[64px] sm:min-h-[80px]',
					)}
				>
					<form
						className="relative flex flex-col w-full px-4 py-2"
						onSubmit={async (e) => {
							e.preventDefault()
							if (!input?.trim() || isLoading || isPreProcessing) return

							scrollToBottom()
							await append(
								{
									id,
									content: input,
									role: 'user',
								},
								prepareMessageOptions({}),
							)
							setInput('')
						}}
					>
						<div className="relative flex w-full gap-2 sm:gap-4">
							<textarea
								tabIndex={0}
								rows={1}
								value={input}
								onChange={(e) => setInput(e.target.value)}
								placeholder={placeholder}
								spellCheck={false}
								className="min-h-[60px] w-full resize-none bg-background px-3 py-3 sm:text-sm border rounded-md"
								disabled={isLoading || !chatbot || isPreProcessing}
							/>
							<button
								type="submit"
								className="shrink-0 h-10 w-10 rounded-md bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-50"
								disabled={
									isLoading || !input.trim() || !chatbot || isPreProcessing
								}
								aria-label="Send message"
							>
								<EnterIcon className="size-4" />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
