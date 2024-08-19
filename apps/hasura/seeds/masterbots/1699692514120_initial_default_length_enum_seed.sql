SET check_function_bodies = false;

INSERT INTO public.length_enum (value) VALUES ('detailed')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.length_enum (value) VALUES ('clear_and_succinct')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.length_enum (value) VALUES ('concise')
ON CONFLICT (value) DO NOTHING;
