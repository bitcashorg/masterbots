alter table "public"."message" drop constraint "message_id_key";

alter table "public"."message" drop constraint "message_pkey";

drop index if exists "public"."message_id_key";

drop index if exists "public"."message_pkey";

alter table "public"."message" drop column "message_id";

alter table "public"."message" add column "id" uuid not null default gen_random_uuid();

CREATE UNIQUE INDEX message_id_key ON public.message USING btree (id);

CREATE UNIQUE INDEX message_pkey ON public.message USING btree (id);

alter table "public"."message" add constraint "message_pkey" PRIMARY KEY using index "message_pkey";

alter table "public"."message" add constraint "message_id_key" UNIQUE using index "message_id_key";


