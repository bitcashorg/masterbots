import { createContextHook } from '@blockmatic/hooks-utils'
import { useState } from 'react'

const useNewMessageHook = () => {
  const [state, setState] = useState<NewMessageState>()
  const setNewChat = (data: NewMessageState) => {
    setState(data)
  }
  return { ...state, setNewChat }
}

export const [useNewMessage, NewMessageProvider] = createContextHook(
  useNewMessageHook,
  'You must wrap your application with <NewMessageProvider /> in order to useNewMessageHook().'
)

interface NewMessageState {
  chatId: string
}
