alter table "public"."message"
  add constraint "message_sender_id_fkey"
  foreign key ("sender_id")
  references "public"."user"
  ("user_id") on update restrict on delete restrict;
