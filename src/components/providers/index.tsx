import type { PropsWithChildren } from "react";

import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <TRPCReactProvider>
        {children} <Toaster /> <TailwindIndicator />
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
