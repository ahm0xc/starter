import { cache } from "react";

import "server-only";

import { auth } from "./index";

export const getCurrentUser = cache(async () => {
  const session = await auth();

  if (!session?.user) {
    return undefined;
  }

  return session.user;
});
