-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Step 1: Add a new UUID column to each table with references to user.user_id
ALTER TABLE public.chat ADD COLUMN new_added_by UUID;
ALTER TABLE public.thread ADD COLUMN new_user_id UUID;
ALTER TABLE public.preference ADD COLUMN new_user_id UUID;

-- Step 2: Remove foreign key relationships in other tables
ALTER TABLE public.chat DROP CONSTRAINT IF EXISTS gpt_chat_added_by_fkey;
ALTER TABLE public.thread DROP CONSTRAINT IF EXISTS thread_user_id_fkey;
ALTER TABLE public.preference DROP CONSTRAINT IF EXISTS user_chatbot_preference_user_id_fkey;

-- Step 3: Alter 'user' table to use UUID and migrate data
-- Remove the existing primary key
ALTER TABLE public."user" DROP CONSTRAINT IF EXISTS user_pkey;
-- Add the new UUID column and set it as the primary key
ALTER TABLE public."user" ADD COLUMN new_user_id UUID DEFAULT uuid_generate_v4();
UPDATE public."user" SET new_user_id = uuid_generate_v4();
-- Rename the old user_id column for reference
ALTER TABLE public."user" RENAME COLUMN user_id TO old_user_id;
ALTER TABLE public."user" RENAME COLUMN new_user_id TO user_id;
ALTER TABLE public."user" ADD PRIMARY KEY (user_id);

-- Step 4: Update the new UUID columns with values in other tables using old_user_id as reference
UPDATE public.chat c SET new_added_by = u.user_id 
FROM public."user" u 
WHERE u.old_user_id = c.added_by;

UPDATE public.thread t SET new_user_id = u.user_id 
FROM public."user" u 
WHERE u.old_user_id = t.user_id;

UPDATE public.preference p SET new_user_id = u.user_id 
FROM public."user" u 
WHERE u.old_user_id = p.user_id;

-- Step 6: Remove old integer columns from other tables
ALTER TABLE public.chat DROP COLUMN added_by;
ALTER TABLE public.thread DROP COLUMN user_id;
ALTER TABLE public.preference DROP COLUMN user_id;

-- Step 7: Rename new UUID columns to the original column names in other tables
ALTER TABLE public.chat RENAME COLUMN new_added_by TO added_by;
ALTER TABLE public.thread RENAME COLUMN new_user_id TO user_id;
ALTER TABLE public.preference RENAME COLUMN new_user_id TO user_id;

-- Step 5: Update foreign key relationships in other tables (moved to final step)
ALTER TABLE public.chat ADD CONSTRAINT gpt_chat_added_by_fkey FOREIGN KEY (added_by) REFERENCES public."user" (user_id);
ALTER TABLE public.thread ADD CONSTRAINT thread_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user" (user_id);
ALTER TABLE public.preference ADD CONSTRAINT user_chatbot_preference_user_id_fkey FOREIGN KEY (user_id) REFERENCES public."user" (user_id);

-- Drop the old_user_id column from the 'user' table if no longer needed
ALTER TABLE public."user" DROP COLUMN old_user_id;
