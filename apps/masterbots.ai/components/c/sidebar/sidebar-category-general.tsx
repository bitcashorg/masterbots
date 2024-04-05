import { auth } from '@/auth'
// import { ChatHistory } from '@/components/chat-history'
import { getCategories } from '@/services/hasura'
import SidebarLink from './sidebar-link'

export async function SidebarGeneralCategory() {
  const session = await auth()
  if (!session) return null
  const categories = await getCategories()
  return (
    <ul>
      {categories.map((category, key) => (
        <li key={key}>
          <SidebarLink category={category} />
        </li>
      ))}
    </ul>
  )
}
