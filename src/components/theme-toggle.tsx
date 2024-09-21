"use client";

import { MoonStars, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

import { Button } from "~/components/ui/button";
import { useMounted } from "~/hooks/use-mounted";

export default function ThemeToggle() {
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
      className="h-9 w-9"
      onClick={toggleTheme}
    >
      {/* <Sun className="size-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" /> */}
      {/* <Moon className="absolute size-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" /> */}
      {theme === "light" && <Sun size={17} />}
      {theme === "dark" && <MoonStars size={17} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
