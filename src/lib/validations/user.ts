import * as z from "zod";

import { userRoles } from "~/server/db/schema/users";

export const userNameSchema = z.object({
  name: z.string().min(3).max(32),
});

export const userRoleSchema = z.object({
  role: z.enum(userRoles),
});
