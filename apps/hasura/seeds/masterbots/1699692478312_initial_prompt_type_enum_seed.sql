SET check_function_bodies = false;

INSERT INTO public.prompt_type_enum (value) VALUES ('instruction')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.prompt_type_enum (value) VALUES ('prompt')
ON CONFLICT (value) DO NOTHING;
