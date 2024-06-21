import { PlanList } from "@/lib/types";

export async function checkIfCustomerHasActiveSub(email: string) {
  const response = await fetch('/api/payment/subscription', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const data: {
    error?: string;
    active: boolean;
  } = await response.json();

  if (data.error) {
    console.error('Error while checking customer data: ', data.error);
    return true;
  }

  return Boolean(!data.active);
}

export async function getSubscriptionPlans({
  handleSetStripePublicKey,
  handleSetStripeSecret
}: {
  handleSetStripePublicKey: (key: string) => void
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
      plans: PlanList[],
      stripe_secret: string,
      stripe_publishable: string
      error?: string
    } = await response.json()
    // remove the free plan from the list
    handleSetStripePublicKey(data.stripe_publishable)
    handleSetStripeSecret(data.stripe_secret)

    data.plans = data.plans.filter((plan: any) => plan.unit_amount !== 0)
    // show the plans in ascending order
    data.plans.sort((a: any, b: any) => b.unit_amount - a.unit_amount)

    plans = data.plans as PlanList[]
  } catch (error) {
    console.error('Error fetching plans:', error)
  }

  return plans
}