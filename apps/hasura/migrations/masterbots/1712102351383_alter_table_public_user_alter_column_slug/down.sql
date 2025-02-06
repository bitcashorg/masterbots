-- Remove unique constraint from slug column
ALTER TABLE "public"."user" DROP CONSTRAINT IF EXISTS unique_slug;
