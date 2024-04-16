import { pgTable, text, integer, serial  } from "drizzle-orm/pg-core"
import { posts } from "./post"

export const likes = pgTable("likes", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    postId: integer("post_id").notNull().references(() => posts.id),
  })