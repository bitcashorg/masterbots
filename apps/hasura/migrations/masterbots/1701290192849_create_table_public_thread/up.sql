CREATE TABLE "public"."thread" ("thread_id" serial NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), "updated_at" timestamptz NOT NULL DEFAULT now(), "chatbot_id" integer NOT NULL, "user_id" integer NOT NULL, PRIMARY KEY ("thread_id") , FOREIGN KEY ("chatbot_id") REFERENCES "public"."chatbot"("chatbot_id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("user_id") REFERENCES "public"."user"("user_id") ON UPDATE restrict ON DELETE restrict);