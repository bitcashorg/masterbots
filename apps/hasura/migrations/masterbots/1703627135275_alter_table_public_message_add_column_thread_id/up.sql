CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."message" add column "thread_id" uuid
 null unique default gen_random_uuid();
