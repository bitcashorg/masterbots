import { auth } from '@/auth'
// import { ChatHistory } from '@/components/chat-history'
import { getChatbots } from '@/services/hasura'
import SidebarLink from './sidebar-link'

export async function SidebarGeneralCategory() {
  const session = await auth()
  if (!session) return null
  const chatbots = await getChatbots()

  return (
    <ul>
      {chatbots.map((bot, key) => (
        <li key={key}>
          <SidebarLink bot={bot} />
        </li>
      ))}
    </ul>
  )
}
