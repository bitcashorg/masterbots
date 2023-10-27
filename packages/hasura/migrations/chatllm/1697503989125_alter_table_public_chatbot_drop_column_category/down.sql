comment on column "public"."chatbot"."category" is E'Table storing information about chatbots, their characteristics, and default settings.';
alter table "public"."chatbot" alter column "category" drop not null;
alter table "public"."chatbot" add column "category" text;
