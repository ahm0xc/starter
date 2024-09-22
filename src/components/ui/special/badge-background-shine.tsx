import { type ComponentPropsWithoutRef } from "react";

import { cn } from "~/utils/tailwindcss";

export default function BadgeBackgroundShine({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "inline-flex animate-shine items-center justify-center rounded-full text-xs border border-neutral-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 py-1 font-medium text-neutral-400 transition-colors",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
