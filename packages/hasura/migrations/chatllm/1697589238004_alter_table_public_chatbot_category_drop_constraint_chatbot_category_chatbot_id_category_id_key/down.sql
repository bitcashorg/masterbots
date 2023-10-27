alter table "public"."chatbot_category" add constraint "chatbot_category_category_id_chatbot_id_key" unique ("category_id", "chatbot_id");
