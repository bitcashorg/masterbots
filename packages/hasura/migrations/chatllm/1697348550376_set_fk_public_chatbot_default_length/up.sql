alter table "public"."chatbot"
  add constraint "chatbot_default_length_fkey"
  foreign key ("default_length")
  references "public"."default_length_enum"
  ("value") on update restrict on delete restrict;
