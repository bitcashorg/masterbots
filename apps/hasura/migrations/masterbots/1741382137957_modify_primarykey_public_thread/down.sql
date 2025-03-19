alter table "public"."thread" drop constraint "thread_pkey";
alter table "public"."thread"
    add constraint "thread_pkey"
    primary key ("thread_id");
