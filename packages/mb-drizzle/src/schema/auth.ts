import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  userId: uuid("user_id").primaryKey().defaultRandom(),
  email: varchar("email").notNull().unique(),
  username: varchar("username").notNull(),
  profilePicture: varchar("profile_picture"),
  dateJoined: timestamp("date_joined").defaultNow(),
  lastLogin: timestamp("last_login"),
  isBlocked: boolean("is_blocked").default(false),
  getFreeMonth: boolean("get_free_month").default(false),
  proUserSubscriptionId: varchar("pro_user_subscription_id"),
  slug: varchar("slug").unique(),
});
