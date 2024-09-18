import { redirect } from "next/navigation";

import { env } from "~/env";
import { auth } from "~/lib/auth";

export interface RequireAuthProps {
  callbackUrl?: string;
}

export default async function requireAuth(props?: RequireAuthProps) {
  const session = await auth();

  if (!session) {
    const fullCallbackUrl = props?.callbackUrl?.startsWith("/")
      ? `${env.NEXT_PUBLIC_APP_URL}${props?.callbackUrl}`
      : props?.callbackUrl;

    const redirectUrl = fullCallbackUrl ?? "/";

    return redirect(redirectUrl);
  }
}
