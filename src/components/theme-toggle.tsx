"use client";

import { MoonStars, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

import { Button, type ButtonProps } from "~/components/ui/button";
import { useMounted } from "~/hooks/use-mounted";
import { cn } from "~/utils/tailwindcss";

export default function ThemeToggle({ className, ...props }: ButtonProps) {
  const { setTheme, theme } = useTheme();
  const isMounted = useMounted();

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  if (!isMounted) return;

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("", className)}
      onClick={toggleTheme}
      {...props}
    >
      {theme === "light" && <Sun size={17} />}
      {theme === "dark" && <MoonStars size={17} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
