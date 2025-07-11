-- This migration adds a new column "order" to the category table.
-- The column is of type integer and allows null values.
alter table "public"."category" drop column if exists "order";

-- This migration also removes the function get_topic_count() if it exists.
drop function if exists get_topic_count();