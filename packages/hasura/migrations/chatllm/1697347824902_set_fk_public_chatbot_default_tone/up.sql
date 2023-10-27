alter table "public"."chatbot"
  add constraint "chatbot_default_tone_fkey"
  foreign key ("default_tone")
  references "public"."default_tone_enum"
  ("value") on update restrict on delete restrict;
