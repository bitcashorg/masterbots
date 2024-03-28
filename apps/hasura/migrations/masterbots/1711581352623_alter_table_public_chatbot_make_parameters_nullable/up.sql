ALTER TABLE public.chatbot
  ALTER COLUMN default_complexity DROP NOT NULL,
  ALTER COLUMN default_length DROP NOT NULL,
  ALTER COLUMN default_tone DROP NOT NULL,
  ALTER COLUMN default_type DROP NOT NULL;