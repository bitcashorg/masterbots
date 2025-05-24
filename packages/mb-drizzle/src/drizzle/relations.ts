import { relations } from "drizzle-orm/relations";
import {
  complexityEnum,
  chatbot,
  lengthEnum,
  toneEnum,
  typeEnum,
  promptTypeEnum,
  prompt,
  preference,
  user,
  referral,
  subcategoryEnum,
  example,
  domainEnum,
  tagEnum,
  socialFollowing,
  modelsEnum,
  models,
  category,
  chatbotCategory,
  promptChatbot,
  promptUser,
  token,
  userToken,
  chatbotDomain,
  categoryEnum,
  thread,
  messageTypeEnum,
  message,
} from "./schema";

export const chatbotRelations = relations(chatbot, ({ one, many }) => ({
  complexityEnum: one(complexityEnum, {
    fields: [chatbot.defaultComplexity],
    references: [complexityEnum.value],
  }),
  lengthEnum: one(lengthEnum, {
    fields: [chatbot.defaultLength],
    references: [lengthEnum.value],
  }),
  toneEnum: one(toneEnum, {
    fields: [chatbot.defaultTone],
    references: [toneEnum.value],
  }),
  typeEnum: one(typeEnum, {
    fields: [chatbot.defaultType],
    references: [typeEnum.value],
  }),
  preferences: many(preference),
  socialFollowings: many(socialFollowing),
  chatbotCategories: many(chatbotCategory),
  promptChatbots: many(promptChatbot),
  chatbotDomains: many(chatbotDomain),
  threads: many(thread),
}));

export const complexityEnumRelations = relations(
  complexityEnum,
  ({ many }) => ({
    chatbots: many(chatbot),
    preferences: many(preference),
  }),
);

export const lengthEnumRelations = relations(lengthEnum, ({ many }) => ({
  chatbots: many(chatbot),
  preferences: many(preference),
}));

export const toneEnumRelations = relations(toneEnum, ({ many }) => ({
  chatbots: many(chatbot),
  preferences: many(preference),
}));

export const typeEnumRelations = relations(typeEnum, ({ many }) => ({
  chatbots: many(chatbot),
  preferences: many(preference),
}));

export const promptRelations = relations(prompt, ({ one, many }) => ({
  promptTypeEnum: one(promptTypeEnum, {
    fields: [prompt.type],
    references: [promptTypeEnum.value],
  }),
  promptChatbots: many(promptChatbot),
  promptUsers: many(promptUser),
}));

export const promptTypeEnumRelations = relations(
  promptTypeEnum,
  ({ many }) => ({
    prompts: many(prompt),
  }),
);

export const preferenceRelations = relations(preference, ({ one }) => ({
  chatbot: one(chatbot, {
    fields: [preference.chatbotId],
    references: [chatbot.chatbotId],
  }),
  complexityEnum: one(complexityEnum, {
    fields: [preference.preferredComplexity],
    references: [complexityEnum.value],
  }),
  lengthEnum: one(lengthEnum, {
    fields: [preference.preferredLength],
    references: [lengthEnum.value],
  }),
  toneEnum: one(toneEnum, {
    fields: [preference.preferredTone],
    references: [toneEnum.value],
  }),
  typeEnum: one(typeEnum, {
    fields: [preference.preferredType],
    references: [typeEnum.value],
  }),
  user: one(user, {
    fields: [preference.userId],
    references: [user.userId],
  }),
}));

export const userRelations = relations(user, ({ many }) => ({
  preferences: many(preference),
  referrals_userId: many(referral, {
    relationName: "referral_userId_user_userId",
  }),
  referrals_referrerId: many(referral, {
    relationName: "referral_referrerId_user_userId",
  }),
  socialFollowings_followerId: many(socialFollowing, {
    relationName: "socialFollowing_followerId_user_userId",
  }),
  socialFollowings_followeeId: many(socialFollowing, {
    relationName: "socialFollowing_followeeId_user_userId",
  }),
  promptUsers: many(promptUser),
  userTokens: many(userToken),
  threads: many(thread),
}));

export const referralRelations = relations(referral, ({ one }) => ({
  user_userId: one(user, {
    fields: [referral.userId],
    references: [user.userId],
    relationName: "referral_userId_user_userId",
  }),
  user_referrerId: one(user, {
    fields: [referral.referrerId],
    references: [user.userId],
    relationName: "referral_referrerId_user_userId",
  }),
}));

export const exampleRelations = relations(example, ({ one }) => ({
  subcategoryEnum: one(subcategoryEnum, {
    fields: [example.domain],
    references: [subcategoryEnum.name],
  }),
}));

export const subcategoryEnumRelations = relations(
  subcategoryEnum,
  ({ one, many }) => ({
    examples: many(example),
    categoryEnum: one(categoryEnum, {
      fields: [subcategoryEnum.category],
      references: [categoryEnum.name],
    }),
  }),
);

export const tagEnumRelations = relations(tagEnum, ({ one }) => ({
  domainEnum: one(domainEnum, {
    fields: [tagEnum.domain],
    references: [domainEnum.name],
  }),
}));

export const domainEnumRelations = relations(domainEnum, ({ many }) => ({
  tagEnums: many(tagEnum),
  chatbotDomains: many(chatbotDomain),
  categoryEnums: many(categoryEnum),
}));

export const socialFollowingRelations = relations(
  socialFollowing,
  ({ one }) => ({
    user_followerId: one(user, {
      fields: [socialFollowing.followerId],
      references: [user.userId],
      relationName: "socialFollowing_followerId_user_userId",
    }),
    user_followeeId: one(user, {
      fields: [socialFollowing.followeeId],
      references: [user.userId],
      relationName: "socialFollowing_followeeId_user_userId",
    }),
    chatbot: one(chatbot, {
      fields: [socialFollowing.followeeIdChatbot],
      references: [chatbot.chatbotId],
    }),
  }),
);

export const modelsRelations = relations(models, ({ one }) => ({
  modelsEnum: one(modelsEnum, {
    fields: [models.model],
    references: [modelsEnum.value],
  }),
}));

export const modelsEnumRelations = relations(modelsEnum, ({ many }) => ({
  models: many(models),
  threads: many(thread),
}));

export const chatbotCategoryRelations = relations(
  chatbotCategory,
  ({ one }) => ({
    category: one(category, {
      fields: [chatbotCategory.categoryId],
      references: [category.categoryId],
    }),
    chatbot: one(chatbot, {
      fields: [chatbotCategory.chatbotId],
      references: [chatbot.chatbotId],
    }),
  }),
);

export const categoryRelations = relations(category, ({ many }) => ({
  chatbotCategories: many(chatbotCategory),
}));

export const promptChatbotRelations = relations(promptChatbot, ({ one }) => ({
  chatbot: one(chatbot, {
    fields: [promptChatbot.chabotId],
    references: [chatbot.chatbotId],
  }),
  prompt: one(prompt, {
    fields: [promptChatbot.promptId],
    references: [prompt.promptId],
  }),
}));

export const promptUserRelations = relations(promptUser, ({ one }) => ({
  user: one(user, {
    fields: [promptUser.userId],
    references: [user.userId],
  }),
  prompt: one(prompt, {
    fields: [promptUser.promptId],
    references: [prompt.promptId],
  }),
}));

export const userTokenRelations = relations(userToken, ({ one }) => ({
  token: one(token, {
    fields: [userToken.token],
    references: [token.token],
  }),
  user: one(user, {
    fields: [userToken.userId],
    references: [user.userId],
  }),
}));

export const tokenRelations = relations(token, ({ many }) => ({
  userTokens: many(userToken),
}));

export const chatbotDomainRelations = relations(chatbotDomain, ({ one }) => ({
  domainEnum: one(domainEnum, {
    fields: [chatbotDomain.domainName],
    references: [domainEnum.name],
  }),
  chatbot: one(chatbot, {
    fields: [chatbotDomain.chatbotId],
    references: [chatbot.chatbotId],
  }),
}));

export const categoryEnumRelations = relations(
  categoryEnum,
  ({ one, many }) => ({
    domainEnum: one(domainEnum, {
      fields: [categoryEnum.domain],
      references: [domainEnum.name],
    }),
    subcategoryEnums: many(subcategoryEnum),
  }),
);

export const threadRelations = relations(thread, ({ one, many }) => ({
  chatbot: one(chatbot, {
    fields: [thread.chatbotId],
    references: [chatbot.chatbotId],
  }),
  user: one(user, {
    fields: [thread.userId],
    references: [user.userId],
  }),
  modelsEnum: one(modelsEnum, {
    fields: [thread.model],
    references: [modelsEnum.name],
  }),
  thread: one(thread, {
    fields: [thread.parentThreadId],
    references: [thread.threadId],
    relationName: "thread_parentThreadId_thread_threadId",
  }),
  threads: many(thread, {
    relationName: "thread_parentThreadId_thread_threadId",
  }),
  messages: many(message),
}));

export const messageRelations = relations(message, ({ one, many }) => ({
  messageTypeEnum: one(messageTypeEnum, {
    fields: [message.role],
    references: [messageTypeEnum.value],
  }),
  message: one(message, {
    fields: [message.augmentedFrom],
    references: [message.messageId],
    relationName: "message_augmentedFrom_message_messageId",
  }),
  messages: many(message, {
    relationName: "message_augmentedFrom_message_messageId",
  }),
  thread: one(thread, {
    fields: [message.threadId],
    references: [thread.threadId],
  }),
}));

export const messageTypeEnumRelations = relations(
  messageTypeEnum,
  ({ many }) => ({
    messages: many(message),
  }),
);
