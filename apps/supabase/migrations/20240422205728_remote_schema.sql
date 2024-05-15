alter table "public"."user" drop constraint "unique_slug";

drop index if exists "public"."unique_slug";

alter table "public"."user" drop column "profile_picture";

alter table "public"."user" drop column "slug";

alter table "public"."user" add column "avatar" text;


