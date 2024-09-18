import { infos } from "~/config/landing";

import BentoGrid from "./_components/bento-grid";
import Features from "./_components/features";
import HeroLanding from "./_components/hero-landing";
import InfoLanding from "./_components/info-landing";
import Powered from "./_components/powered";
import PreviewLanding from "./_components/preview-landing";
import Testimonials from "./_components/testimonials";

export default async function HomePage() {
  return (
    <>
      <HeroLanding />
      <PreviewLanding />
      <Powered />
      <BentoGrid />
      <InfoLanding data={infos[0]!} reverse={true} />
      <InfoLanding data={infos[1]!} />
      <Features />
      <Testimonials />
    </>
  );
}
