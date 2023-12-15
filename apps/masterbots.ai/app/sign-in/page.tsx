import { auth } from '@/auth'
import { LoginButton } from '@/components/login-button'
import { redirect } from 'next/navigation'
import Image from 'next/image'

export default async function SignInPage() {
  const session = await auth()
  // redirect to home if user is already logged in
  if (session?.user) redirect('/')
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
        <LoginButton />
      </div>
    </div>
  )
}
