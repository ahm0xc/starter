import { Footer } from "../_components/footer";
import { NavMobile } from "../_components/nav-mobile";
import { NavBar } from "../_components/navbar";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <NavMobile />
      <NavBar scroll={true} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
