import { constructMetadata } from "~/utils/base";

import { DashboardHeader } from "../../_components/dashboard-header";
import { AreaChartStacked } from "./_components/charts/area-chart-stacked";
import { BarChartMixed } from "./_components/charts/bar-chart-mixed";
import { InteractiveBarChart } from "./_components/charts/interactive-bar-chart";
import { LineChartMultiple } from "./_components/charts/line-chart-multiple";
import { RadarChartSimple } from "./_components/charts/radar-chart-simple";
import { RadialChartGrid } from "./_components/charts/radial-chart-grid";
import { RadialShapeChart } from "./_components/charts/radial-shape-chart";
import { RadialStackedChart } from "./_components/charts/radial-stacked-chart";
import { RadialTextChart } from "./_components/charts/radial-text-chart";

export const metadata = constructMetadata({
  title: "Charts – SaaS Starter",
  description: "List of charts by shadcn-ui",
});

export default function ChartsPage() {
  return (
    <>
      <DashboardHeader heading="Charts" text="List of charts by shadcn-ui." />
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialTextChart />
          <AreaChartStacked />
          <BarChartMixed />
          <RadarChartSimple />
        </div>

        <InteractiveBarChart />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          <RadialChartGrid />
          <RadialShapeChart />
          <LineChartMultiple />
          <RadialStackedChart />
        </div>
      </div>
    </>
  );
}
