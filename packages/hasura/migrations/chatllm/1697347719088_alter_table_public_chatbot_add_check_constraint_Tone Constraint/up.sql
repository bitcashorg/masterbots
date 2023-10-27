alter table "public"."chatbot" add constraint "Tone Constraint" check (default_tone IN ('Professional', 'Friendly', 'Neutral'));
