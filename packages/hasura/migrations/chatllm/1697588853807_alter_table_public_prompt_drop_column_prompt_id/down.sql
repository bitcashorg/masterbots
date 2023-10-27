alter table "public"."prompt" alter column "prompt_id" drop not null;
alter table "public"."prompt" add column "prompt_id" int4;
