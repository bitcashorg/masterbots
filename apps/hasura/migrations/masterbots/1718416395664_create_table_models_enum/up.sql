CREATE TABLE IF NOT EXISTS public.models_enum (
    name TEXT UNIQUE PRIMARY KEY NOT NULL,
    value TEXT UNIQUE NOT NULL
);

INSERT INTO public.models_enum (name, value) VALUES 
    ('perplexity', 'llama3_7B'),
    ('anthropic', 'claude3_haiku'),
    ('openAi', 'gpt-4o-mini'),
    ('wordware', 'wordware')
ON CONFLICT (name) DO UPDATE SET value = EXCLUDED.value;