'use client'

import * as React from 'react'
import { getUserByUsername, updateUserPersonality } from '@/services/hasura'
import { useSession } from 'next-auth/react'

interface profileContextProps {
 getuserInfo: (username: string) => Promise<any>
 isSameUser: (userId: string) => boolean
 updateUserInfo: (bio: string | null, topic: string | null) => void
}

const profileContext = React.createContext<profileContextProps | undefined>(
  undefined
)

export function useProfile() {
  const context = React.useContext(profileContext)
  if (!context) {
    throw new Error('useProfileContext must be used within a ProfileProvider')
  }
  return context
}

interface ProfileProviderProps {
  children: React.ReactNode
}

export function ProfileProvider({ children }: ProfileProviderProps) {
   
    const { data: session } = useSession()

    const getuserInfo = async (username: string) => {
        const userInfo = await getUserByUsername({username });
        return userInfo  
    }
    const isSameUser = (userId: string) => {
       return session?.user.id === userId
    }

    const updateUserInfo = async( bio: string | null, topic: string | null) => {
       try{
        await updateUserPersonality({
          userId: session?.user.id,
          jwt: session?.user.hasuraJwt,
          bio,
          topic
         })
       }catch(e){
         console.log(e)
       }
    }


  return (
    <profileContext.Provider value={{ getuserInfo, isSameUser, updateUserInfo }}>
      {children}
    </profileContext.Provider>
  )
}
