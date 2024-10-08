"use client";

import { type ComponentPropsWithoutRef } from "react";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { cn } from "~/utils/tailwindcss";

export default function CardRevealedPointer({
  title,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { title: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  return (
    <div
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect();

        mouseX.set(e.clientX - left);
        mouseY.set(e.clientY - top);
      }}
      className={cn(
        "group relative max-w-[350px] w-full overflow-hidden rounded-xl bg-neutral-950",
        className
      )}
      {...props}
    >
      <div className="absolute right-5 top-0 h-px w-80 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent" />
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
						radial-gradient(200px circle at ${mouseX}px ${mouseY}px, rgba(38, 38, 38, 0.4), transparent 80%)
					`,
        }}
      />
      <div className="relative flex flex-col gap-3 rounded-xl border border-white/10 px-4 py-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-neutral-200">{title}</h3>
          <p className="text-sm leading-[1.5] text-neutral-400">{children}</p>
        </div>
      </div>
    </div>
  );
}
