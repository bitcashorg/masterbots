alter table "public"."thread"
  add constraint "thread_parent_thread_fkey"
  foreign key ("parent_thread")
  references "public"."thread"
  ("thread_id") on update restrict on delete restrict;
