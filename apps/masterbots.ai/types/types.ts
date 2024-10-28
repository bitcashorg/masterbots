import type { Message } from 'ai'
import type { Chatbot, LabelChatbotCategory } from 'mb-genql'
import 'next-auth'
import type { DefaultSession, DefaultUser } from 'next-auth'
import type { ChatCompletionMessageParam } from 'openai/resources'
import type Stripe from 'stripe'

// * Chat types
export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  chatbot?: Chatbot
  threadId: string
  newThread?: boolean
  chatPanelClassName?: string
  isPopup?: boolean
  scrollToBottom?: () => void
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

export type CleanPromptResult = {
  language: string
  originalText: string
  improvedText: string
  translatedText: string
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
  prompt: {
    promptId: number
    content: string
  }
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
  status: string
}

export type Card = {
  last4: string
}
export const initialStateSubscription = {
  customer: {
    name: ''
  },
  plan: {
    amount: 0,
    interval: '',
    product: {
      name: ''
    }
  },
  current_period_start: 0,
  status: ''
}

// * AI SDK related types

export type ChatbotMetadataHeaders = {
  chatbot: number
  domain: number
}

export type ChatbotMetadata = Pick<
  LabelChatbotCategory['label'],
  'questions' | 'categories' | 'subCategories' | 'tags'
>

export type ReturnFetchChatbotMetadata = ChatbotMetadata | null

export type CoreMessage = {
  id: string
  content: string
  user: {
    id: string
    name: string
  }
}

export type AiClientType = 'OpenAI' | 'Anthropic' | 'Perplexity' | 'WordWare'

export type JSONResponseStream = {
  id: string
  model: string
  messages: ChatCompletionMessageParam[]
  previewToken: string
  stream?: boolean
  temperature?: number
  maxTokens?: number
}

// ? New type for streamText function parameters if needed
export type StreamTextParams = {
  model: any // ? Replace 'any' with the correct type from the SDK if available
  messages: CoreMessage[]
  temperature?: number
  maxTokens?: number
  topP?: number
  frequencyPenalty?: number
}

// * Next-auth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      hasuraJwt: string
      role?: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    role: string
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



export interface ChatPageProps {
  params: {
    category: string;
    chatbot?: string;
    threadId: string;
  };
}