import { redirect } from "next/navigation";

import { auth } from "~/lib/auth";
import { constructMetadata } from "~/utils/base";

import { DashboardHeader } from "../_components/dashboard-header";
import InfoCard from "./_components/info-card";
import TransactionsList from "./_components/transactions-list";

export const metadata = constructMetadata({
  title: "Admin - SaaS Starter",
  description: "Admin page for only admin management.",
});

export default async function AdminPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Admin Panel"
        text="Access only for users with ADMIN role."
      />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <InfoCard />
          <InfoCard />
          <InfoCard />
          <InfoCard />
        </div>
        <TransactionsList />
        <TransactionsList />
      </div>
    </>
  );
}
