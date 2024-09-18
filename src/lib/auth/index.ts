import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

import { env } from "~/env";
import { db } from "~/server/db";
import { accounts, sessions } from "~/server/db/schema";
import type { UserRole } from "~/server/db/schema/users";
import users from "~/server/db/schema/users";
import verificationTokens from "~/server/db/schema/verification-tokens";

import authConfig from "./config";

// import { getUserById } from "@/lib/user";

// More info: https://authjs.dev/getting-started/typescript#module-augmentation
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    // error: "/auth/error",
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        if (token.role) {
          // @ts-expect-error ???
          session.user.role = token.role;
        }

        session.user.name = token.name;
        session.user.image = token.picture;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const dbUser = await db.query.users.findFirst({
        where: (table, { eq }) => eq(table.id, token.sub!),
      });

      if (!dbUser) return token;

      token.name = dbUser.name;
      token.email = dbUser.email;
      token.picture = dbUser.image;
      token.role = dbUser.role;

      return token;
    },
  },
  ...authConfig,
  debug: env.NODE_ENV !== "production",
});
