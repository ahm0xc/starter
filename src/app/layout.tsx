import { type Metadata } from "next";

import { GeistSans } from "geist/font/sans";

import Providers from "~/components/providers";
import "~/styles/globals.css";
import { cn } from "~/utils/tailwindcss";

export const metadata: Metadata = {
  title: "Starter",
  description: "",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn("antialiased", GeistSans.variable)}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📦</text></svg>"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
