import Link from 'next/link'
import Image from 'next/image'
import SignInForm from '@/components/auth/signin-form'

export default function SignInPage() {
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
            Enter your email and password to access your account.
          </p>
        </div>
        <SignInForm />
        <div className="space-y-4">
          <div className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="underline" prefetch={false}>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}