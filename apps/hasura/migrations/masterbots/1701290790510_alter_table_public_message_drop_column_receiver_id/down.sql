comment on column "public"."message"."receiver_id" is E'This table stores the messages exchanged between users and chatbots.';
alter table "public"."message" alter column "receiver_id" drop not null;
alter table "public"."message" add column "receiver_id" int4;
