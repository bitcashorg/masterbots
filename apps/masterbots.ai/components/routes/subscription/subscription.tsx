'use client'

import { checkIfCustomerHasActiveSub } from '@/app/actions'
import { ErrorContent } from '@/components/shared/error-content'
import type { WizardStep } from '@/components/ui/wizard'
import DialogWizard from '@/components/ui/wizard'
import { usePayment } from '@/lib/hooks/use-payment'
import { useRouter } from 'next/navigation'
import { useAsync } from 'react-use'
import { Checkout } from '@/components/routes/subscription/checkout'
import { WrappedPaymentInformation } from '@/components/routes/subscription/payment-information'
import { Plans } from '@/components/routes/subscription/plans'
import { SuccessContent } from '@/components/routes/subscription/succes-content'

const steps: WizardStep[] = [
  { component: Plans, name: 'Plans' },
  { component: WrappedPaymentInformation, name: 'Payment' },
  { component: Checkout, name: 'Checkout' },
  { component: SuccessContent, name: 'Success' },
]

export default function Subscription({ user }: { user: { email: string; name: string } }) {
  const router = useRouter()
  const { handleSetUser, handleDeleteCustomer, handleSetLoading, handleSetError, paymentIntent } = usePayment()

  const { value: openDialog } = useAsync(async () =>
    await checkIfCustomerHasActiveSub(user.email)
  )
  handleSetUser(user)

  const handleCloseWizard = async () => {
    if ( typeof paymentIntent === 'object' && paymentIntent !== "") return router.push('/c/p')
    const del = await handleDeleteCustomer(user?.email)
    handleSetLoading(false)
    handleSetError('')
    if (del) return router.push('/c')
  }

  return (
    <div className="flex items-center justify-center">
      <DialogWizard
        handleCloseWizard={handleCloseWizard}
        dialogOpen={Boolean(openDialog)}
        steps={steps}
        headerTitle="Masterbots Subscription plans"
        errorComponent={<ErrorContent />}
      />
    </div>
  )
}
