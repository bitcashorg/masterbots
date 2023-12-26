comment on column "public"."message"."old_thread_id" is E'This table stores the messages exchanged between users and chatbots.';
alter table "public"."message" alter column "old_thread_id" drop not null;
alter table "public"."message" add column "old_thread_id" int4;
