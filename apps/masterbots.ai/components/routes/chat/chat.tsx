"use client";

import {
  improveMessage,
  getChatbotMetadataLabels,
} from "@/app/api/chat/actions/actions";
import { ChatList } from "@/components/routes/chat/chat-list";
import { ChatPanel } from "@/components/routes/chat/chat-panel";
import { ChatScrollAnchor } from "@/components/routes/chat/chat-scroll-anchor";
import { botNames } from "@/lib/bots-names";
import { followingQuestionsPrompt, withExamples, setDefaultPrompt } from '@/lib/constants/prompts';
import { useAtBottom } from "@/lib/hooks/use-at-bottom";
import { useModel } from "@/lib/hooks/use-model";
import { useSidebar } from "@/lib/hooks/use-sidebar";
import { useThread } from "@/lib/hooks/use-thread";
import { cn, scrollToBottomOfElement } from "@/lib/utils";
import { createThread, getThread, saveNewMessage, fetchDomainExamples, fetchDomainTags } from "@/services/hasura";
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
import React, { useEffect } from "react";
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
  } = useThread();
  const { activeChatbot } = useSidebar();
  const containerRef = React.useRef<HTMLDivElement>();

  const params = useParams<{ chatbot: string; threadId: string }>();
  const isNewChat = Boolean(!params.threadId && !activeThread);
  const { selectedModel, clientType } = useModel();
  const [loadingState, setLoadingState] = React.useState<ChatLoadingState>();

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

    // * Loading: processing your request... 'processing'
    setLoadingState("processing");

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

    console.log("Processed Message: ", processedMessage);

    // ! Loading: Generating awesome stuff for you... 'generating'
    setLoadingState("generating");

    let chatMetadata;
    try{
      chatMetadata = await getChatbotMetadataLabels(
        {
          domain: chatbot?.categories[0].categoryId,
          chatbot: chatbot?.chatbotId,
        },
        userContent,
        clientType as AiClientType,
      );
      console.log(
        "Full responses from getChatbotMetadataLabels:",
        chatMetadata,
      );

      // * Loading: Polishing Ai request... 'polishing'
      setLoadingState("polishing");
    } catch (error) {
      console.error("Error getting chatbot metadata labels:", error);
    }

    let tagExamples = []
    let categoryExamples = []
    // * Getting the user labelling the thread (categories, sub-category, etc.)
    try {

      // todo: add the logic for retrieving the relevant examples
      // pull all the examples for the domain
      const domainExamples = await fetchDomainExamples(chatMetadata.domain)
      console.log('Domain examples:', domainExamples)
      const domainTags = await fetchDomainTags(chatMetadata.domain)
      console.log('Domain tags:', domainTags)

      console.log('Domain tags length:', Object.keys(domainTags).length)

      // the domainTags keys are tag ids, the values are an object with the name and frequency of the tag
      // every example has a list of tags (tag ids); these match the domainTags object keys
      // the chat metadata has a tags field as well; this is a list of tags (tag names)
      // i need to go through the list of examples
      // for each i need to get the list of tag ids and use teh domainTags object to get their names
      // then i need to check if the name is in the chat metadata tags list
      // i need to take a cumulative sum of 1-the frequency of the tag in the domainTags object 
      // i need to store this cumulative sum in the example object

      for (let example of domainExamples) {
        let cumulativeSum = 0
        for (let tagId of example.tags) {
          try {
            let tagName = domainTags[tagId].name
            if (chatMetadata.tags.includes(tagName)) {
              cumulativeSum += 1 - domainTags[tagId].frequency
            }
          } catch (error) {
            console.log('Error:', error)
            console.log('Tag id:', tagId)
          }
        }
        example['cumulativeSum'] = cumulativeSum
      }

      // now i need to sort the examples by the cumulative sum, in descending order
      domainExamples.sort((a, b) => b.cumulativeSum - a.cumulativeSum)

      console.log('Sorted domain examples:', domainExamples)

      // then i need to take the top 3 examples
      // however, i do not want to take examples that have the same prompt
      let used_prompts = []
      for (let example of domainExamples) {
        if (used_prompts.includes(example.prompt)) {
          continue
        }
        if (tagExamples.length < 3) {
          tagExamples.push(example)
          used_prompts.push(example.prompt)
        } else if (categoryExamples.length < 3) {
          if ((example.category == chatMetadata.category) && (example.subcategory == chatMetadata.subCategory)) {
            categoryExamples.push(example)
            used_prompts.push(example.prompt)        
          }
        } else {
          break
        }
      }

      console.log('Tag examples length:', tagExamples.length)
      console.log('Category examples length:', categoryExamples.length)

      console.log('Tag examples:', tagExamples)
      console.log('Category examples:', categoryExamples)
    } catch (error) {
      console.error("Error getting chatbot metadata labels:", error);
    }


    // ! Connecting to the ICL to send the user labelling the thread and rawData (examples) to the ICL
    // TODO: ...
    const postIclResponse = (await new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({
          parsed: chatMetadata,
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

    if (isNewChat && chatbot) {
      await createThread({
        threadId,
        chatbotId: chatbot.chatbotId,
        jwt: session.user?.hasuraJwt,
        userId: session.user.id,
        isPublic: activeChatbot?.name !== "BlankBot",
      });
      const thread = await getThread({
        threadId,
        jwt: session.user?.hasuraJwt,
      });
      setActiveThread(thread);
      setIsOpenPopup(true);
    }
    if (activeThread?.threadId) {
      setIsOpenPopup(true);
    }

    let originalMessage = await saveNewMessage({
      role: 'user', 
      threadId: 
        params.threadId || isNewChat ? threadId : activeThread?.threadId, 
      content: userMessage.content, 
      jwt: session!.user?.hasuraJwt
    })

    console.log('Original message:', originalMessage)

    await saveNewMessage({
      role: "user",
      threadId:
        params.threadId || isNewChat ? threadId : activeThread?.threadId,
      content: userContent,
      jwt: session.user?.hasuraJwt,
    });

    setIsNewResponse(true);

    let oldContent = followingQuestionsPrompt(userContent, allMessages);
    console.log('oldContent', oldContent)
    let newContent = withExamples(categoryExamples, tagExamples, [], userContent) 
    console.log('newContent', newContent)

    return append(
      isNewChat
        ? { 
          ...userMessage, 
          content: withExamples(categoryExamples, tagExamples, [], userContent) 
        }
        : {
          ...userMessage,
          content: withExamples(categoryExamples, tagExamples, allMessages, userContent)
        },
    ).then((response) => {
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
        messages={allMessages}
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
