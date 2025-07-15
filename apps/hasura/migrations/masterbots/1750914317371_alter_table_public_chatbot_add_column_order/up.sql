create or replace function get_chatbot_count()
returns integer as $$
BEGIN
    return (select COUNT(*) from public.chatbot);
END;
$$ language plpgsql;

-- and add a new column "order" to the chatbot table with the default value as above function
alter table "public"."chatbot" add column "order" integer
 default get_chatbot_count() not null;
