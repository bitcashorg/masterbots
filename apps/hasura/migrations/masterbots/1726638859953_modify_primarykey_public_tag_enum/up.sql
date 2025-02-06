BEGIN TRANSACTION;
ALTER TABLE "public"."tag_enum" DROP CONSTRAINT "tag_enum_pkey";

ALTER TABLE "public"."tag_enum"
    ADD CONSTRAINT "tag_enum_pkey" PRIMARY KEY ("tag_id");
COMMIT TRANSACTION;
