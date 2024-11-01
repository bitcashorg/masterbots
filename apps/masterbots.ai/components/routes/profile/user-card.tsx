import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { BookUser, BotIcon, MessageSquareHeart, User, Users } from 'lucide-react'

export function UserCard() {
  return (
    <div
      className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
        flex flex-row gap-3 mx-auto font-mono"
    >
      <div className=" relative w-full">
        <div className="space-y-1">
          {/* Profile Name */}
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <div className="flex items-center space-x-1">
            <BookUser className="w-4 h-4" />
            <p className="text-sm text-gray-400">bio:</p>
          </div>
          <Separator className="bg-gray-300 text-white dark:bg-mirage" />

          {/* Bio Section */}
          <div className="space-y-2 ">
            <p className="text-sm text-gray-300 md:w-[300px]">
              Hipster ipsum tattooed brunch I'm baby. Probably skateboard
              mumblecore forage tour. Mood probably yes big freegan. Schlitz
              roof beer tile bicycle fit edison kitsch cliche ascot truck.
            </p>
          </div>

          {/* Stats Section */}
          <div className="space-y-1 pt-5">
            <div className="flex items-center space-x-1">
                <BotIcon className="w-4 h-4" />
              <span className="text-gray-400">Threads:</span>
              <span>12</span>
            </div>

            <div>
                <div className="flex items-center space-x-1">
                <MessageSquareHeart className="w-4 h-4" />
              <p className="text-gray-400">Favourite topic:</p>
              </div>
              <p className="text-gray-300">
                The different smells of flowers and grass.
              </p>
            </div>
          </div>
        </div>

        {/* Profile Image and Follow Button Section */}
        <div className="absolute top-4 right-20 translate-x-1/2 flex flex-col items-center space-y-3">
          <div className="relative size-24">
            <div className="absolute inset-0 border-4 dark:border-[#83E56A] rounded-full dark:bg-[#131316] bg-white overflow-hidden">
              <Image
                className="transition-opacity duration-300 rounded-full select-none size-full ring-1 ring-zinc-100/10 hover:opacity-80 object-cover"
                src="/user-profile.jpeg"
                alt="Default Avatar"
                height={96}
                width={96}
              />
            </div>
          </div>

          <button className="px-4 py-1 text-sm rounded-md dark:bg-[#83E56A] dark:hover:bg-[#83E56A] text-black transition-colors">
            Following
          </button>

          <div className="flex space-x-6 pt-2">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">Following</span>
              <div className='flex items-center space-x-1'>
                <User className="w-4 h-4" />
                <span className="text-sm">313</span>
              </div>
              
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-400">Followers</span>
              <div className='flex items-center space-x-1'>
                <Users className="w-4 h-4" />
                <span className="text-sm">3.2k</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
