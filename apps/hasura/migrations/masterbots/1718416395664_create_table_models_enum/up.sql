CREATE TABLE IF NOT EXISTS public.models_enum (
    name TEXT UNIQUE PRIMARY KEY NOT NULL,
    value TEXT UNIQUE NOT NULL
);

INSERT INTO public.models_enum (name, value) VALUES 
    ('openAi','gpt-4o-mini'),
    ('OpenAI__4_1__mini','gpt-4.1-mini-2025-04-14'),
    ('OpenAI__4_1__nano','gpt-4.1-nano-2025-04-14'),
    ('OpenAI__o4__mini','o4-mini-2025-04-16'),
    ('Claude__3_7__Sonnet','claude-3-7-sonnet-20250219'),
    ('Perplexity','llama3_7B'),
    ('Perplexity__Large','llama-3-sonar-large-32k-online'),
    ('DeepSeek','deepseek-r1'),
    ('GroqDeepSeek','deepseek-r1-distill-llama-70b'),
    ('Gemini__Flash__Lite','gemini_2_0_flash_lite'),
    ('Gemini__2_5__Flash','gemini-2.5-flash-preview-04-17'),
    ('Gemini__2_5__Pro','gemini-2.5-pro-preview-03-25')
ON CONFLICT (name) DO UPDATE SET value = EXCLUDED.value;