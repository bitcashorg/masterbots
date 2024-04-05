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
    <>
      <a
        className="flex items-center justify-center w-full py-2 mb-3 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md px-7 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        style={{ backgroundColor: '#3b5998' }}
        onClick={loginWithGoogle}
        role="button"
      >
        <Image
          className="pr-2"
          src="/images/google.svg"
          alt=""
          style={{ height: '2rem' }}
          width={35}
          height={35}
        />
        Continue with Google
      </a>
      <a
        className="flex items-center justify-center w-full py-2 text-sm font-medium leading-snug text-white uppercase transition duration-150 ease-in-out rounded shadow-md px-7 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg"
        style={{ backgroundColor: '#55acee' }}
        onClick={loginWithGitHub}
        role="button"
      >
        <Image
          className="pr-2"
          src="/images/github.svg"
          alt=""
          width={40}
          height={40}
        />
        Continue with GitHub
      </a>
    </>
  )
}
