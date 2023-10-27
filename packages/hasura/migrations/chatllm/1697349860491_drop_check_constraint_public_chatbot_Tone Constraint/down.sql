alter table "public"."chatbot" add constraint "Tone Constraint" check (CHECK (default_tone = ANY (ARRAY['Professional'::text, 'Friendly'::text, 'Neutral'::text])));
