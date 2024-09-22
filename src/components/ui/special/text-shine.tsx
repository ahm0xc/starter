import { type ReactNode } from "react";

import { cn } from "~/utils/tailwindcss";

export default function TextShine({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h1
      className={cn(
        "text-3xl font-medium inline-flex animate-shine bg-[linear-gradient(110deg,#939393,45%,#1e2631,55%,#939393)] bg-[length:200%_100%] text-transparent bg-clip-text",
        className
      )}
    >
      {children}
    </h1>
  );
}
