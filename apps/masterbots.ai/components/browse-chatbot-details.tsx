import { Chatbot } from 'mb-genql'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from './ui/separator'

export default function BrowseChatbotDetails({
  chatbot
}: {
  chatbot?: Chatbot
}) {
  return (
    <div className="relative bg-cover py-10 bg-gradient-to-l from-mirage via-[#2B5D91] to-[#388DE2]">
      <div className="flex flex-row gap-3 relative mx-auto md:w-[600px]">
        <a className="flex items-center space-x-1" href="/">
          <svg
            width="11"
            height="12"
            viewBox="0 0 11 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.09973 2.15008L3.24979 6.00003L7.09973 9.84998"
              stroke="#FAFAFA"
              stroke-width="0.962486"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>{' '}
           <span className="text-['24px'] font-normal">Back to browse</span> 
        </a>
      </div>
      <div
        className="dark:bg-[#09090B] bg-white rounded-lg p-6 md:w-[600px]
      flex flex-row gap-3 relative mx-auto font-mono"
      >
        <div className="w-2/3 flex flex-col gap-3">
          <div className="text-2xl font-black">{chatbot?.name}</div>
          <Separator className="dark:bg-mirage bg-gray-300" />
          <div className="text-xl font-semibold">
            {chatbot?.categories[0].category.name}.
          </div>
          <div className="text-base">
            <div className="font-medium">
              {chatbot?.description ? <div>{chatbot?.description}</div> : ''}
            </div>
            <div className="font-light">
              Threads:{' '}
              <span className="text-[#71717A]">
                {chatbot?.threads.length ?? 1}
              </span>
              {/* <div>
              Views: <span className="dark:text-[#71717A]">0</span>
            </div> */}
              {/* <div>
              Read time:{' '}
              <span className="dark:text-[#71717A]">
                {readingTime(messages)} min
              </span>
            </div> */}
            </div>
          </div>
        </div>
        <div className="w-1/3 relative flex items-end">
          <div className="flex flex-col text-xs items-center w-full gap-2">
            <Link
              style={{ wordSpacing: '4px' }}
              className="text-[#388DE2]"
              href={`/${chatbot?.name.toLowerCase()}`}
            >
              Chat with {chatbot?.name} &gt;
            </Link>
            {/* <div className="flex items-center gap-2">
            <IconUpVote className="opacity-60 h-4" />
            <span className="text-[#72C255]">0</span>
            <IconDownVote className="opacity-60 h-4" />
            <span className="text-[#F42F53]">0</span>
            <Button
              onClick={() => {
                console.log('Share action required')
              }}
              variant="ghost"
            >
              <IconShare className="opacity-60" />
            </Button>
            <IconChatMessage className="opacity-60" />
          </div> */}
          </div>
        </div>
        <div className="h-24 w-24 absolute border-[4px] border-[#388DE2] right-0 top-0 translate-x-[25%] rounded-full translate-y-[-25%] dark:bg-[#131316] bg-white">
          <Image
            className="h-full w-full transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
            src={chatbot?.avatar || ''}
            alt={chatbot?.avatar || 'ChatAvatar'}
            height={96}
            width={96}
          />
        </div>
      </div>
    </div>
  )
}
