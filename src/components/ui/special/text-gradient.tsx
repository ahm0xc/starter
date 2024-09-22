import { type ReactNode } from "react";

import { cn } from "~/utils/tailwindcss";

export default function TextGradient({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-3xl font-semibold bg-gradient-to-b from-white to-neutral-700 text-transparent bg-clip-text",
        className
      )}
    >
      {children}
    </h1>
  );
}
