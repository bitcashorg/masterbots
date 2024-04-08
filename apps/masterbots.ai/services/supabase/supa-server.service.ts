import { UserProfile } from '@/hooks/use-global-store'
import { getUser } from '../hasura'
import { createSupabaseServerClient } from './supa-server-client'

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    return null
    // const supabase = await createSupabaseServerClient()
    // const {
    //   data: { user }
    // } = await supabase.auth.getUser()
    // if (!user || !user.email) throw new Error('user not found')

    // // TODO: use supabase
    // const userProfile = await getUser({
    //   email: user.email,
    //   adminSecret: process.env.HASURA_GRAPHQL_ADMIN_SECRET || ''
    // })

    // if (!userProfile) throw new Error('user not found')
    // return {
    //   userId: userProfile.userId,
    //   username: userProfile.username,
    //   name: '',
    //   email: userProfile.email,
    //   image: userProfile.profilePicture || ''
    // }
  } catch (error) {
    console.log('GET USER PROFILE ERROR', error)
    return null
  }
}
