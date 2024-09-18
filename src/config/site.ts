import { env } from "~/env";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig = {
  name: "SaaS Starter",
  description:
    "Get your project off to an explosive start with SaaS Starter! Harness the power of Next.js 14, Prisma, Neon, Auth.js v5, Resend, React Email, Shadcn/ui and Stripe to build your next big thing.",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  links: {
    twitter: "https://twitter.com/ahm-xc",
    github: "https://github.com/ahm0xc/starter",
  },
  mailSupport: "support@starter.com",
};
