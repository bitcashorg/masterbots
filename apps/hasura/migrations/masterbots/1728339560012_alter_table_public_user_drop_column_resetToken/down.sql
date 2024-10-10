comment on column "public"."user"."resetToken" is E'Table storing information about registered users.';
alter table "public"."user" alter column "resetToken" drop not null;
alter table "public"."user" add column "resetToken" text;
