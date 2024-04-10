'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useSupabaseClient } from '@/services/supabase'
import { useRouter } from 'next/navigation'

export function SignInButtons({ hostname }: { hostname: string }) {
  const supabase = useSupabaseClient()
  const router = useRouter()

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${hostname}/auth/callback`
      }
    })
  }

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${hostname}/auth/callback`
      }
    })
  }

  return (
    <div className="flex gap-5">
      <Button onClick={loginWithGoogle} role="button">
        <Image
          alt=""
          className="pr-2"
          height={25}
          src="/images/google.svg"
          width={25}
        />
        Google
      </Button>
      <Button onClick={loginWithGitHub} role="button">
        <Image
          alt=""
          className="pr-2"
          height={30}
          src="/images/github.svg"
          width={30}
        />
        GitHub
      </Button>
    </div>
  )
}
