-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."model_type" AS ENUM('free', 'paid', 'pro');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('admin', 'user', 'moderator', 'anonymous');--> statement-breakpoint
CREATE TABLE "category" (
	"category_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "category_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "chatbot" (
	"chatbot_id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"avatar" text,
	"created_by" text NOT NULL,
	"default_tone" text,
	"default_length" text,
	"default_type" text,
	"default_complexity" text,
	CONSTRAINT "chatbot_name_key" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "message_type_enum" (
	"value" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prompt" (
	"content" text NOT NULL,
	"type" text NOT NULL,
	"prompt_id" serial PRIMARY KEY NOT NULL,
	"prompt_name" text,
	CONSTRAINT "prompt_prompt_id_key" UNIQUE("prompt_id")
);
--> statement-breakpoint
CREATE TABLE "prompt_type_enum" (
	"value" text PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "complexity_enum" (
	"value" text PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "length_enum" (
	"value" text PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tone_enum" (
	"value" text PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "type_enum" (
	"value" text PRIMARY KEY NOT NULL,
	"prompt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "preference" (
	"preference_id" serial PRIMARY KEY NOT NULL,
	"chatbot_id" integer NOT NULL,
	"preferred_tone" text NOT NULL,
	"preferred_length" text NOT NULL,
	"preferred_type" text NOT NULL,
	"preferred_complexity" text NOT NULL,
	"favorite" boolean,
	"user_id" uuid,
	"web_search" boolean DEFAULT false,
	"deep_expertise" boolean DEFAULT false,
	CONSTRAINT "preference_user_id_key" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "referral" (
	"referral_code" varchar(6) PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"referrer_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"username" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"date_joined" timestamp with time zone DEFAULT now() NOT NULL,
	"last_login" timestamp with time zone DEFAULT now(),
	"profile_picture" text,
	"user_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"slug" text NOT NULL,
	"get_free_month" boolean DEFAULT false,
	"pro_user_subscription_id" text DEFAULT '' NOT NULL,
	"is_blocked" boolean DEFAULT false,
	"is_verified" boolean DEFAULT false,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"bio" text,
	"favourite_topic" text,
	"deletion_requested_at" timestamp with time zone,
	CONSTRAINT "user_username_key" UNIQUE("username"),
	CONSTRAINT "user_email_key" UNIQUE("email"),
	CONSTRAINT "unique_slug" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "models_enum" (
	"name" text PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	CONSTRAINT "models_enum_value_key" UNIQUE("value")
);
--> statement-breakpoint
CREATE TABLE "example" (
	"example_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prompt" text NOT NULL,
	"response" text NOT NULL,
	"domain" varchar NOT NULL,
	"category" varchar NOT NULL,
	"subcategory" varchar NOT NULL,
	"tags" uuid[] NOT NULL,
	"metadata" jsonb NOT NULL,
	"added" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "domain_enum" (
	"name" varchar PRIMARY KEY NOT NULL,
	"added" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "token" (
	"token" text PRIMARY KEY NOT NULL,
	"token_expiry" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tag_enum" (
	"name" varchar NOT NULL,
	"domain" varchar NOT NULL,
	"frequency" numeric NOT NULL,
	"tag_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	CONSTRAINT "tag_enum_name_domain_key" UNIQUE("name","domain")
);
--> statement-breakpoint
CREATE TABLE "social_following" (
	"follower_id" uuid NOT NULL,
	"followee_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"followee_id_chatbot" integer,
	CONSTRAINT "social_following_check" CHECK (follower_id <> followee_id)
);
--> statement-breakpoint
CREATE TABLE "models" (
	"model" text PRIMARY KEY NOT NULL,
	"enabled" boolean DEFAULT false NOT NULL,
	"type" "model_type" DEFAULT 'free' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "chatbot_category" (
	"chatbot_id" integer NOT NULL,
	"category_id" integer NOT NULL,
	CONSTRAINT "chatbot_category_pkey" PRIMARY KEY("chatbot_id","category_id")
);
--> statement-breakpoint
CREATE TABLE "prompt_chatbot" (
	"prompt_id" integer NOT NULL,
	"chabot_id" integer NOT NULL,
	CONSTRAINT "prompt_chatbot_pkey" PRIMARY KEY("prompt_id","chabot_id")
);
--> statement-breakpoint
CREATE TABLE "prompt_user" (
	"user_id" uuid NOT NULL,
	"prompt_id" integer NOT NULL,
	CONSTRAINT "prompt_user_pkey" PRIMARY KEY("user_id","prompt_id")
);
--> statement-breakpoint
CREATE TABLE "user_token" (
	"user_id" uuid NOT NULL,
	"token" text NOT NULL,
	CONSTRAINT "user_token_pkey" PRIMARY KEY("user_id","token")
);
--> statement-breakpoint
CREATE TABLE "chatbot_domain" (
	"chatbot_id" integer NOT NULL,
	"domain_name" text NOT NULL,
	CONSTRAINT "chatbot_domain_pkey" PRIMARY KEY("chatbot_id","domain_name")
);
--> statement-breakpoint
CREATE TABLE "category_enum" (
	"name" varchar NOT NULL,
	"domain" varchar NOT NULL,
	"added" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "category_enum_pkey" PRIMARY KEY("name","domain")
);
--> statement-breakpoint
CREATE TABLE "subcategory_enum" (
	"name" varchar NOT NULL,
	"category" varchar NOT NULL,
	"domain" varchar NOT NULL,
	"added" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subcategory_enum_pkey" PRIMARY KEY("name","category","domain")
);
--> statement-breakpoint
CREATE TABLE "thread" (
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"chatbot_id" integer NOT NULL,
	"thread_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"is_public" boolean DEFAULT true,
	"model" varchar(30) DEFAULT 'openAi' NOT NULL,
	"is_approved" boolean DEFAULT false,
	"is_blocked" boolean DEFAULT false,
	"parent_thread_id" uuid,
	"slug" text NOT NULL,
	"short_link" text,
	CONSTRAINT "thread_pkey" PRIMARY KEY("thread_id","slug"),
	CONSTRAINT "thread_id_key" UNIQUE("thread_id"),
	CONSTRAINT "thread_slug_unique" UNIQUE("slug"),
	CONSTRAINT "thread_short_link_key" UNIQUE("short_link")
);
--> statement-breakpoint
CREATE TABLE "message" (
	"content" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"message_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"thread_id" uuid,
	"prompt" text,
	"augmented_from" uuid,
	"examples" jsonb,
	"slug" text NOT NULL,
	"thinking" text,
	"thinking_traces" text[],
	"isContinued" boolean DEFAULT false,
	"model" text,
	"short_link" text,
	CONSTRAINT "message_pkey" PRIMARY KEY("message_id","slug"),
	CONSTRAINT "message_id_key" UNIQUE("message_id"),
	CONSTRAINT "message_slug_unique" UNIQUE("slug"),
	CONSTRAINT "message_short_link_key" UNIQUE("short_link")
);
--> statement-breakpoint
ALTER TABLE "chatbot" ADD CONSTRAINT "chatbot_default_complexity_fkey" FOREIGN KEY ("default_complexity") REFERENCES "public"."complexity_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "chatbot" ADD CONSTRAINT "chatbot_default_length_fkey" FOREIGN KEY ("default_length") REFERENCES "public"."length_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "chatbot" ADD CONSTRAINT "chatbot_default_tone_fkey" FOREIGN KEY ("default_tone") REFERENCES "public"."tone_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "chatbot" ADD CONSTRAINT "chatbot_default_type_fkey" FOREIGN KEY ("default_type") REFERENCES "public"."type_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "prompt" ADD CONSTRAINT "prompt_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."prompt_type_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "user_chatbot_preference_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "user_chatbot_preference_preferred_complexity_fkey" FOREIGN KEY ("preferred_complexity") REFERENCES "public"."complexity_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "user_chatbot_preference_preferred_length_fkey" FOREIGN KEY ("preferred_length") REFERENCES "public"."length_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "user_chatbot_preference_preferred_tone_fkey" FOREIGN KEY ("preferred_tone") REFERENCES "public"."tone_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "user_chatbot_preference_preferred_type_fkey" FOREIGN KEY ("preferred_type") REFERENCES "public"."type_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "preference" ADD CONSTRAINT "user_chatbot_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referral" ADD CONSTRAINT "referral_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "referral" ADD CONSTRAINT "referral_referrer_id_fkey" FOREIGN KEY ("referrer_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "example" ADD CONSTRAINT "example_domain_category_subcategory_fkey" FOREIGN KEY ("domain","category","subcategory") REFERENCES "public"."subcategory_enum"("name","category","domain") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "tag_enum" ADD CONSTRAINT "tag_enum_domain_fkey" FOREIGN KEY ("domain") REFERENCES "public"."domain_enum"("name") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "social_following" ADD CONSTRAINT "social_following_follower_id_fkey" FOREIGN KEY ("follower_id") REFERENCES "public"."user"("user_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "social_following" ADD CONSTRAINT "social_following_followee_id_fkey" FOREIGN KEY ("followee_id") REFERENCES "public"."user"("user_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "social_following" ADD CONSTRAINT "social_following_followee_id_chatbot_fkey" FOREIGN KEY ("followee_id_chatbot") REFERENCES "public"."chatbot"("chatbot_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "models" ADD CONSTRAINT "models_model_fkey" FOREIGN KEY ("model") REFERENCES "public"."models_enum"("value") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "chatbot_category" ADD CONSTRAINT "chatbot_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "chatbot_category" ADD CONSTRAINT "chatbot_category_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "prompt_chatbot" ADD CONSTRAINT "prompt_chatbot_chabot_id_fkey" FOREIGN KEY ("chabot_id") REFERENCES "public"."chatbot"("chatbot_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "prompt_chatbot" ADD CONSTRAINT "prompt_chatbot_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompt"("prompt_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "prompt_user" ADD CONSTRAINT "prompt_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "prompt_user" ADD CONSTRAINT "prompt_user_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompt"("prompt_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_token_fkey" FOREIGN KEY ("token") REFERENCES "public"."token"("token") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "user_token" ADD CONSTRAINT "user_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "chatbot_domain" ADD CONSTRAINT "chatbot_domain_domain_name_fkey" FOREIGN KEY ("domain_name") REFERENCES "public"."domain_enum"("name") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "chatbot_domain" ADD CONSTRAINT "chatbot_domain_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "category_enum" ADD CONSTRAINT "category_enum_domain_fkey" FOREIGN KEY ("domain") REFERENCES "public"."domain_enum"("name") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "subcategory_enum" ADD CONSTRAINT "subcategory_enum_category_domain_fkey" FOREIGN KEY ("category","domain") REFERENCES "public"."category_enum"("name","domain") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "thread" ADD CONSTRAINT "thread_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "thread" ADD CONSTRAINT "thread_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "thread" ADD CONSTRAINT "fk_model" FOREIGN KEY ("model") REFERENCES "public"."models_enum"("name") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "thread" ADD CONSTRAINT "thread_parent_thread_id_fkey" FOREIGN KEY ("parent_thread_id") REFERENCES "public"."thread"("thread_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_type_fkey" FOREIGN KEY ("role") REFERENCES "public"."message_type_enum"("value") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_augmented_from_fkey" FOREIGN KEY ("augmented_from") REFERENCES "public"."message"("message_id") ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "public"."thread"("thread_id") ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX "idx_users_role" ON "user" USING btree ("role" enum_ops);--> statement-breakpoint
CREATE INDEX "idx_models_enum_value" ON "models_enum" USING btree ("value" text_ops);--> statement-breakpoint
CREATE INDEX "idx_social_following_followee" ON "social_following" USING btree ("followee_id" uuid_ops);--> statement-breakpoint
CREATE INDEX "idx_social_following_follower" ON "social_following" USING btree ("follower_id" uuid_ops);
*/