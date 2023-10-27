alter table "public"."chatbot"
  add constraint "chatbot_default_type_fkey"
  foreign key ("default_type")
  references "public"."default_type_enum"
  ("value") on update restrict on delete restrict;
