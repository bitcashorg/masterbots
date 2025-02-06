CREATE EXTENSION IF NOT EXISTS pgcrypto;
alter table "public"."tag_enum" add column "tag_id" uuid
 not null default gen_random_uuid();
