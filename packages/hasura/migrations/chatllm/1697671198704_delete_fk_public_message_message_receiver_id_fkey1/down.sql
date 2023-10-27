alter table "public"."message"
  add constraint "message_receiver_id_fkey1"
  foreign key ("receiver_id")
  references "public"."chatbot"
  ("chatbot_id") on update restrict on delete restrict;
