alter table "public"."thread" drop constraint "thread_parent_thread_fkey",
  add constraint "thread_parent_thread_fkey"
  foreign key ("parent_thread")
  references "public"."thread"
  ("thread_id") on update restrict on delete restrict;
