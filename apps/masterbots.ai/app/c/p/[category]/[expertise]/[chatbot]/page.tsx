import { authOptions } from "@/auth";
import { ChatChatbot } from "@/components/routes/chat/chat-chatbot";
import ThreadPanel from "@/components/routes/thread/thread-panel";
import { formatSystemPrompts } from "@/lib/actions";
import { botNames } from "@/lib/constants/bots-names";
import { setDefaultUserPreferencesPrompt } from "@/lib/constants/prompts";
import { getChatbot, getThreads } from "@/services/hasura";
import type { Message } from "ai";
import { isTokenExpired } from "mb-lib";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BrowseProBotPage({
  params,
  searchParams,
}: {
  params: { category: string; expertise: string; chatbot: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  // NOTE: maybe we should use same expiration time
  const jwt = session ? session.user?.hasuraJwt : null;
  if (!jwt) {
    throw new Error("Session JWT is missing.");
  }
  if (isTokenExpired(jwt)) {
    redirect(`/auth/signin`);
  }
  const chatbotName = botNames.get(params.chatbot);
  if (!chatbotName) {
    throw new Error(`Chatbot name for ${params.chatbot} not found`);
  }
  const chatbot = await getChatbot({ chatbotName, jwt });

  if (!chatbot)
    throw new Error(`Chatbot ${botNames.get(params.chatbot)} not found`);

  // session will always be defined

  const userId = session?.user?.id;
  if (!userId) {
    throw new Error("User ID is missing.");
  }
  const threads = await getThreads({ chatbotName, jwt, userId });

  // format all chatbot prompts as chatgpt 'system' messages
  const chatbotSystemPrompts: Message[] = formatSystemPrompts(chatbot.prompts);

  const userPreferencesPrompts: Message[] = [
    setDefaultUserPreferencesPrompt(chatbot),
  ];

  // concatenate all message to pass it to chat component
  const initialMessages: Message[] = chatbotSystemPrompts.concat(
    userPreferencesPrompts,
  );

  return (
    <>
      <ThreadPanel
        threads={threads}
        chatbot={chatbot.name}
        search={searchParams}
      />{" "}
      <ChatChatbot initialMessages={initialMessages} chatbot={chatbot} />
    </>
  );
}
