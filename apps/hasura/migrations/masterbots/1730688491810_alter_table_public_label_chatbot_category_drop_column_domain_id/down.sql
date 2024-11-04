comment on column "public"."label_chatbot_category"."domain_id" is E'Junction table to connect between Label, Chatbot, Categories, and Domains tables.';
alter table "public"."label_chatbot_category" alter column "domain_id" drop not null;
alter table "public"."label_chatbot_category" add column "domain_id" int4;
