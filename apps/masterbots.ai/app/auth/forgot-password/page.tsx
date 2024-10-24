import ForgotPasswordForm from '@/components/auth/forgot-password-form'

export default function ForgotPasswordPage() {
  return (
    <div className="container max-w-md mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Forgot Password</h1>
      <ForgotPasswordForm />
    </div>
  )
}