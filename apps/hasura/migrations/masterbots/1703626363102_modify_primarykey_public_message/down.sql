alter table "public"."message" drop constraint "message_pkey";
alter table "public"."message"
    add constraint "message_pkey"
    primary key ("message_id");
