SET check_function_bodies = false;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (1, 1)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (2, 2)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (3, 3)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (6, 4)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (10, 5)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (7, 6)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (8, 7)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (9, 8)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (11, 9)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;

INSERT INTO public.chatbot_category (chatbot_id, category_id) VALUES (12, 10)
ON CONFLICT (chatbot_id, category_id) DO NOTHING;
