import Image from "next/image";
import Link from "next/link";

import { auth } from "~/lib/auth";
import { constructMetadata } from "~/utils/base";

import { PricingCards } from "./_components/pricing-cards";
import { PricingFaq } from "./_components/pricing-faq";

export const metadata = constructMetadata({
  title: "Pricing – SaaS Starter",
  description: "Explore our subscription plans.",
});

export default async function PricingPage() {
  const session = await auth();

  if (session?.user?.role === "ADMIN") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="text-5xl font-bold">Seriously?</h1>
        <Image
          src="/_static/illustrations/call-waiting.svg"
          alt="403"
          width={560}
          height={560}
          className="pointer-events-none -my-20 dark:invert"
        />
        <p className="text-balance px-4 text-center text-2xl font-medium">
          You are an {session.user.role}. Back to{" "}
          <Link
            href="/admin"
            className="text-muted-foreground underline underline-offset-4 hover:text-purple-500"
          >
            Dashboard
          </Link>
          .
        </p>
      </div>
    );
  }

  let subscriptionPlan;
  if (session?.user.id) {
    // subscriptionPlan = await getUserSubscriptionPlan(user.id);
  }

  return (
    <div className="flex w-full flex-col gap-16 py-8 md:py-8">
      <PricingCards
        userId={session?.user?.id}
        subscriptionPlan={subscriptionPlan}
      />
      <hr className="container" />
      {/* <ComparePlans /> */}
      <PricingFaq />
    </div>
  );
}
