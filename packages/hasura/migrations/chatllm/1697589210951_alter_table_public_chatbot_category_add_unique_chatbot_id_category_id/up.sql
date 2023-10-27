alter table "public"."chatbot_category" add constraint "chatbot_category_chatbot_id_category_id_key" unique ("chatbot_id", "category_id");
