import { pgTable, unique, serial, text, foreignKey, integer, boolean, uuid, varchar, index, timestamp, jsonb, numeric, check, primaryKey, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const modelType = pgEnum("model_type", ['free', 'paid', 'pro'])
export const userRole = pgEnum("user_role", ['admin', 'user', 'moderator', 'anonymous'])


export const category = pgTable("category", {
	categoryId: serial("category_id").primaryKey().notNull(),
	name: text().notNull(),
}, (table) => [
	unique("category_name_key").on(table.name),
]);

export const chatbot = pgTable("chatbot", {
	chatbotId: serial("chatbot_id").primaryKey().notNull(),
	name: text().notNull(),
	description: text(),
	avatar: text(),
	createdBy: text("created_by").notNull(),
	defaultTone: text("default_tone"),
	defaultLength: text("default_length"),
	defaultType: text("default_type"),
	defaultComplexity: text("default_complexity"),
}, (table) => [
	foreignKey({
			columns: [table.defaultComplexity],
			foreignColumns: [complexityEnum.value],
			name: "chatbot_default_complexity_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.defaultLength],
			foreignColumns: [lengthEnum.value],
			name: "chatbot_default_length_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.defaultTone],
			foreignColumns: [toneEnum.value],
			name: "chatbot_default_tone_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.defaultType],
			foreignColumns: [typeEnum.value],
			name: "chatbot_default_type_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	unique("chatbot_name_key").on(table.name),
]);

export const messageTypeEnum = pgTable("message_type_enum", {
	value: text().primaryKey().notNull(),
});

export const prompt = pgTable("prompt", {
	content: text().notNull(),
	type: text().notNull(),
	promptId: serial("prompt_id").primaryKey().notNull(),
	promptName: text("prompt_name"),
}, (table) => [
	foreignKey({
			columns: [table.type],
			foreignColumns: [promptTypeEnum.value],
			name: "prompt_type_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	unique("prompt_prompt_id_key").on(table.promptId),
]);

export const promptTypeEnum = pgTable("prompt_type_enum", {
	value: text().primaryKey().notNull(),
});

export const complexityEnum = pgTable("complexity_enum", {
	value: text().primaryKey().notNull(),
	prompt: text().notNull(),
});

export const lengthEnum = pgTable("length_enum", {
	value: text().primaryKey().notNull(),
	prompt: text().notNull(),
});

export const toneEnum = pgTable("tone_enum", {
	value: text().primaryKey().notNull(),
	prompt: text().notNull(),
});

export const typeEnum = pgTable("type_enum", {
	value: text().primaryKey().notNull(),
	prompt: text().notNull(),
});

export const preference = pgTable("preference", {
	preferenceId: serial("preference_id").primaryKey().notNull(),
	chatbotId: integer("chatbot_id").notNull(),
	preferredTone: text("preferred_tone").notNull(),
	preferredLength: text("preferred_length").notNull(),
	preferredType: text("preferred_type").notNull(),
	preferredComplexity: text("preferred_complexity").notNull(),
	favorite: boolean(),
	userId: uuid("user_id"),
	webSearch: boolean("web_search").default(false),
	deepExpertise: boolean("deep_expertise").default(false),
}, (table) => [
	foreignKey({
			columns: [table.chatbotId],
			foreignColumns: [chatbot.chatbotId],
			name: "user_chatbot_preference_chatbot_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.preferredComplexity],
			foreignColumns: [complexityEnum.value],
			name: "user_chatbot_preference_preferred_complexity_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.preferredLength],
			foreignColumns: [lengthEnum.value],
			name: "user_chatbot_preference_preferred_length_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.preferredTone],
			foreignColumns: [toneEnum.value],
			name: "user_chatbot_preference_preferred_tone_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.preferredType],
			foreignColumns: [typeEnum.value],
			name: "user_chatbot_preference_preferred_type_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "user_chatbot_preference_user_id_fkey"
		}),
	unique("preference_user_id_key").on(table.userId),
]);

export const referral = pgTable("referral", {
	referralCode: varchar("referral_code", { length: 6 }).primaryKey().notNull(),
	userId: uuid("user_id").notNull(),
	referrerId: uuid("referrer_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "referral_user_id_fkey"
		}),
	foreignKey({
			columns: [table.referrerId],
			foreignColumns: [user.userId],
			name: "referral_referrer_id_fkey"
		}),
]);

export const user = pgTable("user", {
	username: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	dateJoined: timestamp("date_joined", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	lastLogin: timestamp("last_login", { withTimezone: true, mode: 'string' }).defaultNow(),
	profilePicture: text("profile_picture"),
	userId: uuid("user_id").default(sql`uuid_generate_v4()`).primaryKey().notNull(),
	slug: text().notNull(),
	getFreeMonth: boolean("get_free_month").default(false),
	proUserSubscriptionId: text("pro_user_subscription_id").default(').notNull(),
	isBlocked: boolean("is_blocked").default(false),
	isVerified: boolean("is_verified").default(false),
	role: userRole().default('user').notNull(),
	bio: text(),
	favouriteTopic: text("favourite_topic"),
	deletionRequestedAt: timestamp("deletion_requested_at", { withTimezone: true, mode: 'string' }),
}, (table) => [
	index("idx_users_role").using("btree", table.role.asc().nullsLast().op("enum_ops")),
	unique("user_username_key").on(table.username),
	unique("user_email_key").on(table.email),
	unique("unique_slug").on(table.slug),
]);

export const modelsEnum = pgTable("models_enum", {
	name: text().primaryKey().notNull(),
	value: text().notNull(),
}, (table) => [
	index("idx_models_enum_value").using("btree", table.value.asc().nullsLast().op("text_ops")),
	unique("models_enum_value_key").on(table.value),
]);

export const example = pgTable("example", {
	exampleId: uuid("example_id").defaultRandom().primaryKey().notNull(),
	prompt: text().notNull(),
	response: text().notNull(),
	domain: varchar().notNull(),
	category: varchar().notNull(),
	subcategory: varchar().notNull(),
	tags: uuid().array().notNull(),
	metadata: jsonb().notNull(),
	added: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.domain, table.category, table.subcategory],
			foreignColumns: [subcategoryEnum.name, subcategoryEnum.category, subcategoryEnum.domain],
			name: "example_domain_category_subcategory_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
]);

export const domainEnum = pgTable("domain_enum", {
	name: varchar().primaryKey().notNull(),
	added: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
});

export const token = pgTable("token", {
	token: text().primaryKey().notNull(),
	tokenExpiry: timestamp("token_expiry", { withTimezone: true, mode: 'string' }).notNull(),
});

export const tagEnum = pgTable("tag_enum", {
	name: varchar().notNull(),
	domain: varchar().notNull(),
	frequency: numeric().notNull(),
	tagId: uuid("tag_id").defaultRandom().primaryKey().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.domain],
			foreignColumns: [domainEnum.name],
			name: "tag_enum_domain_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	unique("tag_enum_name_domain_key").on(table.name, table.domain),
]);

export const socialFollowing = pgTable("social_following", {
	followerId: uuid("follower_id").notNull(),
	followeeId: uuid("followee_id"),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	followeeIdChatbot: integer("followee_id_chatbot"),
}, (table) => [
	index("idx_social_following_followee").using("btree", table.followeeId.asc().nullsLast().op("uuid_ops")),
	index("idx_social_following_follower").using("btree", table.followerId.asc().nullsLast().op("uuid_ops")),
	foreignKey({
			columns: [table.followerId],
			foreignColumns: [user.userId],
			name: "social_following_follower_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.followeeId],
			foreignColumns: [user.userId],
			name: "social_following_followee_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.followeeIdChatbot],
			foreignColumns: [chatbot.chatbotId],
			name: "social_following_followee_id_chatbot_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	check("social_following_check", sql`follower_id <> followee_id`),
]);

export const models = pgTable("models", {
	model: text().primaryKey().notNull(),
	enabled: boolean().default(false).notNull(),
	type: modelType().default('free').notNull(),
}, (table) => [
	foreignKey({
			columns: [table.model],
			foreignColumns: [modelsEnum.value],
			name: "models_model_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const chatbotCategory = pgTable("chatbot_category", {
	chatbotId: integer("chatbot_id").notNull(),
	categoryId: integer("category_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.categoryId],
			name: "chatbot_category_category_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.chatbotId],
			foreignColumns: [chatbot.chatbotId],
			name: "chatbot_category_chatbot_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.chatbotId, table.categoryId], name: "chatbot_category_pkey"}),
]);

export const promptChatbot = pgTable("prompt_chatbot", {
	promptId: integer("prompt_id").notNull(),
	chabotId: integer("chabot_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.chabotId],
			foreignColumns: [chatbot.chatbotId],
			name: "prompt_chatbot_chabot_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.promptId],
			foreignColumns: [prompt.promptId],
			name: "prompt_chatbot_prompt_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.promptId, table.chabotId], name: "prompt_chatbot_pkey"}),
]);

export const promptUser = pgTable("prompt_user", {
	userId: uuid("user_id").notNull(),
	promptId: integer("prompt_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "prompt_user_user_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.promptId],
			foreignColumns: [prompt.promptId],
			name: "prompt_user_prompt_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.userId, table.promptId], name: "prompt_user_pkey"}),
]);

export const userToken = pgTable("user_token", {
	userId: uuid("user_id").notNull(),
	token: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.token],
			foreignColumns: [token.token],
			name: "user_token_token_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "user_token_user_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.userId, table.token], name: "user_token_pkey"}),
]);

export const chatbotDomain = pgTable("chatbot_domain", {
	chatbotId: integer("chatbot_id").notNull(),
	domainName: text("domain_name").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.domainName],
			foreignColumns: [domainEnum.name],
			name: "chatbot_domain_domain_name_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.chatbotId],
			foreignColumns: [chatbot.chatbotId],
			name: "chatbot_domain_chatbot_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.chatbotId, table.domainName], name: "chatbot_domain_pkey"}),
]);

export const categoryEnum = pgTable("category_enum", {
	name: varchar().notNull(),
	domain: varchar().notNull(),
	added: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.domain],
			foreignColumns: [domainEnum.name],
			name: "category_enum_domain_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.name, table.domain], name: "category_enum_pkey"}),
]);

export const subcategoryEnum = pgTable("subcategory_enum", {
	name: varchar().notNull(),
	category: varchar().notNull(),
	domain: varchar().notNull(),
	added: timestamp({ withTimezone: true, mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.category, table.domain],
			foreignColumns: [categoryEnum.name, categoryEnum.domain],
			name: "subcategory_enum_category_domain_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.name, table.category, table.domain], name: "subcategory_enum_pkey"}),
]);

export const thread = pgTable("thread", {
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	chatbotId: integer("chatbot_id").notNull(),
	threadId: uuid("thread_id").defaultRandom().notNull(),
	userId: uuid("user_id"),
	isPublic: boolean("is_public").default(true),
	model: varchar({ length: 30 }).default('openAi').notNull(),
	isApproved: boolean("is_approved").default(false),
	isBlocked: boolean("is_blocked").default(false),
	parentThreadId: uuid("parent_thread_id"),
	slug: text().notNull(),
	shortLink: text("short_link"),
}, (table) => [
	foreignKey({
			columns: [table.chatbotId],
			foreignColumns: [chatbot.chatbotId],
			name: "thread_chatbot_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.userId],
			name: "thread_user_id_fkey"
		}),
	foreignKey({
			columns: [table.model],
			foreignColumns: [modelsEnum.name],
			name: "fk_model"
		}),
	foreignKey({
			columns: [table.parentThreadId],
			foreignColumns: [table.threadId],
			name: "thread_parent_thread_id_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	primaryKey({ columns: [table.threadId, table.slug], name: "thread_pkey"}),
	unique("thread_id_key").on(table.threadId),
	unique("thread_slug_unique").on(table.slug),
	unique("thread_short_link_key").on(table.shortLink),
]);

export const message = pgTable("message", {
	content: text().notNull(),
	role: text().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	messageId: uuid("message_id").defaultRandom().notNull(),
	threadId: uuid("thread_id"),
	prompt: text(),
	augmentedFrom: uuid("augmented_from"),
	examples: jsonb(),
	slug: text().notNull(),
	thinking: text(),
	thinkingTraces: text("thinking_traces").array(),
	isContinued: boolean().default(false),
	model: text(),
	shortLink: text("short_link"),
}, (table) => [
	foreignKey({
			columns: [table.role],
			foreignColumns: [messageTypeEnum.value],
			name: "message_type_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.augmentedFrom],
			foreignColumns: [table.messageId],
			name: "message_augmented_from_fkey"
		}).onUpdate("restrict").onDelete("restrict"),
	foreignKey({
			columns: [table.threadId],
			foreignColumns: [thread.threadId],
			name: "message_thread_id_fkey"
		}).onUpdate("restrict").onDelete("cascade"),
	primaryKey({ columns: [table.messageId, table.slug], name: "message_pkey"}),
	unique("message_id_key").on(table.messageId),
	unique("message_slug_unique").on(table.slug),
	unique("message_short_link_key").on(table.shortLink),
]);
