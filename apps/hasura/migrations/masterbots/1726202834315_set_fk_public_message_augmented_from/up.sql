alter table "public"."message"
  add constraint "message_augmented_from_fkey"
  foreign key ("augmented_from")
  references "public"."message"
  ("message_id") on update restrict on delete restrict;
