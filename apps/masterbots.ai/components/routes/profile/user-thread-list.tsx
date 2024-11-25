'use client'
import UserThreadPanel from "../thread/user-thread-panel";
import { Thread, User } from "mb-genql";

export  function UserThreadList({ user, threads }: { user: User, threads: Thread[] }) {

    if (!user) return null 
    return (
      <div className="max-w-screen-lg pb-10 mx-auto w-full">
       <UserThreadPanel  threads={threads} page="profile" />
      </div>
    )
}