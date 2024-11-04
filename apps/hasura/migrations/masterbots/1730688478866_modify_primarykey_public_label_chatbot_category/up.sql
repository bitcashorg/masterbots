BEGIN TRANSACTION;
ALTER TABLE "public"."label_chatbot_category" DROP CONSTRAINT "label_chatbot_category_pkey";

ALTER TABLE "public"."label_chatbot_category"
    ADD CONSTRAINT "label_chatbot_category_pkey" PRIMARY KEY ("label_id", "chatbot_id", "category_id");
COMMIT TRANSACTION;
