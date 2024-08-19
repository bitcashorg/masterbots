SET check_function_bodies = false;

INSERT INTO public.category (category_id, name) VALUES (1, 'Health')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (3, 'Tech')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (4, 'Education')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (5, 'Career')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (6, 'Science')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (7, 'Travel')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (8, 'Media')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (9, 'Home')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (10, 'Legal')
ON CONFLICT (category_id) DO NOTHING;
INSERT INTO public.category (category_id, name) VALUES (2, 'Money')
ON CONFLICT (category_id) DO NOTHING;

SELECT pg_catalog.setval('public.category_category_id_seq', 12, true);
