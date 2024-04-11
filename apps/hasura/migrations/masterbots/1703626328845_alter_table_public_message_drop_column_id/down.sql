comment on column "public"."message"."id" is E'This table stores the messages exchanged between users and chatbots.';
alter table "public"."message" alter column "id" set default gen_random_uuid();
alter table "public"."message" add constraint "message_id_key" unique (id);
alter table "public"."message" alter column "id" drop not null;
alter table "public"."message" add column "id" uuid;
