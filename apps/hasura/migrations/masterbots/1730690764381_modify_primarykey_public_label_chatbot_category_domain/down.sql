alter table "public"."label_chatbot_category_domain" drop constraint "label_chatbot_category_domain_pkey";
alter table "public"."label_chatbot_category_domain"
    add constraint "label_chatbot_category_pkey"
    primary key ("category_id", "label_id", "chatbot_id");
