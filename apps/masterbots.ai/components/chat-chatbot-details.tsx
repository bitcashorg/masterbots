import { Chatbot } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from './ui/separator'

export default function ChatChatbotDetails({
  chatbot,
  isSelectedChatbot
}: {
  chatbot?: Chatbot
  isSelectedChatbot: boolean
}) {
  return (
    <div className="h-[calc(100vh-196px)] flex items-center justify-center">
      <div
        className="dark:bg-[#09090B] bg-white rounded-lg md:w-[600px]
      flex flex-col gap-[10px] relative font-mono"
      >
        <div className="w-[70%] flex flex-col gap-[10px] px-[24px] pt-[24px]">
          <div className="text-2xl font-black">
            {isSelectedChatbot ? chatbot?.name : 'Welcome to Masterbots!'}
          </div>
          <Separator className="dark:bg-mirage bg-gray-300" />
          <div className="grow flex flex-col justify-between min-h-[137px]">
            <div className="text-xl font-semibold">
              {isSelectedChatbot
                ? chatbot?.categories[0].category.name
                : 'Here you can create a new threads and share them for other users to browse!'}
            </div>
            <div className="text-base">
              {isSelectedChatbot && (
                <div className="font-medium">
                  {chatbot?.description ? (
                    <div>{chatbot?.description}</div>
                  ) : (
                    ''
                  )}
                </div>
              )}
              <div className="font-light">
                Threads made:{' '}
                <span className="text-[#71717A]">
                  {chatbot?.threads?.length ?? 1}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col text-xs items-center w-full">
          <Separator className="dark:bg-mirage bg-gray-300" />
          <Link
            style={{ wordSpacing: '4px' }}
            className="text-[#388DE2] py-[8px]"
            href={`/${chatbot?.name.toLowerCase()}`}
          >
            Start a new chat with {chatbot?.name} &gt;
          </Link>
        </div>
        <div className="size-24 absolute border-[4px] border-[#388DE2] right-0 top-0 translate-x-[25%] rounded-full translate-y-[-25%] dark:bg-[#131316] bg-white">
          <Image
            className="size-full transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
            src={chatbot?.avatar || ''}
            alt={chatbot?.avatar || 'ChatAvatar'}
            height={108}
            width={108}
          />
        </div>
      </div>
    </div>
  )
}
