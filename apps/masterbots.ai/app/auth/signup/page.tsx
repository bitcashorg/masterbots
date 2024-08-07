import Image from 'next/image'
import SignUpForm from '@/components/auth/signup-form'

export default function SignUpPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.16))] items-center py-10">
      <div
        className="relative flex justify-center w-full max-w-[726px] py-4 text-center "
        style={{ height: 200 }}
      >
        <Image
          src="/images/masterbotslogo.png"
          fill={true}
          alt="Masterbots Logo"
          style={{ maxWidth: 726, objectFit: 'contain' }}
          className="flex self-center"
        />
      </div>
      <div className="max-w-md mx-auto space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-muted-foreground">
            Enter your email and password to create your account.
          </p>
        </div>
        <SignUpForm />
      </div>
    </div>
  )
}