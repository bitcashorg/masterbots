import ShareLink from '@/components/routes/thread/thread-share-link'
import { Separator } from '@/components/ui/separator'
import type { Chatbot } from 'mb-genql'
import { toSlug } from 'mb-lib'
import Image from 'next/image'
import Link from 'next/link'

/**
 * BrowseChatbotDetails Component
 *
 * This component displays detailed information about a specific chatbot.
 * It includes the chatbot's name, primary category, description, and the number of threads associated with it.
 *
 * Props:
 * - chatbot: An optional Chatbot object containing details about the chatbot.
 *
 * Key Features:
 * - Conditional Rendering: Displays a message if no chatbot data is available.
 * - Dynamic URL Generation: Creates a URL for chatting with the chatbot based on its category and name.
 * - Responsive Design: Utilizes Tailwind CSS for styling and layout.
 */
export default function BrowseChatbotDetails({
  chatbot
}: {
  chatbot?: Chatbot
}) {
  if (!chatbot?.categories?.length) {
    return <div>No chatbot data available</div>
  }
  const primaryCategory = chatbot.categories[0].category
  const botUrl = `/c/${toSlug(primaryCategory.name)}/${chatbot.name.toLowerCase()}`

  return (
    <div className="relative bg-cover py-10 bg-gradient-to-l from-mirage via-[#2B5D91] to-[#388DE2]">
      <div className="max-w-[600px] w-full mx-auto px-4">
        <a className="flex items-center mb-6 space-x-1" href="/">
          {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
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
              strokeWidth="0.962486"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-['24px'] font-normal">Back to browse</span>
        </a>

        <div className="dark:bg-[#09090B] bg-white rounded-lg p-6 relative font-mono">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-black">{chatbot?.name}</div>
              <ShareLink />
            </div>
            <Separator className="bg-gray-300 dark:bg-mirage" />
            <div className="text-xl font-semibold">
              {chatbot?.categories[0].category.name}.
            </div>
            <div className="text-base">
              <div className="font-medium">
                {chatbot?.description ? <div>{chatbot?.description}</div> : ''}
              </div>
              <div className="font-light">
                Threads:
                <span className="text-[#71717A]">
                  {chatbot?.threads.length ?? 1}
                </span>
              </div>
            </div>

            <Link
              style={{ wordSpacing: '4px' }}
              className="text-[#388DE2] text-xs"
              href={botUrl}
            >
              Chat with {chatbot?.name} &gt;
            </Link>
          </div>

          <div className="size-24 mr-5 absolute border-4 border-[#388DE2] right-0 top-0 translate-x-1/4 rounded-full -translate-y-1/4 dark:bg-[#131316] bg-white">
            <Image
              className="transition-opacity duration-300 rounded-full select-none size-full ring-1 ring-zinc-100/10 hover:opacity-80"
              src={chatbot?.avatar || ''}
              alt={
                chatbot?.avatar ? `Avatar of ${chatbot?.name}` : 'Default Avatar'
              }
              height={96}
              width={96}
            />
          </div>
        </div>
      </div>
    </div>
  )
}