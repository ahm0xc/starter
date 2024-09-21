import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { allDocs } from "contentlayer/generated";

import { Mdx } from "~/components/content/mdx-components";
import { siteConfig } from "~/config/site";
import "~/styles/mdx.css";
import { constructMetadata, getBlurDataURL } from "~/utils/base";
import { getTableOfContents } from "~/utils/toc";

import { DocsPageHeader } from "../../_components/docs-page-header";
import { DocsPager } from "../../_components/docs-pager";
import { DashboardTableOfContents } from "../../_components/toc";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams(params: { slug: string[] }) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) return null;

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams(params);

  if (!doc) return {};

  const { title, description } = doc;

  return constructMetadata({
    title: `${title} – ${siteConfig.name}`,
    description,
  });
}

export async function generateStaticParams(): Promise<
  DocPageProps["params"][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const images = await Promise.all(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    doc.images.map(async (src: string) => ({
      src,
      blurDataURL: await getBlurDataURL(src),
    }))
  );

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <DocsPageHeader heading={doc.title} text={doc.description} />
        <div className="pb-4 pt-11">
          <Mdx
            code={doc.body.code}
            images={
              images as {
                alt: string;
                src: string;
                blurDataURL: string;
              }[]
            }
          />
        </div>
        <hr className="my-4 md:my-6" />
        <DocsPager doc={doc} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 max-h-[calc(var(--vh)-4rem)] overflow-y-auto pt-8">
          <DashboardTableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
