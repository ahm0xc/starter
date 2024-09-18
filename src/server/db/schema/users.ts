import { sql } from "drizzle-orm";
import { pgEnum, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { createTable } from "../utility";

export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);
export type UserRole = "USER" | "ADMIN";

const users = createTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }).notNull().unique(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: varchar("image", { length: 2048 }),
  role: userRoleEnum("role").default("USER"),

  createdAt: timestamp("createdAt", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updatedAt", { mode: "date" })
    .defaultNow()
    .$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});

export default users;

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
