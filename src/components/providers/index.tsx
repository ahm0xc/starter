import type { PropsWithChildren } from "react";

import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";

import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <TRPCReactProvider>
      <ThemeProvider>
        {children} <Toaster />
      </ThemeProvider>
    </TRPCReactProvider>
  );
}
