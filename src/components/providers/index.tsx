import type { PropsWithChildren } from "react";

import { ThemeProvider } from "~/components/providers/theme-provider";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { Toaster } from "~/components/ui/sonner";
import { TRPCReactProvider } from "~/trpc/react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <TRPCReactProvider>
        {children} <Toaster richColors /> <TailwindIndicator />
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
