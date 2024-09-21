import Link from "next/link";

import { ArrowRight, GithubLogo, XLogo } from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "ui/button";

import { siteConfig } from "~/config/site";
import { nFormatter } from "~/utils/base";
import { cn } from "~/utils/tailwindcss";

export default async function HeroLanding() {
  return (
    <section className="space-y-6 py-12 sm:py-20 lg:py-20">
      <div className="container flex max-w-5xl flex-col items-center gap-5 text-center">
        <Link
          href="https://x.com/ahm0xc"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "px-4 rounded-full"
          )}
          target="_blank"
        >
          <span className="mr-3">🎉</span>
          <span className="hidden md:flex">Introducing&nbsp;</span> Next Auth
          Roles Template on <XLogo className="ml-2 size-3.5" />
        </Link>

        <h1 className="text-balance font-urban text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-[66px]">
          Kick off with a bang with{" "}
          <span className="text-gradient_indigo-purple font-extrabold">
            SaaS Starter
          </span>
        </h1>

        <p
          className="max-w-2xl text-balance leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          style={{ animationDelay: "0.35s", animationFillMode: "forwards" }}
        >
          Build your next project using Next.js 14, Prisma, Neon, Auth.js v5,
          Resend, React Email, Shadcn/ui, Stripe.
        </p>

        <div
          className="flex justify-center space-x-2 md:space-x-4"
          style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
        >
          <Link
            href="/pricing"
            prefetch={true}
            className={cn(buttonVariants({ size: "lg" }), "gap-2 rounded-full")}
          >
            <span>Go Pricing</span>
            <ArrowRight className="size-4" />
          </Link>
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "px-5 rounded-full"
            )}
          >
            <GithubLogo className="mr-2 size-4" />
            <p>
              <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
              <span className="font-semibold">{nFormatter(15000)}</span>
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
