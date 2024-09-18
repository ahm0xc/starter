import { type PropsWithChildren } from "react";

import requireAuth from "~/lib/auth/require-auth";

export default async function ProtectedLayout({ children }: PropsWithChildren) {
  await requireAuth();

  return <div>{children}</div>;
}
