"use client";

import React from "react";

import { Check, Copy } from "@phosphor-icons/react";

import { cn } from "~/utils/tailwindcss";

import { Button } from "./ui/button";

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
}

export function CopyButton({ value, className, ...props }: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  const handleCopyValue = (value: string) => {
    void navigator.clipboard.writeText(value);
    setHasCopied(true);
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn(
        "z-10 size-[30px] border border-white/25 bg-zinc-900 p-1.5 text-primary-foreground hover:text-foreground dark:text-foreground",
        className
      )}
      onClick={() => handleCopyValue(value)}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? <Check className="size-4" /> : <Copy className="size-4" />}
    </Button>
  );
}
