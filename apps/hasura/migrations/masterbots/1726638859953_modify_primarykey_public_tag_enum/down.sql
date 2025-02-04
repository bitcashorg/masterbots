alter table "public"."tag_enum" drop constraint "tag_enum_pkey";
alter table "public"."tag_enum"
    add constraint "tag_enum_pkey"
    primary key ("domain", "name");
