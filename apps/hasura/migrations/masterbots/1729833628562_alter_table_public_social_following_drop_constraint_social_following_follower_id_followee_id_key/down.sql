alter table "public"."social_following" add constraint "social_following_follower_id_followee_id_key" unique ("follower_id", "followee_id");
