SET check_function_bodies = false;

INSERT INTO public.complexity_enum (value) VALUES ('expert')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.complexity_enum (value) VALUES ('adult')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.complexity_enum (value) VALUES ('eli5')
ON CONFLICT (value) DO NOTHING;
