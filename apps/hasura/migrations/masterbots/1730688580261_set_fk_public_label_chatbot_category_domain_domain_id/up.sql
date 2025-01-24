alter table "public"."label_chatbot_category_domain"
  add constraint "label_chatbot_category_domain_domain_id_fkey"
  foreign key ("domain_id")
  references "public"."domain_enum"
  ("name") on update restrict on delete restrict;
