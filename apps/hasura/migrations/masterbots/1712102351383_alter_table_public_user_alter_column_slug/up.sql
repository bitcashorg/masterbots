-- Add unique constraint to slug column
ALTER TABLE "public"."user" ADD CONSTRAINT unique_slug UNIQUE(slug);
