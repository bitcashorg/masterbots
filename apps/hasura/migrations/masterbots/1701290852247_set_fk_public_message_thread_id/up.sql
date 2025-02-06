alter table "public"."message"
  add constraint "message_thread_id_fkey"
  foreign key ("thread_id")
  references "public"."thread"
  ("thread_id") on update restrict on delete restrict;
