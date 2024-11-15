import { authOptions } from "@/auth";
import UserThreadPanel from "@/components/routes/thread/user-thread-panel";
import { botNames } from "@/lib/constants/bots-names";
import { getBrowseThreads, getThreads, getUserBySlug} from "@/services/hasura/hasura.service";
import { getServerSession } from "next-auth";


export default async function ProfileChatBot({ params }: {  params: {
    slug: string;
    category: string;
    chatbot: string;
}
}) {
    let threads = [];
    const { slug, category, chatbot } = params;
    const session = await getServerSession(authOptions);
    const jwt = session ? session.user?.hasuraJwt : '';
    const { user, error } =  await getUserBySlug({ slug, jwt});
    if (!user) return <div>No user found</div>

    const chatbotName = botNames.get(chatbot);
    if (!chatbotName) {
      throw new Error(`Chatbot name for ${chatbot} not found`);
    }


  if(session?.user?.id !== user?.userId){
    const list = await getBrowseThreads({ userId: user?.userId, chatbotName});
    threads = list || []
  }else{
    const list  = await getThreads({ chatbotName, jwt,  userId: user?.userId });
    threads = list || []
  }

    return (
        <UserThreadPanel
        threads={threads}
        chatbot={chatbot}
        page="profile"
      />
    )
}