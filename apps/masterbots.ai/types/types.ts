import type { mbObjectSchema } from '@/lib/helpers/ai-helpers'
import type { WordWareFlowPaths } from '@/types/wordware-flows.types'
import type { Message, streamText } from 'ai'
import type { userRole } from 'mb-drizzle'
import type {
	Chatbot,
	Example,
	Message as MBMessage,
	Prompt,
	SocialFollowing,
	Thread,
} from 'mb-genql'
import 'next-auth'
import type { DefaultSession, DefaultUser } from 'next-auth'
import type OpenAI from 'openai'
import type {
	FunctionToolCall,
	ToolCall,
} from 'openai/resources/beta/threads/runs/steps.mjs'
import type React from 'react'
import type Stripe from 'stripe'

// * Chat types
export interface Chat extends Record<string, unknown> {
	id: string
	title: string
	createdAt: Date
	userId: string
	path: string
	messages: Message[]
	sharePath?: string
}

export type AiToolCall = ToolCall &
	FunctionToolCall & {
		toolCallId: string
		toolName: WordWareFlowPaths
		args: Record<string, unknown>
	}

export interface ChatProps extends React.ComponentProps<'div'> {
	initialMessages?: Message[]
	chatbot?: Chatbot
	newThread?: boolean
	chatPanelClassName?: string
	isPopup?: boolean
	scrollToBottom?: () => void
	scrollToBottomOfPopup?: () => void
	isAtBottom?: boolean
}

export type ChatLoadingState =
	| 'processing'
	| 'digesting'
	| 'generating'
	| 'idle'
	| 'polishing'
	| 'ready'
	| 'finished'
	| 'continuing'

export type CleanPromptResult = {
	language: string
	originalText: string
	improvedText: string
	improved?: boolean
}

export type ServerActionResult<Result> = Promise<
	| Result
	| {
			error: string
	  }
>

// * Prompt types

export type PromptProps = {
	prompt: Pick<Prompt, 'promptId' | 'content' | 'type'>
}

// * Stripe components types

export type PlanCardProps = {
	selectedPlan: string
	handlePlanChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	plan: StripePlan
}

export interface StripePlan extends Stripe.Plan, Stripe.Plan.Tier {
	product: Stripe.Product
	recurring: {
		interval: Stripe.Plan.Interval
		interval_count: number
		aggregate_usage: Stripe.Plan.AggregateUsage
		usage_type: Stripe.Plan.UsageType
		// ? Plans are returning null
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		meter: any
		trial_period_days: number | null
	}
	duration?: string
}

export type PlansPros = {
	next: () => void
	prev: () => void
	close: () => void
	goTo: (index: number) => void
}

export type PlanList = StripePlan

export type Subscription = {
	customer: {
		name: string
	}
	plan: {
		amount: number
		interval: string
		product: {
			name: string
		}
	}
	current_period_start: number
	current_period_end: number
	status: string
}

export type Card = {
	last4: string
}
export const initialStateSubscription = {
	customer: {
		name: '',
	},
	plan: {
		amount: 0,
		interval: '',
		product: {
			name: '',
		},
	},
	current_period_start: 0,
	current_period_end: 0,
	status: '',
}

// * AI SDK related types

export type ChatbotMetadata = {
	domainName: string
	tags: string[]
	categories:
		| Record<string, string>[]
		| {
				[key: string]: string
		  }[]
}

export type ChatbotMetadataClassification = {
	domainName: string
	categories: string[]
	tags: string[]
	errors?: string[]
}

export type ExampleMetadata = Example & {
	messageId: string
	role: string
	content: string
	createdAt: string
	tags: string[]
	category: string
	subcategory: string
	prompt: string
	response: string
	cumulativeSum?: number
}

export interface ChatbotMetadataExamples {
	tagExamples: ExampleMetadata[]
	categoryExamples: ExampleMetadata[]
	domainExamples: ExampleMetadata[]
}

export interface ThreadState {
	threads: Thread[]
	count: number
	totalThreads: number
}

export type ChatbotMetadataHeaders = {
	chatbot: number
	isPowerUp: boolean
}

export type ReturnFetchChatbotMetadata = ChatbotMetadata | null

export type AiClientType =
	| 'OpenAI'
	| 'Anthropic'
	| 'Perplexity'
	| 'DeepSeek'
	| 'GroqDeepSeek'
	| 'Gemini'

export type JSONResponseStream = {
	model: string
	id?: string
	messages?: OpenAI.ChatCompletionMessageParam[]
	previewToken?: string
	isPowerUp?: boolean
	webSearch?: boolean
	stream?: boolean
	temperature?: number
	maxTokens?: number
	chatbot?: Pick<Chatbot, 'categories' | 'chatbotId'>
}

// ? New type for streamText function parameters if needed
export type StreamTextParams = Parameters<typeof streamText>[0]

// * Next-auth types
declare module 'next-auth' {
	interface Session {
		user: {
			id: string
			email: string
			hasuraJwt: string
			role?: string
			slug?: string
		} & DefaultSession['user']
	}

	interface User extends DefaultUser {
		role: string
		slug: string
	}

	interface JWT {
		id: string
		email: string
		name: string
		image?: string
		role?: string
		provider: string
		hasuraJwt?: string
	}
}

// * Utils types
export interface Plan {
	id: string
	duration: string
	price: number
	features: string[]
	features_title: string
}

export interface PageProps {
	params: Promise<{
		botSlug?: string
		userSlug?: string
		category?: string
		chatbot?: string
		domain?: string
		threadSlug?: string
		threadQuestionSlug?: string
	}>
}

export interface ChatMessageProps extends React.ComponentProps<'div'> {
	message: Message & Partial<MBMessage>
	sendMessageFromResponse?: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
	chatbot?: Chatbot
	actionRequired?: boolean
	webSearchResults?: WebSearchResult[]
	isGenerating?: boolean
}

//* Reference result manipulations props
export interface WebSearchResult {
	title: string
	url: string
	description: string
	thumbnail?: {
		src: string
	}
	profile: {
		name: string
	}
}

export interface ClickableTextProps {
	children: React.ReactNode
	isListItem: boolean
	node?: Element
	webSearchResults?: WebSearchResult[]
	onReferenceFound?: (ref: WebSearchResult) => void
	sendMessageFromResponse?: (
		messageData: SendMessageFromResponseMessageData,
		callback?: () => void,
	) => void
	parentContext?: string
}
// * Drizzle Admin types
export type AdminUserUpdate = {
	isBlocked?: boolean
	isVerified?: boolean
	proUserSubscriptionId?: string
	getFreeMonth?: boolean
	role?: 'admin' | 'user' | 'moderator' | 'anonymous'
}

// * Chatbot details types
export interface ChatbotDetailsProps {
	botName?: string
	avatar?: string
	description?: string | null
	threadCount?: number
	followersCount?: number
	isWelcomeView?: boolean
	categoryName?: string
	onNewChat?: () => void
	followers?: SocialFollowing[]
	onFollow?: () => void
}

export interface BrowseChatbotDetailsProps {
	chatbot?: Chatbot
	variant?: 'default' | 'selected'
}

export interface BrowseChatbotLayoutProps {
	chatbot: Chatbot
	variant: 'default' | 'selected'
	isLoading: boolean
	generateType?: string | undefined
	lastMessage: string | null
	onGenerateBio: () => void
	isWelcomeView: boolean
	descriptionPoints: string[]
	hasMultiplePoints: boolean
	botUrl: string
	followers?: SocialFollowing[]
	onFollow?: () => void
	followersCount?: number
}

export type UUID = `${string}-${string}-${string}-${string}-${string}`

export interface MBObjectHook {
	schema: keyof typeof mbObjectSchema
}

export type MBSchema = 'metadata' | 'tool' | 'examples'

export interface ClassifyQuestionParams {
	prompt: string
	clientType: AiClientType
	chatbotMetadata: ChatbotMetadata
	maxRetries?: number
	retryCount?: number
	domain?: string
}

export interface ParsedText {
	clickableText: string // The text that appears clickable
	restText: string // The text that follows (for visual rendering)
	fullContext: string // The full sentence context for the follow-up question
}

export type ControlType =
	| 'switch'
	| 'toggle'
	| 'button'
	| 'plus'
	| 'dangerButton'
	| 'toggleGroup'
export type PreferenceItemType = {
	buttonId?: string
	title: string
	description: string
	type?: string
	props?: Record<string, string>
	defaultChecked?: boolean
	icon?: React.ElementType
	buttonText?: string
}

export type PreferenceSectionProps = {
	title: string
	items: PreferenceItemType[]
	variant?: 'default' | 'danger'
}

export type CustomSonnerParams = {
	type: 'success' | 'error' | 'info'
	text: string
}

export interface ContinueAIGenerationOptions {
	// biome-ignore lint/suspicious/noExplicitAny: <we are using any in the meantime>
	setLoadingState: (state: any) => void
	// biome-ignore lint/suspicious/noConfusingVoidType: <void is being included in the return type>
	customSonner: (params: CustomSonnerParams) => string | number | void
	devMode: boolean
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	chatConfig?: Record<string, any>
	maxAttempts?: number
	jwt?: string // JWT for authentication
}

export type SendMessageFromResponseMessageData = {
	bulletContent: string
	messageId: string
}

export interface StoredImagePart {
	type: 'file' | 'image'
	data: string
	mimeType: string
}

export type MessageWithExamples = MBMessage & {
	examples?: StoredImagePart[]
}

/**
 * Types for image generation functionality
 */

// Supported image generation providers
export type ImageProviderType = 'openai'

// OpenAI model IDs for image generation
export type OpenAIImageModel = 'dall-e-2' | 'dall-e-3' | 'gpt-image-1'

// Image generation request payload
export interface GenerateImageRequest {
	prompt: string
	modelId: OpenAIImageModel
}

// Image generation response payload
export interface GenerateImageResponse {
	image?: string // base64 encoded image
	error?: string
}

// Represents a generated image with metadata
export interface GeneratedImage {
	id: string
	prompt: string
	base64: string
	modelId: OpenAIImageModel
	timestamp: number
	provider: ImageProviderType
}

// Image error information
export interface ImageError {
	message: string
	modelId?: string
}

// Timing information for image generation
export interface ImageTiming {
	startTime?: number
	completionTime?: number
	elapsed?: number
}

// Enhanced message type that includes image data
export interface ImageMessage {
	id: string
	role: 'assistant'
	content: string // Original prompt
	image: GeneratedImage
}

// Helper to check if a message contains image data
export function isImageMessage(message: any): message is ImageMessage {
	return (
		message &&
		typeof message === 'object' &&
		message.role === 'assistant' &&
		message.image &&
		typeof message.image === 'object' &&
		typeof message.image.base64 === 'string'
	)
}

export interface ImageDisplayProps {
	/**
	 * Base64 encoded image data
	 */
	imageData: string

	/**
	 * Model ID that generated the image
	 */
	modelId: string

	/**
	 * Timing information for the generation
	 */
	timing?: ImageTiming

	/**
	 * Whether the image generation failed
	 */
	failed?: boolean

	/**
	 * Icon to show when generation failed
	 */
	fallbackIcon?: React.ReactNode

	/**
	 * Alt text for the image
	 */
	alt?: string

	/**
	 * Additional class name
	 */
	className?: string
}

export interface ImageMessageProps {
	/**
	 * The message containing image data
	 */
	message: ImageMessage

	/**
	 * Whether to show message actions
	 */
	actionRequired?: boolean

	/**
	 * Additional class name
	 */
	className?: string
}

export interface ImageToggleContextType {
	/**
	 * Whether image generation mode is enabled
	 */
	isImageGeneration: boolean

	/**
	 * Toggle image generation mode
	 */
	toggleImageGeneration: () => void

	/**
	 * Enable image generation mode
	 */
	enableImageGeneration: () => void

	/**
	 * Disable image generation mode
	 */
	disableImageGeneration: () => void
}

export interface UseImageGenerationReturn {
	/**
	 * The generated image data
	 */
	generatedImage: GeneratedImage | null

	/**
	 * Error information if generation failed
	 */
	error: ImageError | null

	/**
	 * Timing information for generation
	 */
	timing: ImageTiming

	/**
	 * Whether an image is currently being generated
	 */
	isLoading: boolean

	/**
	 * The prompt that was used for generation
	 */
	activePrompt: string

	/**
	 * Generate an image with the given prompt and model
	 */
	generateImage: (prompt: string, modelId: OpenAIImageModel) => Promise<void>

	/**
	 * Reset the generation state
	 */
	resetState: () => void

	/**
	 * Add the generated image to the chat
	 */
	addImageToChat: () => void
}
