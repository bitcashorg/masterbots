alter table "public"."thread" add column "metadata" jsonb
 null default jsonb_build_object();
