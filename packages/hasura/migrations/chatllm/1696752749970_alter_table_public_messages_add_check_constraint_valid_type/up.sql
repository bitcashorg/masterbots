alter table "public"."messages" add constraint "valid_type" check (type IN ('user', 'bot'));
