'use client'
import { Button } from '@/components/ui/button'

export default function SignOut() {
  async function handleSignOut() {
    // const { error } = await supabase.auth.signOut()
    // if (error) {
    //   // eslint-disable-next-line no-console
    //   console.error('ERROR:', error)
    // }
  }

  return (
    <Button className="button-inverse" onClick={handleSignOut} type="button">
      Sign Out
    </Button>
  )
}
