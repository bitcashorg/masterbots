import { createContextHook } from '@blockmatic/hooks-utils'
import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { createThread } from '@/services/db'

const useNewMessageHook = () => {
  const router = useRouter()
  const [state, setState] = useState<{ message: string; bot: string }>()
  const setNewMessage = async (data: { message: string; bot: string }) => {
    setState(data)

    const threadId = await createThread({ chatbotId: 1 })
    router.push(`/healthbot/${threadId}`, { shallow: true, scroll: false })
    router.refresh()
  }
  return { ...state, setNewMessage }
}

export const [useNewMessage, NewMessageProvider] = createContextHook(
  useNewMessageHook,
  'You must wrap your application with <NewMessageProvider /> in order to useNewMessageHook().'
)
