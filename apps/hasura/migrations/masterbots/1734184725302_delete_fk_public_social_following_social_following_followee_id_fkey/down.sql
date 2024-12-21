alter table "public"."social_following"
  add constraint "social_following_followee_id_fkey"
  foreign key ("followee_id")
  references "public"."user"
  ("user_id") on update restrict on delete restrict;
