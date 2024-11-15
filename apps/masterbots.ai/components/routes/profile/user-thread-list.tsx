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

export  function UserThreadList() {

    const { slug } = useParams()
    const { getuserInfo, isSameUser } = useProfile()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [threads, setThreads] = useState<any>(undefined)
    const { data: session } = useSession()

   async function UserInfoInit() {
       setLoading(true)
       try {
       let threads: Thread[] = []
        const { user, error } = await getuserInfo(slug  as string ?? '')
        if (error) {
             throw new Error(`Failed to fetch user info: ${error}`)
        }
        if(user && !isSameUser(user.userId)){
            threads = await getBrowseThreads({ userId: user?.userId });   
        }else{
           threads = await  getThreads({jwt: session?.user?.hasuraJwt as string, userId: user?.userId });
        }
        setUser(user)
        setThreads(threads)
      } catch (error) {
          console.error('Failed to fetch user data:', error);
         setThreads([]);
      } finally {
        setLoading(false)
       }
    }

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
    

    useEffect(() => {
        if (slug) {
            UserInfoInit()
        }
    }, [slug])

    if (!user) return null


    return (
        <>
        {threads && threads.length > 0 ? (
        <>
          <div className="flex px-4 py-5 md:px-10">
            <ThreadList
              threads={threads}
              loading={loading}
              count={threads.length}
              pageSize={PAGE_SIZE}
              loadMore={loadMore}
            />
          </div>
        </>
      ) : (
        ''
      )}
      {(!threads || threads.length === 0) && <ChatChatbotDetails page="profile" />}
       </>
    )
}