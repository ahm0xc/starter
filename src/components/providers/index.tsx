import type { PropsWithChildren } from "react";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "ui/sonner";

import Modals from "~/components/modals";
import { ThemeProvider } from "~/components/providers/theme-provider";
import { TailwindIndicator } from "~/components/tailwind-indicator";
import { TRPCReactProvider } from "~/trpc/react";

export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider>
      <TRPCReactProvider>
        <SessionProvider>
          {children} <Toaster richColors /> <TailwindIndicator /> <Modals />
        </SessionProvider>
      </TRPCReactProvider>
    </ThemeProvider>
  );
}
