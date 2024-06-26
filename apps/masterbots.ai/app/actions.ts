import {
  PlanList,
  Subscription,
  Card,
  initialStateSubscription
} from '@/lib/types'

export async function checkIfCustomerHasActiveSub(email: string) {
  const response = await fetch('/api/payment/subscription', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
  })

  const data: {
    error?: string
    active: boolean
  } = await response.json()

  if (data.error) {
    console.error('Error while checking customer data: ', data.error)
    return true
  }

  return Boolean(!data.active)
}

export async function getSubscriptionPlans({
  handleSetStripePublishKey,
  handleSetStripeSecret
}: {
  handleSetStripePublishKey: (key: string) => void
  handleSetStripeSecret: (key: string) => void
}) {
  let plans: PlanList[] = []

  try {
    const response = await fetch('/api/payment/plans', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: {
      plans: PlanList[]
      stripeSecret: string
      stripe_publishable: string
      error?: string
    } = await response.json()
    // remove the free plan from the list
    handleSetStripePublishKey(data.stripe_publishable)
    handleSetStripeSecret(data.stripeSecret)

    data.plans = data.plans.filter((plan: any) => plan.unit_amount !== 0)
    // show the plans in ascending order
    data.plans.sort((a: any, b: any) => b.unit_amount - a.unit_amount)

    plans = data.plans as PlanList[]
  } catch (error) {
    console.error('Error fetching plans:', error)
  }

  return plans
}

export const fetchPayment = async (intentid: string) => {
  let subscription: Subscription = initialStateSubscription
  let card: Card = { last4: '' }

  try {
    const response = await fetch(
      `/api/payment/subscription?paymentIntentId=${intentid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data: {
      subscription: Subscription
      card: { card: Card }
    } = await response.json()

    subscription = data.subscription
    card = data.card.card
  } catch (error) {
    console.error('Error fetching plans:', error)
  }
  return { subscription, card }
}
