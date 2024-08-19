
SET check_function_bodies = false;

INSERT INTO public.message_type_enum (value) VALUES ('user')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.message_type_enum (value) VALUES ('assistant')
ON CONFLICT (value) DO NOTHING;

