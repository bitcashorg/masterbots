
SET check_function_bodies = false;


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (1,
        'HealthBot',
        'HealthBot assists people in health & medicine.  This incudes: disease diagnosis and symptoms, treatment recommendations and side effects, nutrition and wellness advice, and mental health topics.',
        'https://robohash.org/HealthBot',
        'merivercap',
        'professional',
        'clear_and_succinct',
        'bullet_points',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (3,
        'TechBot',
        'Techbot assists people in technology & computing.  This includes: latest tech trends and gadgets, software troubleshooting, coding and programming help, cybersecurity and online privacy.',
        'https://robohash.org/TechBot',
        'merivercap',
        'neutral',
        'clear_and_succinct',
        'bullet_points',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (2,
        'MoneyBot',
        'MoneyBot assists people in finance & investments.  This includes: personal finance advice, stock market insights and predictions, cryptocurrency, and retirement planning',
        'https://robohash.org/MoneyBot',
        'merivercap',
        'professional',
        'clear_and_succinct',
        'bullet_points',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (6,
        'EduBot',
        'EduBot assists people in education & learning.  This includes: tutoring in various subjects (math, science, languages, etc.), learning techniques and strategies, online courses and resources, educational technology tools.',
        'https://robohash.org/EduBot',
        'merivercap',
        'neutral',
        'clear_and_succinct',
        'step_by_step',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (7,
        'SciBot',
        'SciBot assists people in science & research.  This includes: recent scientific discoveries, environmental sustainability, space and astronomy, biology, chemistry, and physics inquiries.',
        'https://robohash.org/SciBot',
        'merivercap',
        'neutral',
        'clear_and_succinct',
        'step_by_step',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (8,
        'TravelBot',
        'TravelBot assists people in travel & leisure.  This includes: travel recommendations, cultural insights and etiquettes, language translation and phrases, local cuisines and must-visits.',
        'https://robohash.org/TravelBot',
        'merivercap',
        'friendly',
        'clear_and_succinct',
        'narrative',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (9,
        'MediaBot',
        'MediaBot assists people in entertainment & media. This includes: movie and book recommendations, music suggestions and artist information, celebrity facts and trivia, upcoming events and concerts.',
        'https://robohash.org/MediaBot',
        'merivercap',
        'friendly',
        'clear_and_succinct',
        'narrative',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (10,
        'JobBot',
        'JobBot assists people in career & job markets.  This includes: resume and CV advice, job interview tips, industry-specific insights, career path guidance.',
        'https://robohash.org/JobBot',
        'merivercap',
        'neutral',
        'clear_and_succinct',
        'bullet_points',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (11,
        'HomeBot',
        'HomeBot assists people in home & lifestyle.  This includes: home improvement tips, gardening and landscaping advice, cooking recipes and techniques, interior design ideas.',
        'https://robohash.org/HomeBot',
        'merivercap',
        'friendly',
        'clear_and_succinct',
        'step_by_step',
        'adult');


INSERT INTO public.chatbot (chatbot_id, name, description, avatar, created_by, default_tone, default_length, default_type, default_complexity)
VALUES (12,
        'LawBot',
        'LawBot assists people in legal & regulation. This includes: general legal advice, rights and responsibilities in various scenarios, contract reviews and explanations, latest changes in laws and regulations.',
        'https://robohash.org/LawBot',
        'merivercap',
        'professional',
        'clear_and_succinct',
        'bullet_points',
        'adult');


SELECT pg_catalog.setval('public.chatbot_chatbot_id_seq', 12, true);

