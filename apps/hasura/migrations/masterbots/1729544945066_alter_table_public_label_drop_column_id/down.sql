comment on column "public"."label"."id" is E'Labels for chatbots (e.g.: domain, category, sub-category, tags ';
alter table "public"."label" alter column "id" set default nextval('label_id_seq'::regclass);
alter table "public"."label" alter column "id" drop not null;
alter table "public"."label" add column "id" int4;
