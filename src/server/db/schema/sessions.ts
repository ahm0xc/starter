import { text, timestamp, uuid } from "drizzle-orm/pg-core";

import { createTable } from "../utility";
import users from "./users";

const sessions = createTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export default sessions;
