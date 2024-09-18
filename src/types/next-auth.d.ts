import type { User } from "next-auth";

import type { UserRole } from "~/server/db/schema/users";

export type ExtendedUser = User & {
  role: UserRole;
};

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
