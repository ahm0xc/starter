import { UserNameForm } from "~/components/forms/user-name-form";
import { UserRoleForm } from "~/components/forms/user-role-form";
import { env } from "~/env";
import requireAuth from "~/lib/auth/require-auth";
import { constructMetadata } from "~/utils/base";

import { DashboardHeader } from "../../_components/dashboard-header";
import { DeleteAccountSection } from "../../_components/delete-account-section";

export const metadata = constructMetadata({
  title: "Settings – SaaS Starter",
  description: "Configure your account and website settings.",
});

export default async function SettingsPage() {
  const session = await requireAuth();

  return (
    <>
      <DashboardHeader
        heading="Settings"
        text="Manage account and website settings."
      />
      <div className="divide-y divide-muted pb-10">
        <UserNameForm
          user={{ id: session.user.id!, name: session.user.name ?? "" }}
        />
        {env.NODE_ENV !== "production" && (
          <UserRoleForm
            user={{ id: session.user.id!, role: session.user.role }}
          />
        )}
        <DeleteAccountSection />
      </div>
    </>
  );
}
