import MaxWidthWrapper from "~/components/shared/max-width-wrapper";
import ThemeToggle from "~/components/theme-toggle";
import requireAuth from "~/lib/auth/require-auth";

import {
  DashboardSidebar,
  MobileSheetSidebar,
} from "./_components/dashboard-sidebar";
import { SearchCommand } from "./_components/search-command";
import { UserAccountNav } from "./_components/user-account-nav";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const session = await requireAuth();

  return (
    <div className="relative flex min-h-screen w-full">
      <DashboardSidebar role={session.user.role} />

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-50 flex h-14 bg-background px-4 lg:h-[60px] xl:px-8">
          <MaxWidthWrapper className="flex max-w-7xl items-center gap-x-3 px-0">
            <MobileSheetSidebar role={session.user.role} />

            <div className="w-full flex-1">
              <SearchCommand role={session.user.role} />
            </div>

            <ThemeToggle className="rounded-full h-9 w-9" />
            <UserAccountNav />
          </MaxWidthWrapper>
        </header>

        <main className="flex-1 p-4 xl:px-8">
          <MaxWidthWrapper className="flex h-full max-w-7xl flex-col gap-4 px-0 lg:gap-6">
            {children}
          </MaxWidthWrapper>
        </main>
      </div>
    </div>
  );
}
