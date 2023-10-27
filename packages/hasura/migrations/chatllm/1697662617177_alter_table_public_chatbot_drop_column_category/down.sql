comment on column "public"."chatbot"."category" is E'Table storing information about chatbots, their characteristics, and default settings.';
alter table "public"."chatbot"
  add constraint "chatbot_category_fkey"
  foreign key (category)
  references "public"."category"
  (category_id) on update restrict on delete restrict;
alter table "public"."chatbot" alter column "category" drop not null;
alter table "public"."chatbot" add column "category" int4;
