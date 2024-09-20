import MaxWidthWrapper from "~/components/shared/max-width-wrapper";

import { Footer } from "../_components/footer";
import { NavMobile } from "../_components/nav-mobile";
import { NavBar } from "../_components/navbar";

interface DocsLayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex flex-col">
      <NavMobile />
      <NavBar />
      <MaxWidthWrapper className="min-h-screen" large>
        {children}
      </MaxWidthWrapper>
      <Footer className="border-t" />
    </div>
  );
}
