comment on column "public"."message"."thread_id" is E'This table stores the messages exchanged between users and chatbots.';
alter table "public"."message" alter column "thread_id" set default gen_random_uuid();
alter table "public"."message" add constraint "message_thread_id_key" unique (thread_id);
alter table "public"."message" alter column "thread_id" drop not null;
alter table "public"."message" add column "thread_id" uuid;
