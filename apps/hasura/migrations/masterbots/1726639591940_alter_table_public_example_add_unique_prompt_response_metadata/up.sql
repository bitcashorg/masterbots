alter table "public"."example" add constraint "example_prompt_response_metadata_key" unique ("prompt", "response", "metadata");
