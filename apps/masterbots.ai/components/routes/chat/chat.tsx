"use client";

/**
 * Chat Component
 *
 * A complex chat interface that handles:
 * - Message management for new and existing chat threads
 * - Integration with AI models for message processing and responses
 * - Loading states for message generation and processing
 * - Chatbot configuration and metadata handling
 * - Chat history and message persistence
 * - ICL integration for metadata extraction and labelling
 * - Real-time message streaming and history management
 * - Chat thread creation and state management
 * - Message improvement and metadata extraction using AI
 * - Automatic scrolling behavior
 *
 * Key Features:
 * - Supports both popup and inline chat modes
 * - Handles message processing states (processing, digesting, generating, etc.)
 * - Manages chat thread creation and persistence
 * - Integrates with multiple chatbot models
 * - Provides real-time message streaming
 * - Maintains chat history and system prompts
 *
 * State Management:
 * - Uses useChat for message handling
 * - Manages loading states for UI feedback
 * - Tracks scroll position and bottom visibility
 * - Handles chat thread state and persistence
 */

//TODO: Refactor and optimize the Chat component into smaller sections for better performance and readability

import {
  improveMessage
} from "@/app/actions/ai-main-call";
import { ChatList } from "@/components/routes/chat/chat-list";
import { ChatPanel } from "@/components/routes/chat/chat-panel";
import { ChatScrollAnchor } from "@/components/routes/chat/chat-scroll-anchor";
import { botNames } from "@/lib/constants/bots-names";
import { followingQuestionsPrompt, setDefaultPrompt } from '@/lib/constants/prompts';
import { useAtBottom } from "@/lib/hooks/use-at-bottom";
import { useModel } from "@/lib/hooks/use-model";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { useThread } from "@/lib/hooks/use-thread";
import { cn, scrollToBottomOfElement } from "@/lib/utils";
import { createThread, getThread, saveNewMessage } from "@/services/hasura";
import type {
  AiClientType,
  ChatLoadingState,
  ChatProps,
  CleanPromptResult,
} from "@/types/types";
import type { ChatRequestOptions, CreateMessage } from "ai";
import { type Message, useChat } from "ai/react";
import { useScroll } from "framer-motion";
import { uniqBy } from "lodash";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export function Chat({
  initialMessages,
  className,
  chatbot,
  threadId,
  chatPanelClassName,
  isPopup,
  scrollToBottom: scrollToBottomOfPopup,
  isAtBottom: isAtBottomOfPopup,
}: ChatProps) {
  const { data: session } = useSession();
  const {
    allMessages: threadAllMessages,
    initialMessages: threadInitialMessages,
    activeThread,
    sendMessageFromResponse,
    setActiveThread,
    setIsNewResponse,
    setIsOpenPopup,
    isOpenPopup,
    sectionRef,
    isAtBottom: isAtBottomOfSection,
    isActiveThreadContinuous,
  } = useThread();
  const { activeChatbot } = useSidebar();
  const containerRef = React.useRef<HTMLDivElement>();

  const params = useParams<{ chatbot: string; threadId: string }>();
  const isNewChat = Boolean(!params.threadId && !activeThread);
  const { selectedModel, clientType } = useModel();
  const [loadingState, setLoadingState] = React.useState<ChatLoadingState>();
  // TODO: this functionality should be moved to a different library.
  const newThreadId = crypto.randomUUID()
  // let currentThreadId = params.threadId || isNewChat ? threadId : activeThread?.threadId;;
  // currentThreadId = isActiveThreadContinuous ? newThreadId : currentThreadId;
  const { messages, append, reload, stop, isLoading, input, setInput } =
    useChat({
      initialMessages:
        params.threadId || isNewChat
          ? initialMessages?.filter((m) => m.role === "system")
          : threadInitialMessages.filter((m) => m.role === "system"),
      id: params.threadId || isNewChat ? threadId : activeThread?.threadId,
      body: {
        id: params.threadId || isNewChat ? threadId : activeThread?.threadId,
        model: selectedModel,
        chatbot: activeChatbot && activeChatbot?.categories?.length ? {
          chatbotId: activeChatbot?.chatbotId,
          categoryId: activeChatbot?.categories[0].categoryId,
        } : {},
        clientType,
      },
      onResponse(response) {
        if (response.status === 401) {
          toast.error(response.statusText);
        }
      },
      onFinish(message) {
        saveNewMessage({
          role: "assistant",
          threadId:
            params.threadId || isNewChat ? threadId : activeThread?.threadId,
          content: message.content,
          jwt: session!.user?.hasuraJwt,
        });
      },
      onError(error) {
        console.error("Error in chat: ", error);
        toast.error("Failed to send message. Please try again.");
      }
    });

  const { scrollY } = useScroll({
    container: containerRef as React.RefObject<HTMLElement>,
  });

  const { isAtBottom } = useAtBottom({
    ref: containerRef,
    scrollY,
  });

  // ? saffer way to debounce scroll to bottom
  let timeoutId: any;
  const debounceScrollToBottom = (element: HTMLElement | undefined) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      scrollToBottomOfElement(element);
      clearTimeout(timeoutId);
    }, 150); //? Adjustable delay as necessary
  };

  const scrollToBottom = () => {
    if (
      (params.threadId && containerRef.current) ||
      (!params.threadId && sectionRef.current)
    ) {
      let element: any;
      if (sectionRef.current) {
        element = sectionRef.current;
      } else {
        element = containerRef.current;
      }
      debounceScrollToBottom(element);
    }
  };

  // we merge past assistant and user messages for ui only
  // we remove system prompts from ui
  const allMessages =
    params.threadId || isNewChat
      ? uniqBy(initialMessages?.concat(messages), "content").filter(
        (m) => m.role !== "system",
      )
      : uniqBy(threadAllMessages.concat(messages), "content").filter(
        (m) => m.role !== "system",
      );

  // we extend append function to add our system prompts
  const appendWithMbContextPrompts = async (
    userMessage: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => {
    if (!session?.user || !chatbot) {
      console.error("User is not logged in or session expired.");
      toast.error("Failed to start conversation. Please reload and try again.");
      return;
    }

    // * Loading: processing your request + opening pop-up...
    setLoadingState("processing");
    setIsOpenPopup(true);

    let processedMessage: CleanPromptResult = setDefaultPrompt(
      userMessage.content,
    );

    // * Cleaning the user question (thread title) with AI
    try {
      console.log("Original message: ", processedMessage);
      processedMessage = await improveMessage(
        userMessage.content,
        clientType as AiClientType,
        selectedModel,
      );
      // * Loading: getting the the information right... 'digesting'
      setLoadingState("digesting");

      if (
        processedMessage.improved ||
        processedMessage.improvedText === userMessage.content
      ) {
        console.warn("Message was not improved by AI. Using original message.");
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }

    const { language, originalText, improvedText, translatedText } =
      processedMessage;
    const userContent = translatedText || improvedText || originalText;

    // * Optimistically setting the active thread
    const updatedUserMessage = {
      ...userMessage,
      content: userContent,
    };
    setActiveThread({
      threadId,
      chatbotId: chatbot.chatbotId,
      chatbot,
      createdAt: new Date().toISOString(),
      isApproved: false,
      isBlocked: false,
      isPublic: activeChatbot?.name !== "BlankBot",
      // @ts-ignore
      messages: initialMessages ? [...initialMessages, updatedUserMessage as Message] : [updatedUserMessage as Message],
      userId: session.user.id,
    })

    console.log("Processed Message: ", processedMessage);

    // ! Loading: Generating awesome stuff for you... 'generating'
    setLoadingState("generating");

    // ! Connecting to the ICL to send the user labelling the thread and rawData (examples) to the ICL
    // TODO: ...
    const postIclResponse = (await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({
          parsed: {},
          question: userContent,
          domain: chatbot?.categories[0].category.name as string,
          chatbot: chatbot?.name as string,
        });
        clearTimeout(timeout);
      }, 700);
    })) as { parsed: any; question: string; domain: string; chatbot: string };
    // ! Her we do something with the response from the ICL and attach it to the chat context the required fields and values for future ICL usage.
    console.log("Full responses from postICLResponse:", postIclResponse);

    // * Loading: Now I have the information you need... 'ready'
    setLoadingState("ready");

    setIsNewResponse(true);
    // console.log('userMessage', userMessage);
    // let appendMessages = isNewChat
    //   ? { ...userMessage, content: userContent }
    //   : {
    //     ...userMessage,
    //     content: followingQuestionsPrompt(userContent, allMessages),
    //   }
    // // TODO: looks for a better way to append messages or maybe a different chat architecture for continuous chat.
    // appendMessages = isActiveThreadContinuous ? {
    //   ...userMessage,
    //   content: followingQuestionsPrompt(userContent, allMessages),
    // } : appendMessages

    return append(
      isNewChat
        ? { ...userMessage, content: userContent }
        : {
          ...userMessage,
          content: followingQuestionsPrompt(userContent, allMessages),
        },
    ).then(async (response) => {
      if (isNewChat && chatbot) {
        await createThread({
          threadId: currentThreadId,
          chatbotId: chatbot.chatbotId,
          jwt: session.user?.hasuraJwt,
          userId: session.user.id,
          isPublic: activeChatbot?.name !== "BlankBot",
        });

        const thread = await getThread({
          threadId: currentThreadId,
          jwt: session.user?.hasuraJwt,
        });

        setActiveThread(thread);
      }

      await saveNewMessage({
        role: "user",
        threadId:
          params.threadId || isNewChat ? threadId : activeThread?.threadId,
        content: userContent,
        jwt: session.user?.hasuraJwt,
      });
      // * Loading: Here is the information you need... 'finish'
      setLoadingState("finished");

      const timeout = setTimeout(() => {
        scrollToBottom();
        setLoadingState(undefined);
        clearTimeout(timeout);
      }, 750);

      return response;
    });
  };

  useEffect(() => {
    if (
      params.chatbot &&
      activeThread &&
      botNames.get(params.chatbot) !== activeThread.chatbot.name
    ) {
      setIsOpenPopup(false);
      setActiveThread(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoading && isOpenPopup && scrollToBottomOfPopup) {
      const timeout = setTimeout(() => {
        scrollToBottomOfPopup();
        clearTimeout(timeout);
      }, 150);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isOpenPopup, scrollToBottomOfPopup]);

  useEffect(() => {
    if (!isLoading && loadingState) {
      setLoadingState(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      {params.threadId && (
        <div
          ref={containerRef as React.Ref<HTMLDivElement>}
          className={cn("pb-[200px] pt-4 md:pt-10 h-full overflow-auto", className)}
        >
          <ChatList
            chatbot={chatbot}
            messages={allMessages}
            sendMessageFn={sendMessageFromResponse}
          />
          <ChatScrollAnchor
            isAtBottom={
              params.threadId
                ? isAtBottom
                : isPopup
                  ? Boolean(isAtBottomOfPopup)
                  : isAtBottomOfSection
            }
            trackVisibility={isLoading}
          />
        </div>
      )}
      <ChatPanel
        // biome-ignore lint/suspicious/noReactSpecificProps: <explanation>
        className={`${activeThread || activeChatbot ? "" : "hidden"} ${chatPanelClassName}`}
        scrollToBottom={
          isOpenPopup && isPopup && scrollToBottomOfPopup
            ? scrollToBottomOfPopup
            : scrollToBottom
        }
        id={params.threadId || isNewChat ? threadId : activeThread?.threadId}
        isLoading={isLoading}
        loadingState={loadingState}
        stop={stop}
        append={appendWithMbContextPrompts}
        reload={reload}
        messages={threadAllMessages}
        input={input}
        setInput={setInput}
        chatbot={chatbot}
        placeholder={
          chatbot
            ? isNewChat
              ? `Start New Chat with ${chatbot.name}`
              : `Continue This Chat with ${chatbot.name}`
            : ""
        }
        showReload={!isNewChat}
        isAtBottom={
          params.threadId
            ? isAtBottom
            : isPopup
              ? Boolean(isAtBottomOfPopup)
              : isAtBottomOfSection
        }
      />
    </>
  );
}
