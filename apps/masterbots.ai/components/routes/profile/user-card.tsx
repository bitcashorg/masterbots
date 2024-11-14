import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { BookUser, BotIcon, MessageSquareHeart,   Wand2, ImagePlus, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from 'mb-genql'
import { useProfile } from '@/lib/hooks/use-profile'
import { type Message, useChat } from "ai/react";
import { nanoid, removeSurroundingQuotes } from '@/lib/utils'
import { useModel } from '@/lib/hooks/use-model'
import toast from 'react-hot-toast'
import { UserPersonalityPrompt } from '@/lib/constants/prompts'
import {  useEffect, useState } from 'react'

interface UserCardProps {
  user: User | null
  loading?: boolean
}
export function UserCard({ user, loading }: UserCardProps) {
  const { isSameUser, updateUserInfo } = useProfile()
  const isOwner = isSameUser(user?.userId);
  const { selectedModel, clientType } = useModel()
  const [bio, setBio] = useState<string | null | undefined>(user?.bio)
  const [isLoading, setIsLoading] = useState(false)
  const [generateType, setGenerateType] = useState<string | undefined>("")
  const [favouriteTopic, setFavouriteTopic] = useState<string | null | undefined>(user?.favouriteTopic)
  

  const userQuestions = user?.threads.map((thread) => {
    return {
      id: thread.threadId,
      content: thread.messages[0].content,
      createdAt:  new Date(),
      role: "user" as Message["role"],
    }
  })
  const [lastMessage, setLastMessage] = useState<string | null>(null)

  const { append } = useChat({
    initialMessages: userQuestions,
    id: nanoid(),
    body: {
      id: nanoid(),
      model: selectedModel,
      clientType,
    },
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText)
      }
      setIsLoading(false)
    },
    async onFinish(message) {
      setLastMessage(message.content)
    },
  })
  
  useEffect(() => {
    handleUpdateUserInfo()
  }, [lastMessage])


  const handleUpdateUserInfo = async() => {
    if (lastMessage) { 
      if (generateType === 'topic') {
        setFavouriteTopic(removeSurroundingQuotes(lastMessage))
        updateUserInfo(null, removeSurroundingQuotes(lastMessage))
      } else {
        setBio(removeSurroundingQuotes(lastMessage))
        updateUserInfo(removeSurroundingQuotes(lastMessage), null)
      }
      setIsLoading(false)
    }
  }
 
  const generateBio = (type: string) => {
    setIsLoading(true)
    setGenerateType(type)
    if(userQuestions) {
    const promptContent = UserPersonalityPrompt(type, userQuestions)
      return append({
        id: nanoid(),
        content: promptContent,
        role: 'system',
        createdAt: new Date(),
      })
   }
  }
  return (
    <div
      className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
       md:min-h-[290px]
        flex flex-row gap-3 mx-auto font-geist"
    > {
      loading &&  !user && (
        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <Loader className="w-16 h-16 text-white" />
        </div>
      )
    }
    {
      !loading && user && (
        <div className="relative w-full">
        <div className="space-y-1 ">
          {/* Profile Name */}
          <h2 className="md:text-2xl  text-xl font-semibold">{user?.username}</h2>
          <div className="items-center space-x-1 md:hidden flex">
                <BotIcon className="w-4 h-4" />
              <span className="">Threads:</span>
              <span className='text-gray-500'>{user?.threads.length}</span>
            </div>
          <div className="flex items-center space-x-1">
            <BookUser className="w-4 h-4" />
            <p className="text-sm  ">bio:</p>
            {isOwner && (
             <Button disabled={isLoading && generateType === 'bio'} variant="ghost" onClick={() => generateBio('bio')} className="text-sm text-gray-500 border p-2 border-black dark:border-gray-400 hover:text-black dark:hover:text-gray-400">
               { bio ? 'Re-generate' : 'generate'}   
               {isLoading && generateType === 'bio' ? <Loader className="w-4 h-4 ml-1" /> : <Wand2 className="w-4 h-4 ml-1" />}
             </Button>
            )}
           
          </div>
          <Separator className="bg-gray-300 text-white dark:bg-mirage" />

          {/* Bio Section */}
          <div className="space-y-2 min-h-16 md:mr-0  ">
          {isOwner && !bio && (
            <p className="text-[13px] font-normal text-gray-500 md:w-[400px]">
              click <Button variant="ghost" className="text-xs text-gray-500 p-1 hover:text-black dark:hover:text-gray-400"> generate <Wand2 className="w-4 h-4 ml-1" /></Button>
               to create a Masterbots biography based on your thread history.
            </p>
          )}
          {bio && (
           <p className="text-sm text-gray-500 md:w-[400px] w-full">{bio}
            </p> 
            )}
          </div>

          {/* Stats Section */}
          <div className='flex md:flex-row flex-col md:justify-between'>
          <div className="space-y-1 pt-5">
            <div className="md:flex  items-center space-x-1 hidden">
                <BotIcon className="w-4 h-4" />
              <span className="">Threads:</span>
              <span className='text-gray-500'>{user?.threads.length}</span>
            </div>

            <div>
                <div className="flex items-center space-x-1">
                <MessageSquareHeart className="w-4 h-4" />
              <p className="">Favourite topic:</p>
              </div>
              {isOwner && !favouriteTopic && (
              <p className="text-xs text-gray-500 md:w-[400px] w-full">
              click <Button
               variant="ghost" onClick={() => generateBio('topic')} 
               disabled={isLoading && generateType === 'topic'}
               className="text-xs text-gray-500 p-1 hover:text-black dark:hover:text-gray-400"> generate 
                 {isLoading && generateType === 'topic' ? <Loader className="w-4 h-4 ml-1" /> : <Wand2 className="w-4 h-4 ml-1" />}
                </Button>
              and know your most common topic.
            </p>
              )}
              {favouriteTopic && (
                <p className="text-sm text-gray-500 md:w-[300px]">{favouriteTopic}</p>
              )}
            </div>
          </div>
           {/* Implementation for this comes next :) */}
          {/* <div className=' flex flex-col  items-center md:mt-0 mt-7  space-y-3'>
           {!isOwner && (
          <button className="px-10 py-1 text-sm text-white  rounded-md bg-[#BE17E8] hover:bg-[#BE17E8] dark:bg-[#83E56A] dark:hover:bg-[#83E56A] dark:text-black transition-colors">
            Follow
          </button>
          )}
          <div className="flex space-x-6 md:pt-2 ">
            <div className="flex flex-col items-center">
              <span className="text-sm">Following</span>
              <div className='flex items-center space-x-1'>
                <UserIcon className="w-4 h-4" />
                <span className="text-sm text-gray-500">313</span>
              </div>
              
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm">Followers</span>
              <div className='flex items-center space-x-1'>
                <Users className="w-4 h-4" />
                <span className="text-sm text-gray-500">3.2k</span>
              </div>
            </div>
          </div>
          </div> */}
          
          </div>
        </div>

        {/* Profile Image and Follow Button Section */}
        <div className="absolute md:top-4  -top-3 md:right-20 right-10 pr- translate-x-1/2 flex flex-col  items-center space-y-3">
          <div className="relative size-24">
            <div className="absolute  inset-0 border-4 border-[#BE17E8] dark:border-[#83E56A] rounded-full dark:bg-[#131316] bg-white overflow-hidden">
              <Image
                className="transition-opacity duration-300 rounded-full select-none size-full ring-1 ring-zinc-100/10 hover:opacity-80 object-cover"
                src={user?.profilePicture ? user.profilePicture : ''}
                alt="Default Avatar"
                height={136}
                width={136}
              />
            </div>
            <div className='absolute bottom-4 right-0 p-2 rounded-full  dark:bg-[#83E56A] bg-[#BE17E8]'>
                <ImagePlus className="w-3 h-3  rounded-full dark:text-black text-white font-bold" />
            </div>
          </div>
        </div>
      </div>
      )
    }
     
    </div>
  )
}
