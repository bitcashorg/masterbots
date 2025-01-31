CREATE TABLE IF NOT EXISTS "public"."chatbot_domain" (
  "chatbot_id" integer NOT NULL,
  "domain_name" text NOT NULL,
  PRIMARY KEY ("chatbot_id", "domain_name"),
  FOREIGN KEY ("domain_name") REFERENCES "public"."domain_enum"("name") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON UPDATE restrict ON DELETE restrict
);

COMMENT ON TABLE "public"."chatbot_domain" IS E 'Junction table to track domains and chatbots relationships.';