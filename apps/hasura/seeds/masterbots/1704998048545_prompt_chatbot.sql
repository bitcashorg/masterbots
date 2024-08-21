SET check_function_bodies = false;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 1)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 2)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 3)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (2, 1)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (3, 2)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (4, 3)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (5, 6)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (6, 7)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (7, 8)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (8, 9)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (9, 10)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (10, 11)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (11, 12)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 6)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 7)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 8)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 9)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 10)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 11)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

INSERT INTO public.prompt_chatbot (prompt_id, chabot_id) VALUES (1, 12)
ON CONFLICT (prompt_id, chabot_id) DO NOTHING;

