import { db } from "~/server/db";

export async function getUserById(id: string) {
  return db.query.users.findFirst({
    where: (table, { eq }) => eq(table.id, id),
  });
}

export async function getUserByEmail(email: string) {
  return db.query.users.findFirst({
    where: (table, { eq }) => eq(table.email, email),
  });
}
