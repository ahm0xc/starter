"use client";

import { useState } from "react";

import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";

import { deleteUserAccount } from "~/actions/user";
import UserAvatar from "~/components/shared/user-avatar";
import { Button } from "~/components/ui/button";
import { DialogContent } from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";

export const DeleteAccountConfirmationModalId = "delete-account-confirmation";

export default function DeleteAccountConfirmationModal() {
  const { data: session } = useSession();
  const [deleting, setDeleting] = useState(false);

  async function deleteAccount() {
    setDeleting(true);
    const { error } = await deleteUserAccount();
    if (error) {
      toast.error(error, {
        description: "Deleting account failed",
      });
      return;
    }
    await new Promise((resolve) =>
      setTimeout(() => {
        void signOut({
          callbackUrl: `${window.location.origin}/`,
        });
        resolve(null);
      }, 500)
    );
    setDeleting(false);
  }

  return (
    <DialogContent className="p-0 max-w-md sm:rounded-xl overflow-hidden gap-0">
      <div className="flex flex-col items-center justify-center space-y-3 border-b p-4 pt-8 sm:px-16">
        <UserAvatar
          user={{
            name: session?.user?.name ?? null,
            image: session?.user?.image ?? null,
          }}
        />
        <h3 className="text-lg font-semibold">Delete Account</h3>
        <p className="text-center text-sm text-muted-foreground">
          <b>Warning:</b> This will permanently delete your account and your
          active subscription!
        </p>

        {/* TODO: Use getUserSubscriptionPlan(session.user.id) to display the user's subscription if he have a paid plan */}
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          toast.promise(deleteAccount(), {
            loading: "Deleting account...",
            success: "Account deleted successfully!",
            // error: (err) => err,
          });
        }}
        className="flex flex-col space-y-6 bg-accent px-4 py-8 text-left sm:px-16"
      >
        <div>
          <label htmlFor="verification" className="block text-sm">
            To verify, type{" "}
            <span className="font-semibold text-black dark:text-white">
              confirm delete account
            </span>{" "}
            below
          </label>
          <Input
            type="text"
            name="verification"
            id="verification"
            pattern="confirm delete account"
            required
            autoFocus={false}
            autoComplete="off"
            className="mt-1 w-full border bg-background"
          />
        </div>

        <Button variant="destructive" disabled={deleting}>
          Confirm delete account
        </Button>
      </form>
    </DialogContent>
  );
}
