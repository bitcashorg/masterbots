'use client'
import { UserCard } from "@/components/routes/profile/user-card"
import { useParams } from 'next/navigation'
import { useProfile } from '@/lib/hooks/use-profile'
import { useEffect, useState } from "react"
import { User } from "mb-genql"
import { useSession } from "next-auth/react"

export function Hero() {
  const { slug } = useParams()
  const { getuserInfo } = useProfile()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const session = useSession()

  // get user info
   async function UserInfoInit(){
    setLoading(true)
    const {user, error} =  await  getuserInfo(slug as string)
    if (error) {
      console.log(error)
    }
    setUser(user)
    setLoading(false)
    
  }

  useEffect(() => {
    if (slug) {
       UserInfoInit()
    }
  },[slug])


  //  if (!loading && !user) return null;
    return (
      <div className="relative bg-left-bottom py-10 bg-[url('/hero-bg.png')] bg-no-repeat ">
      <div className="absolute inset-0 bg-gradient-to-l from-mirage via-[#2B5D91]/80 to-[#388DE2]/80"></div>
      <div className="relative z-[2] md:px-0 px-5">
          <UserCard user={user} loading={loading} /> 
      </div>
    </div>
    )

}