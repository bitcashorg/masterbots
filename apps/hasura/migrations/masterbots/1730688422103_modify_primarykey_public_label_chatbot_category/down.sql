alter table "public"."label_chatbot_category" drop constraint "label_chatbot_category_pkey";
alter table "public"."label_chatbot_category"
    add constraint "label_chatbot_category_pkey"
    primary key ("category_id", "label_id", "chatbot_id");
