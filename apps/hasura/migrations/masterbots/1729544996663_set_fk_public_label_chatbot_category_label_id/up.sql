alter table "public"."label_chatbot_category"
  add constraint "label_chatbot_category_label_id_fkey"
  foreign key ("label_id")
  references "public"."label"
  ("label_id") on update restrict on delete restrict;
