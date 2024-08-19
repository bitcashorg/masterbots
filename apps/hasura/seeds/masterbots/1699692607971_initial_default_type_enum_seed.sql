SET check_function_bodies = false;

INSERT INTO public.type_enum (value) VALUES ('narrative')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.type_enum (value) VALUES ('step_by_step')
ON CONFLICT (value) DO NOTHING;
INSERT INTO public.type_enum (value) VALUES ('bullet_points')
ON CONFLICT (value) DO NOTHING;
