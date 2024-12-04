import { pgTable, uuid, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);

export const users = pgTable("user", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  dateJoined: timestamp("date_joined", { withTimezone: true }).defaultNow(),
  lastLogin: timestamp("last_login", { withTimezone: true }).defaultNow(),
  profilePicture: text("profile_picture"),
  slug: text("slug").unique(),
  getFreeMonth: boolean("get_free_month").default(false),
  proUserSubscriptionId: text("pro_user_subscription_id").default(''),
  isBlocked: boolean("is_blocked").default(false),
  isVerified: boolean("is_verified").default(false),
  role: userRoleEnum("role").default('user'),
  bio: text("bio"),
  favouriteTopic: text("favourite_topic")
});

// ?  In case we  need to access the enum values elsewhere
export const UserRole = {
  USER: 'user',
  ADMIN: 'admin'
} as const;