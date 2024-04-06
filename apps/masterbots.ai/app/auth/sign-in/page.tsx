import Image from 'next/image'
import { SignInButtons } from '@/components/layout/auth/sign-in-buttons'

export default async function SignInPage() {
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
          style={{ maxWidth: 726 }}
          className="flex self-center"
        />
      </div>

      <div className="flex justify-center pt-10">
        <SignInButtons />
      </div>
    </div>
  )
}
