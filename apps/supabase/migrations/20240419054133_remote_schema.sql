
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA IF NOT EXISTS "hdb_catalog";

ALTER SCHEMA "hdb_catalog" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE OR REPLACE FUNCTION "hdb_catalog"."gen_hasura_uuid"() RETURNS "uuid"
    LANGUAGE "sql"
    AS $$select gen_random_uuid()$$;

ALTER FUNCTION "hdb_catalog"."gen_hasura_uuid"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_action_log" (
    "id" "uuid" DEFAULT "hdb_catalog"."gen_hasura_uuid"() NOT NULL,
    "action_name" "text",
    "input_payload" "jsonb" NOT NULL,
    "request_headers" "jsonb" NOT NULL,
    "session_variables" "jsonb" NOT NULL,
    "response_payload" "jsonb",
    "errors" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "response_received_at" timestamp with time zone,
    "status" "text" NOT NULL,
    CONSTRAINT "hdb_action_log_status_check" CHECK (("status" = ANY (ARRAY['created'::"text", 'processing'::"text", 'completed'::"text", 'error'::"text"])))
);

ALTER TABLE "hdb_catalog"."hdb_action_log" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_cron_event_invocation_logs" (
    "id" "text" DEFAULT "hdb_catalog"."gen_hasura_uuid"() NOT NULL,
    "event_id" "text",
    "status" integer,
    "request" "json",
    "response" "json",
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "hdb_catalog"."hdb_cron_event_invocation_logs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_cron_events" (
    "id" "text" DEFAULT "hdb_catalog"."gen_hasura_uuid"() NOT NULL,
    "trigger_name" "text" NOT NULL,
    "scheduled_time" timestamp with time zone NOT NULL,
    "status" "text" DEFAULT 'scheduled'::"text" NOT NULL,
    "tries" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "next_retry_at" timestamp with time zone,
    CONSTRAINT "valid_status" CHECK (("status" = ANY (ARRAY['scheduled'::"text", 'locked'::"text", 'delivered'::"text", 'error'::"text", 'dead'::"text"])))
);

ALTER TABLE "hdb_catalog"."hdb_cron_events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_metadata" (
    "id" integer NOT NULL,
    "metadata" "json" NOT NULL,
    "resource_version" integer DEFAULT 1 NOT NULL
);

ALTER TABLE "hdb_catalog"."hdb_metadata" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_scheduled_event_invocation_logs" (
    "id" "text" DEFAULT "hdb_catalog"."gen_hasura_uuid"() NOT NULL,
    "event_id" "text",
    "status" integer,
    "request" "json",
    "response" "json",
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "hdb_catalog"."hdb_scheduled_event_invocation_logs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_scheduled_events" (
    "id" "text" DEFAULT "hdb_catalog"."gen_hasura_uuid"() NOT NULL,
    "webhook_conf" "json" NOT NULL,
    "scheduled_time" timestamp with time zone NOT NULL,
    "retry_conf" "json",
    "payload" "json",
    "header_conf" "json",
    "status" "text" DEFAULT 'scheduled'::"text" NOT NULL,
    "tries" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "next_retry_at" timestamp with time zone,
    "comment" "text",
    CONSTRAINT "valid_status" CHECK (("status" = ANY (ARRAY['scheduled'::"text", 'locked'::"text", 'delivered'::"text", 'error'::"text", 'dead'::"text"])))
);

ALTER TABLE "hdb_catalog"."hdb_scheduled_events" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_schema_notifications" (
    "id" integer NOT NULL,
    "notification" "json" NOT NULL,
    "resource_version" integer DEFAULT 1 NOT NULL,
    "instance_id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"(),
    CONSTRAINT "hdb_schema_notifications_id_check" CHECK (("id" = 1))
);

ALTER TABLE "hdb_catalog"."hdb_schema_notifications" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "hdb_catalog"."hdb_version" (
    "hasura_uuid" "uuid" DEFAULT "hdb_catalog"."gen_hasura_uuid"() NOT NULL,
    "version" "text" NOT NULL,
    "upgraded_on" timestamp with time zone NOT NULL,
    "cli_state" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "console_state" "jsonb" DEFAULT '{}'::"jsonb" NOT NULL,
    "ee_client_id" "text",
    "ee_client_secret" "text"
);

ALTER TABLE "hdb_catalog"."hdb_version" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."category" (
    "category_id" integer NOT NULL,
    "name" "text" NOT NULL
);

ALTER TABLE "public"."category" OWNER TO "postgres";

COMMENT ON TABLE "public"."category" IS 'Table to store different categories for chatbots.';

CREATE SEQUENCE IF NOT EXISTS "public"."category_category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."category_category_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."category_category_id_seq" OWNED BY "public"."category"."category_id";

CREATE TABLE IF NOT EXISTS "public"."chat" (
    "chat_id" integer NOT NULL,
    "chatbot_id" integer NOT NULL,
    "conversation_link" "text" NOT NULL,
    "added_by" "uuid"
);

ALTER TABLE "public"."chat" OWNER TO "postgres";

COMMENT ON TABLE "public"."chat" IS 'Table to store links to GPT chat conversations and associate them with a specific GPT chatbot and the user who added the link.';

CREATE TABLE IF NOT EXISTS "public"."chatbot" (
    "chatbot_id" integer NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "avatar" "text",
    "created_by" "text" NOT NULL,
    "default_tone" "text",
    "default_length" "text",
    "default_type" "text",
    "default_complexity" "text"
);

ALTER TABLE "public"."chatbot" OWNER TO "postgres";

COMMENT ON TABLE "public"."chatbot" IS 'Table storing information about chatbots, their characteristics, and default settings.';

CREATE TABLE IF NOT EXISTS "public"."chatbot_category" (
    "chatbot_id" integer NOT NULL,
    "category_id" integer NOT NULL
);

ALTER TABLE "public"."chatbot_category" OWNER TO "postgres";

COMMENT ON TABLE "public"."chatbot_category" IS 'Junction table to manage the many-to-many relationships between chatbots and their categories.';

CREATE SEQUENCE IF NOT EXISTS "public"."chatbot_chatbot_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."chatbot_chatbot_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."chatbot_chatbot_id_seq" OWNED BY "public"."chatbot"."chatbot_id";

CREATE TABLE IF NOT EXISTS "public"."complexity_enum" (
    "value" "text" NOT NULL
);

ALTER TABLE "public"."complexity_enum" OWNER TO "postgres";

CREATE SEQUENCE IF NOT EXISTS "public"."gpt_chat_gpt_chat_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."gpt_chat_gpt_chat_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."gpt_chat_gpt_chat_id_seq" OWNED BY "public"."chat"."chat_id";

CREATE TABLE IF NOT EXISTS "public"."length_enum" (
    "value" "text" NOT NULL
);

ALTER TABLE "public"."length_enum" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."message" (
    "content" "text" NOT NULL,
    "role" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "message_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "thread_id" "uuid"
);

ALTER TABLE "public"."message" OWNER TO "postgres";

COMMENT ON TABLE "public"."message" IS 'This table stores the messages exchanged between users and chatbots.';

CREATE TABLE IF NOT EXISTS "public"."message_type_enum" (
    "value" "text" NOT NULL
);

ALTER TABLE "public"."message_type_enum" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."preference" (
    "preference_id" integer NOT NULL,
    "chatbot_id" integer NOT NULL,
    "preferred_tone" "text" NOT NULL,
    "preferred_length" "text" NOT NULL,
    "preferred_type" "text" NOT NULL,
    "preferred_complexity" "text" NOT NULL,
    "favorite" boolean,
    "user_id" "uuid"
);

ALTER TABLE "public"."preference" OWNER TO "postgres";

COMMENT ON TABLE "public"."preference" IS 'This table stores user-specific preferences for quick access when they interact with a chatbot.';

CREATE TABLE IF NOT EXISTS "public"."prompt" (
    "content" "text" NOT NULL,
    "type" "text" NOT NULL,
    "prompt_id" integer NOT NULL,
    "prompt_name" "text"
);

ALTER TABLE "public"."prompt" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."prompt_chatbot" (
    "prompt_id" integer NOT NULL,
    "chabot_id" integer NOT NULL
);

ALTER TABLE "public"."prompt_chatbot" OWNER TO "postgres";

COMMENT ON TABLE "public"."prompt_chatbot" IS 'Junction table for prompts/instructions and chatbots.';

CREATE SEQUENCE IF NOT EXISTS "public"."prompt_prompt_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."prompt_prompt_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."prompt_prompt_id_seq" OWNED BY "public"."prompt"."prompt_id";

CREATE TABLE IF NOT EXISTS "public"."prompt_type_enum" (
    "value" "text" NOT NULL
);

ALTER TABLE "public"."prompt_type_enum" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."prompt_user" (
    "user_id" "uuid" NOT NULL,
    "prompt_id" integer NOT NULL
);

ALTER TABLE "public"."prompt_user" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."thread" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "updated_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "chatbot_id" integer NOT NULL,
    "thread_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid",
    "is_public" boolean DEFAULT true
);

ALTER TABLE "public"."thread" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tone_enum" (
    "value" "text" NOT NULL
);

ALTER TABLE "public"."tone_enum" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."type_enum" (
    "value" "text" NOT NULL
);

ALTER TABLE "public"."type_enum" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user" (
    "username" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password" "text" NOT NULL,
    "date_joined" timestamp with time zone DEFAULT "now"() NOT NULL,
    "last_login" timestamp with time zone DEFAULT "now"(),
    "profile_picture" "text",
    "user_id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "slug" "text" NOT NULL
);

ALTER TABLE "public"."user" OWNER TO "postgres";

COMMENT ON TABLE "public"."user" IS 'Table storing information about registered users.';

CREATE SEQUENCE IF NOT EXISTS "public"."user_chatbot_preference_preference_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE "public"."user_chatbot_preference_preference_id_seq" OWNER TO "postgres";

ALTER SEQUENCE "public"."user_chatbot_preference_preference_id_seq" OWNED BY "public"."preference"."preference_id";

ALTER TABLE ONLY "public"."category" ALTER COLUMN "category_id" SET DEFAULT "nextval"('"public"."category_category_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."chat" ALTER COLUMN "chat_id" SET DEFAULT "nextval"('"public"."gpt_chat_gpt_chat_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."chatbot" ALTER COLUMN "chatbot_id" SET DEFAULT "nextval"('"public"."chatbot_chatbot_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."preference" ALTER COLUMN "preference_id" SET DEFAULT "nextval"('"public"."user_chatbot_preference_preference_id_seq"'::"regclass");

ALTER TABLE ONLY "public"."prompt" ALTER COLUMN "prompt_id" SET DEFAULT "nextval"('"public"."prompt_prompt_id_seq"'::"regclass");

ALTER TABLE ONLY "hdb_catalog"."hdb_action_log"
    ADD CONSTRAINT "hdb_action_log_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "hdb_catalog"."hdb_cron_event_invocation_logs"
    ADD CONSTRAINT "hdb_cron_event_invocation_logs_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "hdb_catalog"."hdb_cron_events"
    ADD CONSTRAINT "hdb_cron_events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "hdb_catalog"."hdb_metadata"
    ADD CONSTRAINT "hdb_metadata_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "hdb_catalog"."hdb_metadata"
    ADD CONSTRAINT "hdb_metadata_resource_version_key" UNIQUE ("resource_version");

ALTER TABLE ONLY "hdb_catalog"."hdb_scheduled_event_invocation_logs"
    ADD CONSTRAINT "hdb_scheduled_event_invocation_logs_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "hdb_catalog"."hdb_scheduled_events"
    ADD CONSTRAINT "hdb_scheduled_events_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "hdb_catalog"."hdb_schema_notifications"
    ADD CONSTRAINT "hdb_schema_notifications_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "hdb_catalog"."hdb_version"
    ADD CONSTRAINT "hdb_version_pkey" PRIMARY KEY ("hasura_uuid");

ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_pkey" PRIMARY KEY ("category_id");

ALTER TABLE ONLY "public"."chatbot_category"
    ADD CONSTRAINT "chatbot_category_pkey" PRIMARY KEY ("chatbot_id", "category_id");

ALTER TABLE ONLY "public"."chatbot"
    ADD CONSTRAINT "chatbot_name_key" UNIQUE ("name");

ALTER TABLE ONLY "public"."chatbot"
    ADD CONSTRAINT "chatbot_pkey" PRIMARY KEY ("chatbot_id");

ALTER TABLE ONLY "public"."complexity_enum"
    ADD CONSTRAINT "default_complexity_enum_pkey" PRIMARY KEY ("value");

ALTER TABLE ONLY "public"."length_enum"
    ADD CONSTRAINT "default_length_enum_pkey" PRIMARY KEY ("value");

ALTER TABLE ONLY "public"."tone_enum"
    ADD CONSTRAINT "default_tone_enum_pkey" PRIMARY KEY ("value");

ALTER TABLE ONLY "public"."type_enum"
    ADD CONSTRAINT "default_type_enum_pkey" PRIMARY KEY ("value");

ALTER TABLE ONLY "public"."chat"
    ADD CONSTRAINT "gpt_chat_conversation_link_key" UNIQUE ("conversation_link");

ALTER TABLE ONLY "public"."chat"
    ADD CONSTRAINT "gpt_chat_pkey" PRIMARY KEY ("chat_id");

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_id_key" UNIQUE ("message_id");

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_pkey" PRIMARY KEY ("message_id");

ALTER TABLE ONLY "public"."message_type_enum"
    ADD CONSTRAINT "message_type_enum_pkey" PRIMARY KEY ("value");

ALTER TABLE ONLY "public"."prompt_chatbot"
    ADD CONSTRAINT "prompt_chatbot_pkey" PRIMARY KEY ("prompt_id", "chabot_id");

ALTER TABLE ONLY "public"."prompt"
    ADD CONSTRAINT "prompt_pkey" PRIMARY KEY ("prompt_id");

ALTER TABLE ONLY "public"."prompt"
    ADD CONSTRAINT "prompt_prompt_id_key" UNIQUE ("prompt_id");

ALTER TABLE ONLY "public"."prompt_user"
    ADD CONSTRAINT "prompt_user_pkey" PRIMARY KEY ("prompt_id", "user_id");

ALTER TABLE ONLY "public"."thread"
    ADD CONSTRAINT "thread_id_key" UNIQUE ("thread_id");

ALTER TABLE ONLY "public"."thread"
    ADD CONSTRAINT "thread_pkey" PRIMARY KEY ("thread_id");

ALTER TABLE ONLY "public"."prompt_type_enum"
    ADD CONSTRAINT "type_enum_pkey" PRIMARY KEY ("value");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "unique_slug" UNIQUE ("slug");

ALTER TABLE ONLY "public"."preference"
    ADD CONSTRAINT "user_chatbot_preference_pkey" PRIMARY KEY ("preference_id");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_email_key" UNIQUE ("email");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("user_id");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_username_key" UNIQUE ("username");

CREATE INDEX "hdb_cron_event_invocation_event_id" ON "hdb_catalog"."hdb_cron_event_invocation_logs" USING "btree" ("event_id");

CREATE INDEX "hdb_cron_event_status" ON "hdb_catalog"."hdb_cron_events" USING "btree" ("status");

CREATE UNIQUE INDEX "hdb_cron_events_unique_scheduled" ON "hdb_catalog"."hdb_cron_events" USING "btree" ("trigger_name", "scheduled_time") WHERE ("status" = 'scheduled'::"text");

CREATE INDEX "hdb_scheduled_event_status" ON "hdb_catalog"."hdb_scheduled_events" USING "btree" ("status");

CREATE UNIQUE INDEX "hdb_version_one_row" ON "hdb_catalog"."hdb_version" USING "btree" ((("version" IS NOT NULL)));

ALTER TABLE ONLY "hdb_catalog"."hdb_cron_event_invocation_logs"
    ADD CONSTRAINT "hdb_cron_event_invocation_logs_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "hdb_catalog"."hdb_cron_events"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "hdb_catalog"."hdb_scheduled_event_invocation_logs"
    ADD CONSTRAINT "hdb_scheduled_event_invocation_logs_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "hdb_catalog"."hdb_scheduled_events"("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY "public"."chatbot_category"
    ADD CONSTRAINT "chatbot_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("category_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chatbot_category"
    ADD CONSTRAINT "chatbot_category_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chatbot"
    ADD CONSTRAINT "chatbot_default_complexity_fkey" FOREIGN KEY ("default_complexity") REFERENCES "public"."complexity_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chatbot"
    ADD CONSTRAINT "chatbot_default_length_fkey" FOREIGN KEY ("default_length") REFERENCES "public"."length_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chatbot"
    ADD CONSTRAINT "chatbot_default_tone_fkey" FOREIGN KEY ("default_tone") REFERENCES "public"."tone_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chatbot"
    ADD CONSTRAINT "chatbot_default_type_fkey" FOREIGN KEY ("default_type") REFERENCES "public"."type_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."chat"
    ADD CONSTRAINT "gpt_chat_added_by_fkey" FOREIGN KEY ("added_by") REFERENCES "public"."user"("user_id");

ALTER TABLE ONLY "public"."chat"
    ADD CONSTRAINT "gpt_chat_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_thread_id_fkey" FOREIGN KEY ("thread_id") REFERENCES "public"."thread"("thread_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."message"
    ADD CONSTRAINT "message_type_fkey" FOREIGN KEY ("role") REFERENCES "public"."message_type_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."prompt_chatbot"
    ADD CONSTRAINT "prompt_chatbot_chabot_id_fkey" FOREIGN KEY ("chabot_id") REFERENCES "public"."chatbot"("chatbot_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."prompt_chatbot"
    ADD CONSTRAINT "prompt_chatbot_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompt"("prompt_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."prompt"
    ADD CONSTRAINT "prompt_type_fkey" FOREIGN KEY ("type") REFERENCES "public"."prompt_type_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."prompt_user"
    ADD CONSTRAINT "prompt_user_prompt_id_fkey" FOREIGN KEY ("prompt_id") REFERENCES "public"."prompt"("prompt_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."prompt_user"
    ADD CONSTRAINT "prompt_user_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."thread"
    ADD CONSTRAINT "thread_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."thread"
    ADD CONSTRAINT "thread_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id");

ALTER TABLE ONLY "public"."preference"
    ADD CONSTRAINT "user_chatbot_preference_chatbot_id_fkey" FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."preference"
    ADD CONSTRAINT "user_chatbot_preference_preferred_complexity_fkey" FOREIGN KEY ("preferred_complexity") REFERENCES "public"."complexity_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."preference"
    ADD CONSTRAINT "user_chatbot_preference_preferred_length_fkey" FOREIGN KEY ("preferred_length") REFERENCES "public"."length_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."preference"
    ADD CONSTRAINT "user_chatbot_preference_preferred_tone_fkey" FOREIGN KEY ("preferred_tone") REFERENCES "public"."tone_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."preference"
    ADD CONSTRAINT "user_chatbot_preference_preferred_type_fkey" FOREIGN KEY ("preferred_type") REFERENCES "public"."type_enum"("value") ON UPDATE RESTRICT ON DELETE RESTRICT;

ALTER TABLE ONLY "public"."preference"
    ADD CONSTRAINT "user_chatbot_preference_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."category" TO "anon";
GRANT ALL ON TABLE "public"."category" TO "authenticated";
GRANT ALL ON TABLE "public"."category" TO "service_role";

GRANT ALL ON SEQUENCE "public"."category_category_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."category_category_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."category_category_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."chat" TO "anon";
GRANT ALL ON TABLE "public"."chat" TO "authenticated";
GRANT ALL ON TABLE "public"."chat" TO "service_role";

GRANT ALL ON TABLE "public"."chatbot" TO "anon";
GRANT ALL ON TABLE "public"."chatbot" TO "authenticated";
GRANT ALL ON TABLE "public"."chatbot" TO "service_role";

GRANT ALL ON TABLE "public"."chatbot_category" TO "anon";
GRANT ALL ON TABLE "public"."chatbot_category" TO "authenticated";
GRANT ALL ON TABLE "public"."chatbot_category" TO "service_role";

GRANT ALL ON SEQUENCE "public"."chatbot_chatbot_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."chatbot_chatbot_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."chatbot_chatbot_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."complexity_enum" TO "anon";
GRANT ALL ON TABLE "public"."complexity_enum" TO "authenticated";
GRANT ALL ON TABLE "public"."complexity_enum" TO "service_role";

GRANT ALL ON SEQUENCE "public"."gpt_chat_gpt_chat_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."gpt_chat_gpt_chat_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."gpt_chat_gpt_chat_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."length_enum" TO "anon";
GRANT ALL ON TABLE "public"."length_enum" TO "authenticated";
GRANT ALL ON TABLE "public"."length_enum" TO "service_role";

GRANT ALL ON TABLE "public"."message" TO "anon";
GRANT ALL ON TABLE "public"."message" TO "authenticated";
GRANT ALL ON TABLE "public"."message" TO "service_role";

GRANT ALL ON TABLE "public"."message_type_enum" TO "anon";
GRANT ALL ON TABLE "public"."message_type_enum" TO "authenticated";
GRANT ALL ON TABLE "public"."message_type_enum" TO "service_role";

GRANT ALL ON TABLE "public"."preference" TO "anon";
GRANT ALL ON TABLE "public"."preference" TO "authenticated";
GRANT ALL ON TABLE "public"."preference" TO "service_role";

GRANT ALL ON TABLE "public"."prompt" TO "anon";
GRANT ALL ON TABLE "public"."prompt" TO "authenticated";
GRANT ALL ON TABLE "public"."prompt" TO "service_role";

GRANT ALL ON TABLE "public"."prompt_chatbot" TO "anon";
GRANT ALL ON TABLE "public"."prompt_chatbot" TO "authenticated";
GRANT ALL ON TABLE "public"."prompt_chatbot" TO "service_role";

GRANT ALL ON SEQUENCE "public"."prompt_prompt_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."prompt_prompt_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."prompt_prompt_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."prompt_type_enum" TO "anon";
GRANT ALL ON TABLE "public"."prompt_type_enum" TO "authenticated";
GRANT ALL ON TABLE "public"."prompt_type_enum" TO "service_role";

GRANT ALL ON TABLE "public"."prompt_user" TO "anon";
GRANT ALL ON TABLE "public"."prompt_user" TO "authenticated";
GRANT ALL ON TABLE "public"."prompt_user" TO "service_role";

GRANT ALL ON TABLE "public"."thread" TO "anon";
GRANT ALL ON TABLE "public"."thread" TO "authenticated";
GRANT ALL ON TABLE "public"."thread" TO "service_role";

GRANT ALL ON TABLE "public"."tone_enum" TO "anon";
GRANT ALL ON TABLE "public"."tone_enum" TO "authenticated";
GRANT ALL ON TABLE "public"."tone_enum" TO "service_role";

GRANT ALL ON TABLE "public"."type_enum" TO "anon";
GRANT ALL ON TABLE "public"."type_enum" TO "authenticated";
GRANT ALL ON TABLE "public"."type_enum" TO "service_role";

GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";

GRANT ALL ON SEQUENCE "public"."user_chatbot_preference_preference_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_chatbot_preference_preference_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_chatbot_preference_preference_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
