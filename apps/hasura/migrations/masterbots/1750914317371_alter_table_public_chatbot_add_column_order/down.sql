-- This migration adds a new column "order" to the chatbot table.
-- The column is of type integer and allows null values.
alter table "public"."chatbot" drop column if exists "order";

-- This migration also removes the function get_chatbot_count() if it exists.
drop function if exists get_chatbot_count();