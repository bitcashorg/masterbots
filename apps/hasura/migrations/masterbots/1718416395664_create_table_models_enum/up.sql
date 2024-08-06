CREATE TABLE IF NOT EXISTS public.models_enum (
    name TEXT UNIQUE NOT NULL,
    value TEXT UNIQUE
);

INSERT INTO public.models_enum (name) VALUES 
    ('perplexity'), 
    ('anthropic'), 
    ('openAi'), 
    ('wordware')
ON CONFLICT (name) DO NOTHING;

UPDATE public.models_enum
SET value = CASE name
    WHEN 'perplexity' THEN 'llama3_7B'
    WHEN 'anthropic' THEN 'claude3_haiku'
    WHEN 'openAi' THEN 'gpt-4o-mini'
    WHEN 'wordware' THEN 'wordware'
    ELSE value
END;