"use server";

import { revalidatePath } from "next/cache";

import { eq } from "drizzle-orm";

import { auth } from "~/lib/auth";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { type UserRole } from "~/server/db/schema/users";

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

export async function updateUserName(name: string) {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "User not found" };
  }

  try {
    await db.update(users).set({ name }).where(eq(users.id, session.user.id));
  } catch (error) {
    console.error("🔴", error);
    return { error: "Server error" };
  }

  revalidatePath("/dashboard/settings");

  return {};
}

export async function updateUserRole(role: UserRole) {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "User not found" };
  }

  try {
    await db.update(users).set({ role }).where(eq(users.id, session.user.id));
  } catch (error) {
    console.error("🔴", error);
    return { error: "Server error" };
  }

  revalidatePath("/dashboard/settings");

  return {};
}

export async function deleteUserAccount() {
  const session = await auth();

  if (!session?.user.id) {
    return { error: "User not found" };
  }

  try {
    await db.delete(users).where(eq(users.id, session.user.id));
  } catch (error) {
    console.error("🔴", error);
    return { error: "Server error" };
  }

  return {};
}
