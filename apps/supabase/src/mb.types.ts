import { Camelize } from "camelize-ts";
import { Tables } from "./supa.types";
import type * as AI from "ai";
export namespace MB {
  export type Message = Camelize<Tables<"message">>;
  export type Chatbot = Camelize<Tables<"chatbot">>;
  export type Category = Camelize<Tables<"category">>;
  export type Prompt = Camelize<Tables<"prompt">>;
  export type Account = Camelize<Tables<"account">>;
  export type ChatbotWithPrompts = Chatbot & { prompts: Prompt[] };
  export type MessagePair = {
    question: AI.Message & { role: "user" };
    answer: AI.Message & { role: "assistant" };
  };
  export type Thread = Camelize<Tables<"thread">>;
  export type ThreadWithQuestion = Thread & {
    firstMessage: AI.Message;
    firstAnswer: AI.Message;
    messageCount: number;
  };
  export type ThreadFull = ThreadWithQuestion & {
    message: Pick<Message, "id" | "content" | "createdAt">;
    chatbot: Pick<Chatbot, "chatbotId" | "name" | "avatar"> & {
      categories: Category[];
      prompts: Prompt[];
    };
    account: Pick<Account, "userId" | "username" | "avatar">;
  };
}
