-- down.sql

-- Revert the changes made to the chatbot table
ALTER TABLE public.chatbot
  ALTER COLUMN default_complexity SET NOT NULL,
  ALTER COLUMN default_length SET NOT NULL,
  ALTER COLUMN default_tone SET NOT NULL,
  ALTER COLUMN default_type SET NOT NULL;
