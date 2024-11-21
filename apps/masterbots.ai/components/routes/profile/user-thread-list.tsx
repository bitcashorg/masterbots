'use client'
import { getBrowseThreads, getThreads } from "@/services/hasura";
import UserThreadPanel from "../thread/user-thread-panel";
import { useProfile } from "@/lib/hooks/use-profile";
import { Thread, User } from "mb-genql";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ThreadList from "../thread/thread-list";
import ChatChatbotDetails from "../chat/chat-chatbot-details";
import { useSession } from 'next-auth/react'

const PAGE_SIZE = 30

export  function UserThreadList({ user, threads }: { user: User, threads: Thread[] }) {

    const { isSameUser } = useProfile()
    const [loading, setLoading] = useState(false)
    const [nThreads, setThreads] = useState<Thread[]>(threads || [])
    const { data: session } = useSession()


    const loadMore = async () => {
        console.log('🟡 Loading More Content')
        setLoading(true)
       let moreThreads: Thread[] = []
        if(user && !isSameUser(user.userId)){
          moreThreads = await getBrowseThreads({ userId: user.userId, offset: threads.length });
        }else{
         moreThreads = await getThreads({
          jwt: session!.user?.hasuraJwt,
          userId: session!.user.id,
          offset: threads.length
        })
      }
      if (moreThreads) setThreads((prevState: Thread[] = []) => [...prevState, ...moreThreads])
         setLoading(false)
      }
    

    if (!user) return null
      
    return (
      <div className="max-w-screen-lg pb-10 mx-auto w-full">
       <UserThreadPanel  threads={nThreads} page="profile" />
      </div>
    )
}