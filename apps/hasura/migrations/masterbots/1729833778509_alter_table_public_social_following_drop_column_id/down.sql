-- First create the column
alter table "public"."social_following" add column "id" uuid;

-- Then set its properties
alter table "public"."social_following" alter column "id" set default uuid_generate_v4();
alter table "public"."social_following" alter column "id" drop not null;

-- Finally add the comment
comment on column "public"."social_following"."id" is E'This junction table records social following relationships between users. Each record represents a follower-followee relationship.';