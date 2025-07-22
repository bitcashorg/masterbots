create or replace function get_topic_count()
returns integer as $$
BEGIN
    return (select COUNT(*) from public.category);
END;
$$ language plpgsql;

alter table "public"."category" add column "order" integer
 default get_topic_count() not null;
