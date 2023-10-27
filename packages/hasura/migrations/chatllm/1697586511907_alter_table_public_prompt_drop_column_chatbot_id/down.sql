alter table "public"."prompt"
  add constraint "prompt_chatbot_id_fkey"
  foreign key (chatbot_id)
  references "public"."chatbot"
  (chatbot_id) on update restrict on delete restrict;
alter table "public"."prompt" alter column "chatbot_id" drop not null;
alter table "public"."prompt" add column "chatbot_id" int4;
