alter table "public"."chatbot"
  add constraint "chatbot_category_fkey"
  foreign key ("category")
  references "public"."category"
  ("category_id") on update restrict on delete restrict;
