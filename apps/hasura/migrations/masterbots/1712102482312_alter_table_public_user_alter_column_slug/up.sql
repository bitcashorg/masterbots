-- Ensure slug column cannot be null
ALTER TABLE "public"."user" ALTER COLUMN slug SET NOT NULL;