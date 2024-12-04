CREATE TABLE IF NOT EXISTS "user" (
	"user_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"username" varchar NOT NULL,
	"profile_picture" varchar,
	"date_joined" timestamp DEFAULT now(),
	"last_login" timestamp,
	"is_blocked" boolean DEFAULT false,
	"get_free_month" boolean DEFAULT false,
	"pro_user_subscription_id" varchar,
	"slug" varchar,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_slug_unique" UNIQUE("slug")
);
