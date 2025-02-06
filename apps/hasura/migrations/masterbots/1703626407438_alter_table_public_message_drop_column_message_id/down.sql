comment on column "public"."message"."message_id" is E'This table stores the messages exchanged between users and chatbots.';
alter table "public"."message" alter column "message_id" set default nextval('message_message_id_seq'::regclass);
alter table "public"."message" alter column "message_id" drop not null;
alter table "public"."message" add column "message_id" int4;
