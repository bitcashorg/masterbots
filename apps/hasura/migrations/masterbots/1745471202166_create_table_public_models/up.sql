-- Create a new enum type for model types
CREATE TYPE model_type AS ENUM ('free', 'paid', 'pro');

-- Create the models table
CREATE TABLE public.models (
    "model" text NOT NULL,
    "enabled" boolean NOT NULL DEFAULT false,
    "type" model_type NOT NULL DEFAULT 'free',
    PRIMARY KEY ("model"),
    FOREIGN KEY ("model") REFERENCES "public"."models_enum"("value") ON UPDATE cascade ON DELETE cascade,
    UNIQUE ("model")
);
COMMENT ON TABLE public.models IS E'LLMs tracking for web display';

-- Seed the models table with initial values from models_enum
INSERT INTO public.models (model, enabled, type) VALUES
    ('gpt-4.1-mini-2025-04-14', true, 'free'),
    ('gpt-4.1-nano-2025-04-14', true, 'free'),
    ('gemini-2.5-flash-preview-04-17', true, 'free'),
    ('deepseek-r1-distill-llama-70b', true, 'free'),
    ('deepseek-r1', false, 'free'),
    ('gpt-4o-mini', false, 'free'),
    ('llama3_7B', false, 'free'),
    ('gpt-4.1-2025-04-14', true, 'paid'),
    ('o4-mini-2025-04-16', true, 'paid'),
    ('claude-3-7-sonnet-20250219', true, 'paid'),
    ('gemini-2.5-pro-preview-03-25', true, 'paid'),
    ('gemini_2_0_flash_lite', false, 'free'),
    ('llama-3-sonar-large-32k-online', false, 'paid')
ON CONFLICT ("model") DO NOTHING;

-- Add index to models_enum table
CREATE INDEX idx_models_enum_value ON "public"."models_enum" ("value");
