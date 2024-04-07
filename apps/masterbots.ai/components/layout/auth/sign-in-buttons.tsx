'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useSupabaseClient } from '@/services/supabase'

export function SignInButtons() {
  const supabase = useSupabaseClient()

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`
      }
    })
  }

  const loginWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`
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
