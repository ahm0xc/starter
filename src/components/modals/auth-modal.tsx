"use client";

import { useState } from "react";

import { GoogleLogo, Spinner } from "@phosphor-icons/react";
import { signIn } from "next-auth/react";
import { Button } from "ui/button";
import { DialogContent } from "ui/dialog";

import { Icons } from "~/components/shared/icons";
import { siteConfig } from "~/config/site";

import { useModalsStore } from ".";

export const AuthModalId = "auth-modal";

export default function AuthModal() {
  const [signInClicked, setSignInClicked] = useState(false);

  const { close } = useModalsStore();

  return (
    <DialogContent className="p-0 max-w-md sm:rounded-xl overflow-hidden">
      <div className="w-full">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-background px-4 py-6 pt-8 text-center md:px-16">
          <a href={siteConfig.url}>
            <Icons.logo className="size-10" />
          </a>
          <h3 className="font-urban text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            This is strictly for demo purposes - only your email and profile
            picture will be stored.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-secondary/50 px-4 py-8 md:px-16">
          <Button
            variant="default"
            disabled={signInClicked}
            onClick={() => {
              setSignInClicked(true);
              void signIn("google", { redirect: false }).then(() =>
                setTimeout(() => {
                  close(AuthModalId);
                }, 400)
              );
            }}
          >
            {signInClicked ? (
              <Spinner className="mr-2 size-4 animate-spin" />
            ) : (
              <GoogleLogo weight="bold" className="mr-2 size-4" />
            )}{" "}
            Sign In with Google
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
