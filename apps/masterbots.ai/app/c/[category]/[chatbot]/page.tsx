import { authOptions } from "@/auth";
import { ChatChatbot } from "@/components/routes/chat/chat-chatbot";
import ThreadPanel from "@/components/routes/thread/thread-panel";
import { formatSystemPrompts } from "@/lib/actions";
import { botNames } from "@/lib/bots-names";
import { setDefaultUserPreferencesPrompt } from "@/lib/constants/prompts";
import { generateMetadataFromSEO } from "@/lib/metadata";
import { getChatbot, getThreads } from "@/services/hasura";
import type { Message } from "ai";
import { isTokenExpired } from "mb-lib";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function BotThreadsPage({
  params,
  searchParams,
}: {
  params: { category: string; chatbot: string };
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

export async function generateMetadata({
  params,
}: {
  params: { chatbot: string };
}): Promise<Metadata> {
  const chatbotName = botNames.get(params.chatbot);
  const chatbot = await getChatbot({ chatbotName, jwt: "" });

  const seoData = {
    title: chatbotName || "",
    description: chatbot.description || "",
    ogType: "website",
    ogImageUrl: chatbot.avatar || "",
    twitterCard: "summary",
  };

  return generateMetadataFromSEO(seoData);
}


