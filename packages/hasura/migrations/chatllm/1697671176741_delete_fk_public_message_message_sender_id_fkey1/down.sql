alter table "public"."message"
  add constraint "message_sender_id_fkey1"
  foreign key ("sender_id")
  references "public"."chatbot"
  ("chatbot_id") on update restrict on delete restrict;
