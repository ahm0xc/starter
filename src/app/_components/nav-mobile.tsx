"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { GithubLogo } from "@phosphor-icons/react";
import { Menu, X } from "lucide-react";
import { useSession } from "next-auth/react";

// import { DocsSidebarNav } from "~/components/docs/sidebar-nav";
import ThemeToggle from "~/components/theme-toggle";
import { docsConfig } from "~/config/docs";
import { marketingConfig } from "~/config/marketing";
import { siteConfig } from "~/config/site";
import { type NavItem } from "~/types";
import { cn } from "~/utils/tailwindcss";

export function NavMobile() {
  const [open, setOpen] = useState(false);

  const selectedLayout = useSelectedLayoutSegment();

  const { data: session } = useSession();

  const documentation = selectedLayout === "docs";

  const configMap = {
    docs: docsConfig.mainNav,
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const links =
    // @ts-expect-error ???
    (selectedLayout && configMap[selectedLayout]) ?? marketingConfig.mainNav;

  // prevent body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "fixed right-2 top-2.5 z-50 rounded-full p-2 transition-colors duration-200 hover:bg-muted focus:outline-none active:bg-muted md:hidden",
          open && "hover:bg-muted active:bg-muted"
        )}
      >
        {open ? (
          <X className="size-5 text-muted-foreground" />
        ) : (
          <Menu className="size-5 text-muted-foreground" />
        )}
      </button>

      <nav
        className={cn(
          "fixed inset-0 z-20 hidden w-full overflow-auto bg-background px-5 py-16 lg:hidden",
          open && "block"
        )}
      >
        <ul className="grid divide-y divide-muted">
          {links &&
            (links as NavItem[]).length > 0 &&
            (links as NavItem[]).map(({ title, href }) => (
              <li key={href} className="py-3">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  {title}
                </Link>
              </li>
            ))}

          {session ? (
            <>
              {session.user.role === "ADMIN" ? (
                <li className="py-3">
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex w-full font-medium capitalize"
                  >
                    Admin
                  </Link>
                </li>
              ) : null}

              <li className="py-3">
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="py-3">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  Login
                </Link>
              </li>

              <li className="py-3">
                <Link
                  href="/register"
                  onClick={() => setOpen(false)}
                  className="flex w-full font-medium capitalize"
                >
                  Sign up
                </Link>
              </li>
            </>
          )}
        </ul>

        {documentation ? (
          <div className="mt-8 block md:hidden">
            {/* <DocsSidebarNav setOpen={setOpen} /> */}
            {/* // TODO:  */}
            Docs sidebar nav
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-end space-x-4">
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <GithubLogo className="size-6" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ThemeToggle />
        </div>
      </nav>
    </>
  );
}
