CREATE TABLE "public"."token" ("token" text NOT NULL, "token_expiry" timestamptz NOT NULL, PRIMARY KEY ("token") , UNIQUE ("token"));
