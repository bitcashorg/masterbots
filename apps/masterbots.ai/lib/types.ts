import Stripe from 'stripe'

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

export type PromptProps = {
  prompt: {
    promptId: number,
    content: string,
  }
}

export type Message = {
  id: string,
  role: "function" | "system" | "user" | "data" | "assistant" | "tool",
  content: string,
  createdAt: Date,
}

// ? Stripe components types

export type PlanCardProps = {
  selectedPlan: string
  handlePlanChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  plan: StripePlan,
}

// ? Stripe Types

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
