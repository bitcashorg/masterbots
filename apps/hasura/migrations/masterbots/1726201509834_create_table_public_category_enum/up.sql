CREATE TABLE "public"."category_enum" ("name" varchar NOT NULL, "domain" varchar NOT NULL, "added" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("name","domain") , FOREIGN KEY ("domain") REFERENCES "public"."domain_enum"("name") ON UPDATE restrict ON DELETE restrict);