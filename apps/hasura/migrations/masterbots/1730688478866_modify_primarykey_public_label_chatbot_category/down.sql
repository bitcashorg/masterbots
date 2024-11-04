alter table "public"."label_chatbot_category" drop constraint "label_chatbot_category_pkey";
alter table "public"."label_chatbot_category"
    add constraint "label_chatbot_category_pkey"
    primary key ("domain_id", "label_id", "chatbot_id", "category_id");
