BEGIN TRANSACTION;
ALTER TABLE "public"."thread" DROP CONSTRAINT "thread_pkey";

ALTER TABLE "public"."thread"
    ADD CONSTRAINT "thread_pkey" PRIMARY KEY ("thread_id", "slug");
COMMIT TRANSACTION;
