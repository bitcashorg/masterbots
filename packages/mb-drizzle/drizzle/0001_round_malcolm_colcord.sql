DO $$ BEGIN
 CREATE TYPE "user_role" AS ENUM('user', 'admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "email" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "username" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "profile_picture" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "date_joined" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "last_login" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "last_login" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "pro_user_subscription_id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "pro_user_subscription_id" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "slug" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "password" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "is_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "role" "user_role" DEFAULT 'user';--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "favourite_topic" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");