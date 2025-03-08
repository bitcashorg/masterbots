BEGIN TRANSACTION;
ALTER TABLE "public"."message" DROP CONSTRAINT "message_pkey";

ALTER TABLE "public"."message"
    ADD CONSTRAINT "message_pkey" PRIMARY KEY ("message_id", "slug");
COMMIT TRANSACTION;
