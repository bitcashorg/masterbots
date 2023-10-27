alter table "public"."user_chatbot_preference"
  add constraint "user_chatbot_preference_chatbot_id_fkey"
  foreign key ("chatbot_id")
  references "public"."chatbot"
  ("chatbot_id") on update restrict on delete restrict;
