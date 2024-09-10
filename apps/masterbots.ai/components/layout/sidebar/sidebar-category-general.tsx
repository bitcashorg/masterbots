// import { ChatHistory } from '@/components/chat-history'
import { getCategories } from '@/services/hasura'
import { getServerSession } from 'next-auth'
import SidebarLink from '@/components/layout/sidebar/sidebar-link'

export async function SidebarGeneralCategory() {
  const session = await getServerSession()
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
