import { timestamp, pgTable, text, serial  } from "drizzle-orm/pg-core"

export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    url: text("url").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  })