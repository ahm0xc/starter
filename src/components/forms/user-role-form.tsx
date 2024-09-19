"use client";

import { useState, useTransition } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Spinner } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { updateUserRole } from "~/actions/user";
import { SectionColumns } from "~/app/(protected)/_components/section-column";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { userRoleSchema } from "~/lib/validations/user";
import { type User, type UserRole, userRoles } from "~/server/db/schema/users";

interface UserNameFormProps {
  user: Pick<User, "id" | "role">;
}

export function UserRoleForm({ user }: UserNameFormProps) {
  const { update } = useSession();
  const [updated, setUpdated] = useState(false);
  const [isPending, startTransition] = useTransition();

  const roles = userRoles;
  const [role, setRole] = useState(user.role);

  const form = useForm<z.infer<typeof userRoleSchema>>({
    resolver: zodResolver(userRoleSchema),
    values: {
      role: role ?? "USER",
    },
  });

  const onSubmit = (data: z.infer<typeof userRoleSchema>) => {
    startTransition(async () => {
      const { error } = await updateUserRole(data.role);

      if (error) {
        toast.error(error, {
          description: "Your role was not updated. Please try again.",
        });
        return;
      }

      await update();
      setUpdated(false);
      toast.success("Your role has been updated.");
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SectionColumns
          title="Your Role"
          description="Select the role what you want for test the app."
        >
          <div className="flex w-full items-center gap-2">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="w-full space-y-0">
                  <FormLabel className="sr-only">Role</FormLabel>
                  <Select
                    // TODO:(FIX) Option value not update. Use useState for the moment
                    onValueChange={(value: UserRole) => {
                      setUpdated(user.role !== value);
                      setRole(value);
                      // field.onChange;
                    }}
                    name={field.name}
                    defaultValue={user.role ?? "USER"}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role.toString()}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
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
            <p className="text-[13px] text-muted-foreground">
              Remove this field on real production
            </p>
          </div>
        </SectionColumns>
      </form>
    </Form>
  );
}
