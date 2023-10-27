alter table "public"."prompt_chatbot"
  add constraint "prompt_chatbot_chabot_id_fkey"
  foreign key ("chabot_id")
  references "public"."chatbot"
  ("chatbot_id") on update restrict on delete restrict;
