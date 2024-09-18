import { sql } from "drizzle-orm";
import { text, timestamp, uuid } from "drizzle-orm/pg-core";

import { createTable } from "../utility";
import users from "./users";

const sessions = createTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),

  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export default sessions;
