import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { allGuides } from "contentlayer/generated";
import { ChevronLeft } from "lucide-react";

import { Mdx } from "~/components/content/mdx-components";
import MaxWidthWrapper from "~/components/shared/max-width-wrapper";
import { buttonVariants } from "~/components/ui/button";
import { siteConfig } from "~/config/site";
import "~/styles/mdx.css";
import { constructMetadata } from "~/utils/base";
import { cn } from "~/utils/tailwindcss";
import { getTableOfContents } from "~/utils/toc";

import { DocsPageHeader } from "../../_components/docs-page-header";
import { DashboardTableOfContents } from "../../_components/toc";

export async function generateStaticParams() {
  return allGuides.map((guide) => ({
    slug: guide.slugAsParams,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata | undefined> {
  const guide = allGuides.find((guide) => guide.slugAsParams === params.slug);
  if (!guide) {
    return;
  }

  const { title, description } = guide;

  return constructMetadata({
    title: `${title} - ${siteConfig.name}`,
    description: description,
  });
}

export default async function GuidePage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const guide = allGuides.find((guide) => guide.slugAsParams === params.slug);

  if (!guide) {
    notFound();
  }

  const toc = await getTableOfContents(guide.body.raw);

  return (
    <MaxWidthWrapper>
      <div className="relative py-6 lg:grid lg:grid-cols-[1fr_300px] lg:gap-10 lg:py-10 xl:gap-20">
        <div>
          <DocsPageHeader heading={guide.title} text={guide.description} />
          <Mdx code={guide.body.code} />
          <hr className="my-4" />
          <div className="flex justify-center py-6 lg:py-10">
            <Link
              href="/guides"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <ChevronLeft className="mr-2 size-4" />
              See all guides
            </Link>
          </div>
        </div>
        <div className="hidden text-sm lg:block">
          <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-10">
            <DashboardTableOfContents toc={toc} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
