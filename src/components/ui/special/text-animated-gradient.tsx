import { type ReactNode } from "react";

import { cn } from "~/utils/tailwindcss";

export default function TextAnimatedGradient({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex animate-text-gradient bg-gradient-to-r from-[#ACACAC] via-[#363636] to-[#ACACAC] bg-[200%_auto] text-3xl text-center text-transparent font-medium bg-clip-text",
        className
      )}
    >
      {children}
    </span>
  );
}
