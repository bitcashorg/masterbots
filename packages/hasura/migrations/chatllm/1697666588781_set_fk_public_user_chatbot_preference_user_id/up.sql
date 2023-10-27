alter table "public"."user_chatbot_preference"
  add constraint "user_chatbot_preference_user_id_fkey"
  foreign key ("user_id")
  references "public"."user"
  ("user_id") on update restrict on delete restrict;
