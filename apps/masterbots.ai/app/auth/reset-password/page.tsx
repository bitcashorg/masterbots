import ResetPasswordForm from '@/components/auth/reset-password-form'

export default function ResetPasswordPage({
  searchParams
}: {
  searchParams: { token: string }
}) {
  return (
    <div className="container max-w-md mx-auto mt-10">
      <h1 className="mb-4 text-2xl font-bold">Reset Password</h1>
      <ResetPasswordForm token={searchParams.token} />
    </div>
  )
}