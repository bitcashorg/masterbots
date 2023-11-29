SET check_function_bodies = false;
INSERT INTO public."user" (user_id, username, email, password, date_joined, last_login, profile_picture) VALUES (1, 'merivercap', 'jun@bitcash.org', '123456masterbots', '2023-10-31 03:15:18.467907+00', '2023-10-31 03:15:18.467907+00', NULL);
INSERT INTO public."user" (user_id, username, email, password, date_joined, last_login, profile_picture) VALUES (2, 'DefaultUser123', 'default@email.com', 'defaultPassword', '2023-11-04 04:58:18.582273+00', '2023-11-04 04:58:18.582273+00', NULL);
SELECT pg_catalog.setval('public.user_user_id_seq', 2, true);
