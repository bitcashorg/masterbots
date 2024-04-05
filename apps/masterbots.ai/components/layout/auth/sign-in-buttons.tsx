'use client'

import { Button } from '@/components/ui/button'
import { useSupabaseClient } from '@/services/supabase'
import Image from 'next/image'

export const SignInButtons = () => {
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
          className="pr-2"
          src="/images/google.svg"
          alt=""
          width={25}
          height={25}
        />
        Google
      </Button>
      <Button onClick={loginWithGitHub} role="button">
        <Image
          className="pr-2"
          src="/images/github.svg"
          alt=""
          width={30}
          height={30}
        />
        GitHub
      </Button>
    </div>
  )
}
