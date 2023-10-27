alter table "public"."message"
  add constraint "message_type_fkey"
  foreign key ("type")
  references "public"."message_type_enum"
  ("value") on update restrict on delete restrict;
