alter table "public"."prompt_chatbot"
  add constraint "prompt_chatbot_prompt_id_fkey"
  foreign key ("prompt_id")
  references "public"."prompt"
  ("prompt_id") on update restrict on delete restrict;
