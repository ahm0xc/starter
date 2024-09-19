"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { updateUserName } from "~/actions/user";
import { SectionColumns } from "~/app/(protected)/_components/section-column";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { userNameSchema } from "~/lib/validations/user";
import type { User } from "~/server/db/schema/users";

interface UserNameFormProps {
  user: Pick<User, "id" | "name">;
}

export function UserNameForm({ user }: UserNameFormProps) {
  const { update } = useSession();
  const [updated, setUpdated] = useState(false);

  const [isPending, startTransition] = useTransition();

  const checkUpdate = (value: string) => {
    setUpdated(user.name !== value);
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof userNameSchema>>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      name: user?.name ?? "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      const { error } = await updateUserName(data.name);

      if (error) {
        toast.error(error, {
          description: "Your name was not updated. Please try again.",
        });
        return;
      }

      await update();
      setUpdated(false);
      toast.success("Your name has been updated.");
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <SectionColumns
        title="Your Name"
        description="Please enter a display name you are comfortable with."
      >
        <div className="flex w-full items-center gap-2">
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            className="flex-1"
            size={32}
            {...register("name")}
            onChange={(e) => checkUpdate(e.target.value)}
          />
          <Button
            type="submit"
            disabled={isPending || !updated}
            className="w-[67px] shrink-0 px-0 sm:w-[130px]"
          >
            {isPending ? (
              <Spinner className="size-4 animate-spin" />
            ) : (
              <p>
                Save
                <span className="hidden sm:inline-flex">&nbsp;Changes</span>
              </p>
            )}
          </Button>
        </div>
        <div className="flex flex-col justify-between p-1">
          {errors?.name && (
            <p className="pb-0.5 text-[13px] text-red-600">
              {errors.name.message}
            </p>
          )}
          <p className="text-[13px] text-muted-foreground">Max 32 characters</p>
        </div>
      </SectionColumns>
    </form>
  );
}
