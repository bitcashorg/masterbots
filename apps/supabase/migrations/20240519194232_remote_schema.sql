revoke delete on table "public"."user" from "anon";

revoke insert on table "public"."user" from "anon";

revoke references on table "public"."user" from "anon";

revoke select on table "public"."user" from "anon";

revoke trigger on table "public"."user" from "anon";

revoke truncate on table "public"."user" from "anon";

revoke update on table "public"."user" from "anon";

revoke delete on table "public"."user" from "authenticated";

revoke insert on table "public"."user" from "authenticated";

revoke references on table "public"."user" from "authenticated";

revoke select on table "public"."user" from "authenticated";

revoke trigger on table "public"."user" from "authenticated";

revoke truncate on table "public"."user" from "authenticated";

revoke update on table "public"."user" from "authenticated";

revoke delete on table "public"."user" from "service_role";

revoke insert on table "public"."user" from "service_role";

revoke references on table "public"."user" from "service_role";

revoke select on table "public"."user" from "service_role";

revoke trigger on table "public"."user" from "service_role";

revoke truncate on table "public"."user" from "service_role";

revoke update on table "public"."user" from "service_role";

alter table "public"."prompt_chatbot" drop constraint "prompt_chatbot_chabot_id_fkey";

alter table "public"."user" drop constraint "user_email_key";

alter table "public"."user" drop constraint "user_username_key";

alter table "public"."chat" drop constraint "gpt_chat_added_by_fkey";

alter table "public"."preference" drop constraint "user_chatbot_preference_user_id_fkey";

alter table "public"."prompt_user" drop constraint "prompt_user_user_id_fkey";

alter table "public"."thread" drop constraint "thread_user_id_fkey";

alter table "public"."user" drop constraint "user_pkey";

alter table "public"."prompt_chatbot" drop constraint "prompt_chatbot_pkey";

drop index if exists "public"."prompt_chatbot_pkey";

drop index if exists "public"."user_email_key";

drop index if exists "public"."user_pkey";

drop index if exists "public"."user_username_key";

drop table "public"."user";

create table "public"."account" (
    "username" text not null,
    "email" text not null,
    "password" text not null,
    "date_joined" timestamp with time zone not null default now(),
    "last_login" timestamp with time zone default now(),
    "avatar" text,
    "user_id" uuid not null default gen_random_uuid(),
    "name" text
);


alter table "public"."prompt_chatbot" drop column "chabot_id";

alter table "public"."prompt_chatbot" add column "chatbot_id" integer not null;

CREATE UNIQUE INDEX prompt_chatbot_pkey ON public.prompt_chatbot USING btree (prompt_id, chatbot_id);

CREATE UNIQUE INDEX user_email_key ON public.account USING btree (email);

CREATE UNIQUE INDEX user_pkey ON public.account USING btree (user_id);

CREATE UNIQUE INDEX user_username_key ON public.account USING btree (username);

alter table "public"."account" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."prompt_chatbot" add constraint "prompt_chatbot_pkey" PRIMARY KEY using index "prompt_chatbot_pkey";

alter table "public"."account" add constraint "user_email_key" UNIQUE using index "user_email_key";

alter table "public"."account" add constraint "user_username_key" UNIQUE using index "user_username_key";

alter table "public"."prompt_chatbot" add constraint "prompt_chatbot_chatbot_id_fkey" FOREIGN KEY (chatbot_id) REFERENCES chatbot(chatbot_id) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;

alter table "public"."prompt_chatbot" validate constraint "prompt_chatbot_chatbot_id_fkey";

alter table "public"."chat" add constraint "gpt_chat_added_by_fkey" FOREIGN KEY (added_by) REFERENCES account(user_id) not valid;

alter table "public"."chat" validate constraint "gpt_chat_added_by_fkey";

alter table "public"."preference" add constraint "user_chatbot_preference_user_id_fkey" FOREIGN KEY (user_id) REFERENCES account(user_id) not valid;

alter table "public"."preference" validate constraint "user_chatbot_preference_user_id_fkey";

alter table "public"."prompt_user" add constraint "prompt_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES account(user_id) ON UPDATE RESTRICT ON DELETE RESTRICT not valid;

alter table "public"."prompt_user" validate constraint "prompt_user_user_id_fkey";

alter table "public"."thread" add constraint "thread_user_id_fkey" FOREIGN KEY (user_id) REFERENCES account(user_id) not valid;

alter table "public"."thread" validate constraint "thread_user_id_fkey";

create or replace view "public"."thread_full" as  WITH filtered_threads AS (
         SELECT t.thread_id,
            jsonb_agg(jsonb_build_object('id', m.id, 'content', m.content, 'role', m.role, 'created_at', m.created_at) ORDER BY m.created_at) AS messages,
            jsonb_build_object('chatbot_id', c.chatbot_id, 'name', c.name, 'avatar', c.avatar, 'prompt', jsonb_build_object('prompt_id', p.prompt_id, 'content', p.content), 'categories', jsonb_agg(jsonb_build_object('category_id', cat.category_id, 'name', cat.name)) FILTER (WHERE (cat.category_id IS NOT NULL))) AS chatbot,
            jsonb_build_object('user_id', a.user_id, 'username', a.username, 'avatar', a.avatar) AS account
           FROM (((((((thread t
             JOIN message m ON ((m.thread_id = t.thread_id)))
             JOIN chatbot c ON ((c.chatbot_id = t.chatbot_id)))
             LEFT JOIN prompt_chatbot pc ON ((pc.chatbot_id = c.chatbot_id)))
             LEFT JOIN prompt p ON ((p.prompt_id = pc.prompt_id)))
             LEFT JOIN chatbot_category cc ON ((cc.chatbot_id = c.chatbot_id)))
             LEFT JOIN category cat ON ((cat.category_id = cc.category_id)))
             JOIN account a ON ((a.user_id = t.user_id)))
          GROUP BY t.thread_id, c.chatbot_id, a.user_id, p.prompt_id
        )
 SELECT filtered_threads.thread_id,
    (filtered_threads.messages -> 0) AS first_message,
    (filtered_threads.messages -> 1) AS first_answer,
    filtered_threads.chatbot,
    filtered_threads.account
   FROM filtered_threads;


grant delete on table "public"."account" to "anon";

grant insert on table "public"."account" to "anon";

grant references on table "public"."account" to "anon";

grant select on table "public"."account" to "anon";

grant trigger on table "public"."account" to "anon";

grant truncate on table "public"."account" to "anon";

grant update on table "public"."account" to "anon";

grant delete on table "public"."account" to "authenticated";

grant insert on table "public"."account" to "authenticated";

grant references on table "public"."account" to "authenticated";

grant select on table "public"."account" to "authenticated";

grant trigger on table "public"."account" to "authenticated";

grant truncate on table "public"."account" to "authenticated";

grant update on table "public"."account" to "authenticated";

grant delete on table "public"."account" to "service_role";

grant insert on table "public"."account" to "service_role";

grant references on table "public"."account" to "service_role";

grant select on table "public"."account" to "service_role";

grant trigger on table "public"."account" to "service_role";

grant truncate on table "public"."account" to "service_role";

grant update on table "public"."account" to "service_role";


