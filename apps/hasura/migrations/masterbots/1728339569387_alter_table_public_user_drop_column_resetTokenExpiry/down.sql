comment on column "public"."user"."resetTokenExpiry" is E'Table storing information about registered users.';
alter table "public"."user" alter column "resetTokenExpiry" drop not null;
alter table "public"."user" add column "resetTokenExpiry" timestamptz;
