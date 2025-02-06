BEGIN TRANSACTION;
ALTER TABLE "public"."label_chatbot_category_domain" DROP CONSTRAINT "label_chatbot_category_pkey";

ALTER TABLE "public"."label_chatbot_category_domain"
    ADD CONSTRAINT "label_chatbot_category_pkey" PRIMARY KEY ("category_id", "label_id", "chatbot_id", "domain_id");
COMMIT TRANSACTION;
