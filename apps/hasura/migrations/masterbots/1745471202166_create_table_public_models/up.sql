-- Create a new enum type for model types
CREATE TYPE model_type AS ENUM ('free', 'payed', 'pro');

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

-- Add index for the foreign key
CREATE INDEX idx_models_model ON "public"."models" ("model");

-- Seed the models table with initial values from models_enum
INSERT INTO public.models (model, enabled, type) VALUES
    ('openAi', true, 'free'),
    ('OpenAI__4_1__nano', true, 'free'),
    ('OpenAI__4_1__mini', true, 'free'),
    ('Gemini__2_5__Flash', true, 'free'),
    ('Gemini__Flash__Lite', false, 'free'),
    ('Perplexity', false, 'free'),
    ('DeepSeek', false, 'free'),
    ('GroqDeepSeek', true, 'free'),
    ('OpenAI__4_1', true, 'payed'),
    ('OpenAI__o4__mini', true, 'payed'),
    ('Gemini__2_5__Pro', true, 'payed')
    ('Claude__3_7__Sonnet', true, 'payed'),
    ('Perplexity__Large', false, 'payed'),
ON CONFLICT ("model") DO NOTHING;

-- Add index to models_enum table
CREATE INDEX idx_models_enum_value ON "public"."models_enum" ("value");
