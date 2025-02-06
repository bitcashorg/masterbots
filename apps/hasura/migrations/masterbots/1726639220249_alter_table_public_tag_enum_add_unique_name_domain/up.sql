alter table "public"."tag_enum" add constraint "tag_enum_name_domain_key" unique ("name", "domain");
