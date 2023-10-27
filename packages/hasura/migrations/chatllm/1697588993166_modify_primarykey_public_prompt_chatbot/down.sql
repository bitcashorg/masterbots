alter table "public"."prompt_chatbot" drop constraint "prompt_chatbot_pkey";
alter table "public"."prompt_chatbot"
    add constraint "prompt_chatbot_pkey"
    primary key ("chabot_id", "prompt_id");
