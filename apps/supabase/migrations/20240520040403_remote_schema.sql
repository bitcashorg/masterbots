drop function if exists "public"."get_threads"(category_id integer);

create or replace view "public"."thread_full" as  WITH filtered_threads AS (
         SELECT t.thread_id,
            jsonb_agg(jsonb_build_object('id', m.id, 'content', m.content, 'role', m.role, 'created_at', m.created_at) ORDER BY m.created_at) AS messages,
            jsonb_build_object('chatbot_id', c.chatbot_id, 'name', c.name, 'avatar', c.avatar, 'prompt', jsonb_build_object('prompt_id', p.prompt_id, 'content', p.content), 'categories', jsonb_agg(jsonb_build_object('category_id', cat.category_id, 'name', cat.name)) FILTER (WHERE (cat.category_id IS NOT NULL))) AS chatbot,
            jsonb_build_object('user_id', a.user_id, 'username', a.username, 'avatar', a.avatar) AS account,
            jsonb_agg(cat.category_id) FILTER (WHERE (cat.category_id IS NOT NULL)) AS category_ids
           FROM (((((((thread t
             JOIN message m ON ((m.thread_id = t.thread_id)))
             JOIN chatbot c ON ((c.chatbot_id = t.chatbot_id)))
             LEFT JOIN prompt_chatbot pc ON ((pc.chatbot_id = c.chatbot_id)))
             LEFT JOIN prompt p ON ((p.prompt_id = pc.prompt_id)))
             LEFT JOIN chatbot_category cc ON ((cc.chatbot_id = c.chatbot_id)))
             LEFT JOIN category cat ON ((cat.category_id = cc.category_id)))
             JOIN account a ON ((a.user_id = t.user_id)))
          GROUP BY t.thread_id, c.chatbot_id, a.user_id, p.prompt_id
        )
 SELECT filtered_threads.thread_id,
    (filtered_threads.messages -> 0) AS first_message,
    (filtered_threads.messages -> 1) AS first_answer,
    filtered_threads.chatbot,
    filtered_threads.account,
    filtered_threads.category_ids
   FROM filtered_threads;



