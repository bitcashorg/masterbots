comment on column "public"."message"."related_message_id" is E'This table stores the messages exchanged between users and chatbots.';
alter table "public"."message" alter column "related_message_id" drop not null;
alter table "public"."message" add column "related_message_id" int4;
