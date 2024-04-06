import { Sidebar } from '@/components/c/sidebar'
// import { ChatHistory } from '@/components/chat-history'
import { SidebarGeneralCategory } from './sidebar-category-general'

export async function ResponsiveSidebar() {
  return (
    <Sidebar
      className="peer absolute inset-y-0 z-30 border-r bg-muted
    transition-all
    -translate-x-full duration-500 ease-in-out
    data-[state=open]:translate-x-0 data-[state=closed]:lg:translate-x-0
    w-[300px] lg:w-[250px] xl:w-[300px]"
    >
      <SidebarGeneralCategory />
      {/* <h3>Chat history</h3>
      <ChatHistory userId={session.user.userId} /> */}
    </Sidebar>
  )
}
