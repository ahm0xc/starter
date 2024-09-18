import type { EmailConfig } from "next-auth/providers/email";
import { Resend } from "resend";

import { getUserByEmail } from "~/actions/user";
import { siteConfig } from "~/config/site";
import MagicLinkEmail from "~/emails/magic-link-email";
import { env } from "~/env";

export const resend = new Resend(env.RESEND_API_KEY);

export const sendVerificationRequest: EmailConfig["sendVerificationRequest"] =
  async ({ identifier, url, provider }) => {
    const user = await getUserByEmail(identifier);

    // if (!user?.name) return;

    const userVerified = user?.emailVerified ? true : false;
    const authSubject = userVerified
      ? `Sign-in link for ${siteConfig.name}`
      : "Activate your account";

    try {
      const { data, error } = await resend.emails.send({
        from: provider.from ?? env.EMAIL_FROM,
        to:
          env.NODE_ENV === "development" ? "delivered@resend.dev" : identifier,
        subject: authSubject,
        react: MagicLinkEmail({
          firstName: user?.name ?? identifier,
          actionUrl: url,
          mailType: userVerified ? "login" : "register",
          siteName: siteConfig.name,
        }),
        // Set this to prevent Gmail from threading emails.
        // More info: https://resend.com/changelog/custom-email-headers
        headers: {
          "X-Entity-Ref-ID": `${new Date().getTime()}`,
        },
      });

      if (error || !data) {
        throw new Error(error?.message);
      }
    } catch {
      throw new Error("Failed to send verification email.");
    }
  };
