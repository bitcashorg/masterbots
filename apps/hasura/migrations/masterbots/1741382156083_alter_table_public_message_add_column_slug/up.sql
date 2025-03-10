alter table "public"."message" add column "slug" text;

-- Function to update message slugs with duplicate handling
CREATE OR REPLACE FUNCTION update_message_slugs()
RETURNS void AS $$
DECLARE
  msg RECORD;
  base_slug TEXT;
  new_slug TEXT;
  counter INTEGER;
BEGIN
  -- Process each message that needs a slug
  FOR msg IN SELECT message_id, content FROM public.message WHERE slug IS NULL OR slug = '' LOOP
    -- Generate base slug from content
    base_slug := slugify(msg.content);
    new_slug := base_slug;
    counter := 1;
    
    -- Check for duplicates and append counter if necessary
    WHILE EXISTS(SELECT 1 FROM public.message WHERE slug = new_slug AND message_id != msg.message_id) LOOP
      new_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;
    
    -- Update the message with unique slug
    UPDATE public.message SET slug = new_slug WHERE message_id = msg.message_id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Execute the function to populate slugs for existing messages
SELECT update_message_slugs();

-- Now make the column not null and unique after populating it
alter table "public"."message" alter column "slug" set not null;
alter table "public"."message" add constraint "message_slug_unique" unique ("slug");
