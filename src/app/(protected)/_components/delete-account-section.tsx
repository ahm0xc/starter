"use client";

import { Trash, X } from "@phosphor-icons/react";

import { useModalsStore } from "~/components/modals";
import DeleteAccountConfirmationModal, {
  DeleteAccountConfirmationModalId,
} from "~/components/modals/delete-account-confirmation";
import { Button } from "~/components/ui/button";
import { siteConfig } from "~/config/site";

import { SectionColumns } from "./section-column";

export function DeleteAccountSection() {
  const { open } = useModalsStore();

  //   TODO:
  const userPaidPlan = true;

  function handleDelete() {
    open({
      id: DeleteAccountConfirmationModalId,
      children: <DeleteAccountConfirmationModal />,
    });
    return;
  }

  return (
    <SectionColumns
      title="Delete Account"
      description="This is a danger zone - Be careful !"
    >
      <div className="flex flex-col gap-4 rounded-xl border border-red-400 p-4 dark:border-red-900">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium">Are you sure ?</span>

            {userPaidPlan ? (
              <div className="flex items-center gap-1 rounded-md bg-red-600/10 p-1 pr-2 text-xs font-medium text-red-600 dark:bg-red-500/10 dark:text-red-500">
                <div className="m-0.5 rounded-full bg-red-600 p-[3px]">
                  <X size={10} className="text-background" />
                </div>
                Active Subscription
              </div>
            ) : null}
          </div>
          <div className="text-balance text-sm text-muted-foreground">
            Permanently delete your {siteConfig.name} account
            {userPaidPlan ? " and your subscription" : ""}. This action cannot
            be undone - please proceed with caution.
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="submit" variant="destructive" onClick={handleDelete}>
            <Trash className="mr-2 size-4" />
            <span>Delete Account</span>
          </Button>
        </div>
      </div>
    </SectionColumns>
  );
}
