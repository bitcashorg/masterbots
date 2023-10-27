alter table "public"."prompt"
  add constraint "prompt_type_fkey"
  foreign key ("type")
  references "public"."prompt_type_enum"
  ("value") on update restrict on delete restrict;
