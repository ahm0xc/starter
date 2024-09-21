"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { ArrowRight, GithubLogo, MagnifyingGlass } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";
import { Button } from "ui/button";
import { Skeleton } from "ui/skeleton";

import { useModalsStore } from "~/components/modals";
import AuthModal, { AuthModalId } from "~/components/modals/auth-modal";
import { Icons } from "~/components/shared/icons";
import MaxWidthWrapper from "~/components/shared/max-width-wrapper";
import { docsConfig } from "~/config/docs";
import { marketingConfig } from "~/config/marketing";
import { siteConfig } from "~/config/site";
import { useScroll } from "~/hooks/use-scroll";
import { cn } from "~/utils/tailwindcss";

interface NavBarProps {
  scroll?: boolean;
  large?: boolean;
}

export function NavBar({ scroll = false }: NavBarProps) {
  const scrolled = useScroll(50);
  const { open: openModal } = useModalsStore();

  const { data: session, status } = useSession();
  const selectedLayout = useSelectedLayoutSegment();

  const documentation = selectedLayout === "docs";

  function openAuthModal() {
    openModal({ id: AuthModalId, children: <AuthModal /> });
  }

  const configMap = {
    docs: docsConfig.mainNav,
  };

  const links =
    (selectedLayout && configMap[selectedLayout as keyof typeof configMap]) ??
    marketingConfig.mainNav;

  return (
    <header
      className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
        scroll ? (scrolled ? "border-b" : "bg-transparent") : "border-b"
      }`}
    >
      <MaxWidthWrapper
        className="flex h-14 items-center justify-between py-4"
        large={documentation}
      >
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-1.5">
            <Icons.logo />
            <span className="font-urban text-xl font-bold">
              {siteConfig.name}
            </span>
          </Link>

          {links && links.length > 0 ? (
            <nav className="hidden gap-6 md:flex">
              {links.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  prefetch={true}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${selectedLayout}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}
        </div>

        <div className="flex items-center space-x-3">
          {/* right header for docs */}
          {documentation ? (
            <div className="hidden flex-1 items-center space-x-4 sm:justify-end lg:flex">
              <div className="hidden lg:flex lg:grow-0">
                {/* <DocsSearch /> */}
                {/* // TODO:  */}
                Docs search
              </div>
              <div className="flex lg:hidden">
                <MagnifyingGlass className="size-6 text-muted-foreground" />
              </div>
              <div className="flex space-x-4">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubLogo className="size-7" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          ) : null}

          {session ? (
            <Link href="/dashboard" className="hidden md:block">
              <Button
                className="gap-2 px-5 rounded-full"
                variant="default"
                size="sm"
              >
                <span>Dashboard</span>
              </Button>
            </Link>
          ) : status === "unauthenticated" ? (
            <Button
              className="hidden gap-2 px-5 md:flex rounded-full"
              variant="default"
              size="sm"
              onClick={openAuthModal}
            >
              <span>Sign In</span>
              <ArrowRight className="size-4" />
            </Button>
          ) : (
            <Skeleton className="hidden h-9 w-28 rounded-full lg:flex" />
          )}
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
