-- Allow slug column to be null
ALTER TABLE "public"."user" ALTER COLUMN slug DROP NOT NULL;