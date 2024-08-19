SET check_function_bodies = false;

INSERT INTO public.tone_enum (value) VALUES ('professional')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.tone_enum (value) VALUES ('neutral')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.tone_enum (value) VALUES ('friendly')
ON CONFLICT (value) DO NOTHING;
