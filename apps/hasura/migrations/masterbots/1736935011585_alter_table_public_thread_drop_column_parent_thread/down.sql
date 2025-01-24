alter table "public"."thread" alter column "parent_thread" drop not null;
alter table "public"."thread" add column "parent_thread" uuid;
