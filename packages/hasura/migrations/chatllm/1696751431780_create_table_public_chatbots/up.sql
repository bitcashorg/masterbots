CREATE TABLE "public"."chatbots" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "name" text NOT NULL, "avatar" text NOT NULL, "description" text NOT NULL, PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("name"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
