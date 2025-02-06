comment on column "public"."message"."sender_id" is E'This table stores the messages exchanged between users and chatbots.';
alter table "public"."message" alter column "sender_id" drop not null;
alter table "public"."message" add column "sender_id" int4;
