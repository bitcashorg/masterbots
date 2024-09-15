import Stripe from 'stripe'
import {  type Message } from 'ai'
import { ChatCompletionMessageParam } from 'openai/resources'
import 'next-auth'
import { DefaultSession } from 'next-auth'

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
    } & DefaultSession['user']
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
