'use client'
import { UserCard } from "@/components/routes/profile/user-card"
import { useParams } from 'next/navigation'
import { useProfile } from '@/lib/hooks/use-profile'
import { useEffect, useState } from "react"
import { User } from "mb-genql"

export function Hero() {
  const { slug } = useParams()
  const { getuserInfo } = useProfile()
  const [user, setUser] = useState<User | null>(null)

  // get user info
   async function UserInfoInit(){
    const {user, error} =  await  getuserInfo(slug as string)
    if (error) {
      console.log(error)
    }
    setUser(user)
    
  }


  useEffect(() => {
    if (slug) {
       UserInfoInit()
    }
  },[slug])


  if (!user) return null

    return (
      <div className="relative bg-left-bottom py-10 bg-[url('/hero-bg.png')] bg-no-repeat ">
      <div className="absolute inset-0 bg-gradient-to-l from-mirage via-[#2B5D91]/80 to-[#388DE2]/80"></div>
      <div className="relative z-[2] ">
       <UserCard user={user} />
      </div>
    </div>
    )

}