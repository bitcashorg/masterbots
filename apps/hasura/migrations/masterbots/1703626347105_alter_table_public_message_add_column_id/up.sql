CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."message" add column "id" uuid
 null unique default gen_random_uuid();
