BEGIN TRANSACTION;
ALTER TABLE "public"."prompt_chatbot" DROP CONSTRAINT "prompt_chatbot_pkey";

ALTER TABLE "public"."prompt_chatbot"
    ADD CONSTRAINT "prompt_chatbot_pkey" PRIMARY KEY ("prompt_id", "chabot_id");
COMMIT TRANSACTION;
