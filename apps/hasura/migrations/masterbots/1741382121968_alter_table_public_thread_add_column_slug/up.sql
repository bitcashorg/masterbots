-- TODO: slugify the content of the first user message in each thread and update the thread's slug column with it
-- This will allow for more human-readable URLs for threads
-- Function to convert text into a URL-friendly slug
CREATE OR REPLACE FUNCTION slugify(input_text text) RETURNS text AS $$
DECLARE
  slug text;
BEGIN
  -- Convert to lowercase
  slug := lower(input_text);
  
  -- Replace spaces with hyphens
  slug := regexp_replace(slug, '\s+', '-', 'g');
  
  -- Remove special characters
  slug := regexp_replace(slug, '[^a-z0-9\-]', '', 'g');
  
  -- Remove duplicate hyphens
  slug := regexp_replace(slug, '-+', '-', 'g');
  
  -- Trim hyphens from beginning and end
  slug := trim(both '-' from slug);
  
  -- Limit length to 100 characters
  slug := substring(slug, 1, 100);
  
  -- If slug is empty, use a fallback
  IF length(slug) = 0 THEN
    slug := 'untitled-thread';
  END IF;
  
  RETURN slug;
END;
$$ LANGUAGE plpgsql;

-- Modify the update_thread_slugs function to use the slugify function and handle duplicates
CREATE OR REPLACE FUNCTION update_thread_slugs()
RETURNS void AS $$
DECLARE
  thread_rec RECORD;
  base_slug text;
  final_slug text;
  counter integer;
BEGIN
  -- First pass: generate initial slugs
  FOR thread_rec IN 
    SELECT 
      t.thread_id,
      COALESCE(m.content, 'untitled-thread') as message_content
    FROM public.thread t
    LEFT JOIN (
      SELECT 
        m.thread_id,
        m.content
      FROM public.message m
      INNER JOIN (
        SELECT 
          thread_id,
          MIN(created_at) as first_message_time
        FROM public.message
        WHERE role = 'user'
        GROUP BY thread_id
      ) first_messages 
      ON m.thread_id = first_messages.thread_id AND m.created_at = first_messages.first_message_time
    ) m ON t.thread_id = m.thread_id
    WHERE t.slug IS NULL OR t.slug = ''
  LOOP
    -- Generate base slug
    base_slug := slugify(thread_rec.message_content);
    final_slug := base_slug;
    counter := 1;
    
    -- Check for duplicates and append counter if needed
    WHILE EXISTS (SELECT 1 FROM public.thread WHERE slug = final_slug AND thread_id != thread_rec.thread_id) LOOP
      final_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
    
    -- Update the thread with unique slug
    UPDATE public.thread
    SET slug = final_slug
    WHERE thread_id = thread_rec.thread_id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Add the slug column to the thread table (allowing NULL for existing records initially)
alter table "public"."thread" add column "slug" text;

-- Execute the function to populate slugs for existing threads
SELECT update_thread_slugs();

-- Now make the column not null and unique after populating it
alter table "public"."thread" alter column "slug" set not null;
alter table "public"."thread" add constraint "thread_slug_unique" unique ("slug");
