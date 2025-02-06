alter table "public"."social_following"
  add constraint "social_following_followee_id_chatbot_fkey"
  foreign key ("followee_id_chatbot")
  references "public"."chatbot"
  ("chatbot_id") on update restrict on delete restrict;
