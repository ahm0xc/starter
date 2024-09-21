import Link from "next/link";

import type { Doc } from "contentlayer/generated";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonVariants } from "ui/button";

import { docsConfig } from "~/config/docs";
import { cn } from "~/utils/tailwindcss";

interface DocsPagerProps {
  doc: Doc;
}

export function DocsPager({ doc }: DocsPagerProps) {
  const pager = getPagerForDoc(doc) as {
    prev: { href: string; title: string };
    next: { href: string; title: string };
  };

  if (!pager) {
    return null;
  }

  return (
    <div className="flex flex-row items-center justify-between">
      {pager?.prev && (
        <Link
          href={pager.prev.href}
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <ChevronLeft className="mr-2 size-4" />
          {pager.prev.title}
        </Link>
      )}
      {pager?.next && (
        <Link
          href={pager.next.href}
          className={cn(buttonVariants({ variant: "outline" }), "ml-auto")}
        >
          {pager.next.title}
          <ChevronRight className="ml-2 size-4" />
        </Link>
      )}
    </div>
  );
}

export function getPagerForDoc(doc: Doc) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const flattenedLinks = [null, ...flatten(docsConfig.sidebarNav), null] as {
    href: string;
  }[];
  const activeIndex = flattenedLinks.findIndex(
    (link) => doc.slug === link?.href
  );
  const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null;
  const next =
    activeIndex !== flattenedLinks.length - 1
      ? flattenedLinks[activeIndex + 1]
      : null;
  return {
    prev,
    next,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flatten(links: { items?: any }[]): any[] {
  return links.reduce((flat, link) => {
    // @ts-expect-error ???
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return flat.concat(link.items ? flatten(link.items) : link);
  }, []);
}
