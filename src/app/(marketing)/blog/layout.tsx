import MaxWidthWrapper from "~/components/shared/max-width-wrapper";

import { BlogHeaderLayout } from "./_components/blog-page-header";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <BlogHeaderLayout />
      <MaxWidthWrapper className="pb-16">{children}</MaxWidthWrapper>
    </>
  );
}
