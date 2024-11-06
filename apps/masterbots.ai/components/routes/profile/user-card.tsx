import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { BookUser, BotIcon, MessageSquareHeart,  UserIcon, Users, Wand2, ImagePlus  } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { User } from 'mb-genql'
import { useProfile } from '@/lib/hooks/use-profile'

interface UserCardProps {
  user: User
}
export function UserCard({ user }: UserCardProps) {
  const {  isSameUser } = useProfile()
  const isOwner = isSameUser(user.userId);
  return (
    <div
      className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
       md:min-h-[290px]
        flex flex-row gap-3 mx-auto font-mono"
    >
      <div className=" relative w-full">
        <div className="space-y-1">
          {/* Profile Name */}
          <h2 className="text-2xl font-semibold">{user.username}</h2>
          <div className="flex items-center space-x-1">
            <BookUser className="w-4 h-4" />
            <p className="text-sm ">bio:</p>
            {isOwner && (
             <Button variant="ghost" className="text-sm text-gray-500 border p-2 border-black dark:border-gray-400 hover:text-black dark:hover:text-gray-400">
               generate
               <Wand2 className="w-4 h-4 ml-1" />
             </Button>
            )}
           
          </div>
          <Separator className="bg-gray-300 text-white dark:bg-mirage" />

          {/* Bio Section */}
          <div className="space-y-2 min-h-16">
          {isOwner && (
            <p className="text-xs text-gray-500 md:w-[400px]">
              click <Button variant="ghost" className="text-xs text-gray-500 p-1"> generate <Wand2 className="w-4 h-4 ml-1" /></Button>
               to create a Masterbots biography based on your thread history.
            </p>
          )}
            {/* <p className="text-sm text-gray-500 md:w-[300px]">
              Hipster ipsum tattooed brunch I'm baby. Probably skateboard
              mumblecore forage tour. Mood probably yes big freegan. Schlitz
              roof beer tile bicycle fit edison kitsch cliche ascot truck.
            </p> */}
          </div>

          {/* Stats Section */}
          <div className="space-y-1 pt-5">
            <div className="flex items-center space-x-1">
                <BotIcon className="w-4 h-4" />
              <span className="">Threads:</span>
              <span className='text-gray-500'>{user?.threads.length}</span>
            </div>

            <div>
                <div className="flex items-center space-x-1">
                <MessageSquareHeart className="w-4 h-4" />
              <p className="">Favourite topic:</p>
              </div>
              {isOwner && (
              <p className="text-xs text-gray-500 md:w-[400px]">
              click <Button variant="ghost" className="text-xs text-gray-500 p-1"> generate <Wand2 className="w-4 h-4 ml-1" /></Button>
              and know your most common topic.
            </p>
              )}
              {/* <p className="text-gray-500">
                The different smells of flowers and grass.
              </p> */}
            </div>
          </div>
        </div>

        {/* Profile Image and Follow Button Section */}
        <div className="absolute top-4 right-20 translate-x-1/2 flex flex-col  items-center space-y-3">
          <div className="relative size-24">
            <div className="absolute inset-0 border-4 border-[#BE17E8] dark:border-[#83E56A] rounded-full dark:bg-[#131316] bg-white overflow-hidden">
              <Image
                className="transition-opacity duration-300 rounded-full select-none size-full ring-1 ring-zinc-100/10 hover:opacity-80 object-cover"
                src={user?.profilePicture ? user.profilePicture : ''}
                alt="Default Avatar"
                height={128}
                width={128}
              />
            </div>
            <div className='absolute bottom-4 right-0 p-2 rounded-full  dark:bg-[#83E56A] bg-[#BE17E8]'>
                <ImagePlus className="w-3 h-3  rounded-full dark:text-black text-white font-bold" />
            </div>
          </div>
          {!isOwner && (
          <button className="px-4 py-1 text-sm text-white  rounded-md bg-[#BE17E8] hover:bg-[#BE17E8] dark:bg-[#83E56A] dark:hover:bg-[#83E56A] dark:text-black transition-colors">
            Follow
          </button>
          )}

          <div className="flex space-x-6 pt-2 ">
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
        </div>
      </div>
    </div>
  )
}
