import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '../ui/separator'

export default function AccountDetails({
  alt,
  avatar,
  username,
  href,
  threadNum = 0,
  chatbotName,
  description
}: AccountDetailsProps) {
  if (!username && !chatbotName)
    throw new Error('You must pass username or chatbotName')

  return (
    <div className="flex bg-cover py-10 bg-gradient-to-l from-mirage via-[#2B5D91] to-[#388DE2]">
      <div className="dark:bg-[#09090B] bg-white rounded-lg p-6 max-w-[600px] flex flex-column gap-3 relative mx-auto font-mono min-w-[700px] min-h-[300px]">
        <div className="size-24 absolute border-4 border-[#388DE2] right-0 top-0 translate-x-1/4 rounded-full -translate-y-1/4 dark:bg-[#131316] bg-white">
          <Image
            alt={username || chatbotName}
            className="size-full transition-opacity duration-300 rounded-full select-none ring-1 ring-zinc-100/10 hover:opacity-80"
            height={96}
            src={avatar || ''}
            width={96}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="text-2xl font-black">{username || chatbotName}</div>
          <Separator className="dark:bg-mirage bg-gray-300" />
          {/* <div className="text-xl font-semibold">
            {chatbot.categories[0].category.name}.
          </div> */}
          <div className="text-base flex grow">
            <div className="font-medium">
              {description ? <div>{description}</div> : ''}
            </div>
          </div>

          <div className="flex justify-between">
            <div className="font-light">
              Threads: <span className="text-[#71717A]">{threadNum ?? 0}</span>
            </div>
            <div className="flex flex-col text-xs items-center">
              {chatbotName ? (
                <Link
                  className="text-[#388DE2]"
                  href={href}
                  style={{ wordSpacing: '4px' }}
                >
                  Chat with {chatbotName} &gt;
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AccountDetailsProps {
  alt?: string
  avatar: string
  username?: string
  href: string
  threadNum?: number
  chatbotName?: string
  description?: string
}
