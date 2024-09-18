import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Resend from "next-auth/providers/resend";

import { siteConfig } from "~/config/site";
import { env } from "~/env";
import { sendVerificationRequest } from "~/lib/email";

export default {
  providers: [
    Google({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    Resend({
      apiKey: env.RESEND_API_KEY,
      from: `${siteConfig.name} <${env.EMAIL_FROM}>`,
      sendVerificationRequest,
    }),
  ],
} satisfies NextAuthConfig;
