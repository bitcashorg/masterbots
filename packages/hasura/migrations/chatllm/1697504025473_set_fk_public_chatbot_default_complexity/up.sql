alter table "public"."chatbot" drop constraint "chatbot_default_complexity_fkey",
  add constraint "chatbot_default_complexity_fkey"
  foreign key ("default_complexity")
  references "public"."default_complexity_enum"
  ("value") on update restrict on delete restrict;
