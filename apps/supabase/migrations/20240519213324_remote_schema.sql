set check_function_bodies = off;

CREATE OR REPLACE PROCEDURE public.filter_threads(IN categoryid integer DEFAULT NULL::integer, IN threadlimit integer DEFAULT 20, IN threadoffset integer DEFAULT 0)
 LANGUAGE plpgsql
AS $procedure$
DECLARE
    sql_query TEXT;
BEGIN
    -- Base query without the WHERE clause
    sql_query := '
        SELECT
            filtered_threads.thread_id,
            filtered_threads.messages -> 0 AS first_message,
            filtered_threads.messages -> 1 AS first_answer,
            filtered_threads.chatbot,
            filtered_threads.account
        FROM
            filtered_threads';

    -- Add WHERE clause if categoryId is provided
    IF categoryId IS NOT NULL THEN
        sql_query := sql_query || '
        WHERE
            EXISTS (
                SELECT 1
                FROM jsonb_array_elements(filtered_threads.chatbot->''categories'') AS cat
                WHERE (cat->>''category_id'')::INT = ' || categoryId || '
            )';
    END IF;

    -- Add LIMIT and OFFSET
    sql_query := sql_query || ' LIMIT ' || threadLimit || ' OFFSET ' || threadOffset;

    -- Execute the dynamic SQL query
    EXECUTE sql_query;
END;
$procedure$
;

CREATE OR REPLACE FUNCTION public.get_threads(category_id integer)
 RETURNS TABLE(id uuid, title text, created_at timestamp without time zone, updated_at timestamp without time zone, message jsonb, chatbot jsonb, account jsonb)
 LANGUAGE plpgsql
AS $function$
BEGIN
    RETURN QUERY
    SELECT
        t.id,
        t.title,
        t.created_at,
        t.updated_at,
        jsonb_agg(jsonb_build_object(
            'id', m.id,
            'content', m.content,
            'role', m.role,
            'created_at', m.created_at
        )) AS message,
        jsonb_build_object(
            'chatbot_id', c.chatbot_id,
            'name', c.name,
            'avatar', c.avatar,
            'prompt', pc.prompt,
            'category', cc
        ) AS chatbot,
        jsonb_build_object(
            'user_id', a.user_id,
            'username', a.username,
            'avatar', a.avatar
        ) AS account
    FROM
        thread t
        JOIN message m ON t.id = m.thread_id
        JOIN chatbot c ON t.chatbot_id = c.chatbot_id
        JOIN chatbot_category cc ON c.chatbot_category_id = cc.id
        JOIN prompt_chatbot pc ON c.prompt_chatbot_id = pc.id
        JOIN account a ON t.account_id = a.user_id
    WHERE
        cc.category_id = category_id
    GROUP BY
        t.id, c.chatbot_id, c.name, c.avatar, pc.prompt, cc, a.user_id, a.username, a.avatar
    ORDER BY
        t.created_at DESC
    LIMIT 10;
END;
$function$
;


