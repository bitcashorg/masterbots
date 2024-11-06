'use client'

import * as React from 'react'
import { getUserByUsername } from '@/services/hasura'
import { useSession } from 'next-auth/react'

interface profileContextProps {
 getuserInfo: (username: string) => Promise<any>
 isSameUser: (userId: string) => boolean
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


  return (
    <profileContext.Provider value={{ getuserInfo, isSameUser }}>
      {children}
    </profileContext.Provider>
  )
}
