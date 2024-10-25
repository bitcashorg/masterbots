CREATE TABLE "public"."social_following" (
  "id" uuid NOT NULL,
  "follower_id" uuid NOT NULL,
  "followee_id" uuid NOT NULL,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  PRIMARY KEY ("id"),
  FOREIGN KEY ("follower_id") REFERENCES "public"."user"("user_id") ON UPDATE restrict ON DELETE restrict,
  FOREIGN KEY ("followee_id") REFERENCES "public"."user"("user_id") ON UPDATE restrict ON DELETE restrict,
  UNIQUE ("id"),
  UNIQUE ("follower_id", "followee_id")
);COMMENT ON TABLE "public"."social_following" IS E'This junction table records social following relationships between users. Each record represents a follower-followee relationship.';
CREATE INDEX idx_social_following_follower ON "public"."social_following" ("follower_id");
CREATE INDEX idx_social_following_followee ON "public"."social_following" ("followee_id");