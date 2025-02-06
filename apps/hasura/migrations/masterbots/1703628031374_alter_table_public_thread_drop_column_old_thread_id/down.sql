alter table "public"."thread" alter column "old_thread_id" set default nextval('thread_thread_id_seq'::regclass);
alter table "public"."thread" alter column "old_thread_id" drop not null;
alter table "public"."thread" add column "old_thread_id" int4;
