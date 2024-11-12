'use client'
import { getBrowseThreads } from "@/services/hasura";
import UserThreadPanel from "../thread/user-thread-panel";
import { useProfile } from "@/lib/hooks/use-profile";
import { User } from "mb-genql";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export  function UserThreadList() {

    const { slug } = useParams()
    const { getuserInfo, isSameUser } = useProfile()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    const [threads, setThreads] = useState<any>(undefined)

   async function UserInfoInit() {
       setLoading(true)
        const { user, error } = await getuserInfo(slug as string)
        if (error) {
            console.log(error)
        }
        if(user && !isSameUser(user.userId)){
            const list = await getBrowseThreads({ userId: user.userId });
             setThreads(list || [])
        }
        setUser(user)
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
        {loading && <div>Loading...</div>}
        { user?.threads?.length === 0 && <div>No threads found</div>}
        {!loading  &&  <UserThreadPanel  threads={threads} />}
       </>
    )
}