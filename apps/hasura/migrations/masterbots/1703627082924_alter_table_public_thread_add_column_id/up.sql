CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."thread" add column "id" uuid
 null unique default gen_random_uuid();
