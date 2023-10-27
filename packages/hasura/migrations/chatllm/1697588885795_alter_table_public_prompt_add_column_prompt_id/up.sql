alter table "public"."prompt" add column "prompt_id" serial
 not null unique;
