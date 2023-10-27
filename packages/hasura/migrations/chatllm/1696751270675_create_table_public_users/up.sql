CREATE TABLE "public"."users" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "username" text NOT NULL, "email" text NOT NULL, "password" text NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") , UNIQUE ("id"), UNIQUE ("username"), UNIQUE ("email"));
CREATE EXTENSION IF NOT EXISTS pgcrypto;
