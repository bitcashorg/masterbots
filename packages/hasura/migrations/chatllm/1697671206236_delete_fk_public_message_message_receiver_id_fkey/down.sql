alter table "public"."message"
  add constraint "message_receiver_id_fkey"
  foreign key ("receiver_id")
  references "public"."user"
  ("user_id") on update restrict on delete restrict;
