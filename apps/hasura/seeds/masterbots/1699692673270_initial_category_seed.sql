SET check_function_bodies = false;
INSERT INTO public.category (category_id, name) VALUES (1, 'Health');
INSERT INTO public.category (category_id, name) VALUES (3, 'Tech');
INSERT INTO public.category (category_id, name) VALUES (4, 'Education');
INSERT INTO public.category (category_id, name) VALUES (5, 'Career');
INSERT INTO public.category (category_id, name) VALUES (6, 'Science');
INSERT INTO public.category (category_id, name) VALUES (7, 'Travel');
INSERT INTO public.category (category_id, name) VALUES (8, 'Media');
INSERT INTO public.category (category_id, name) VALUES (9, 'Home');
INSERT INTO public.category (category_id, name) VALUES (10, 'Legal');
INSERT INTO public.category (category_id, name) VALUES (2, 'Money');
SELECT pg_catalog.setval('public.category_category_id_seq', 12, true);
