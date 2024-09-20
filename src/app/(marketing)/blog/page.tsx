import { allPosts } from "contentlayer/generated";

import { BlogPosts } from "~/components/content/blog-posts";
import { siteConfig } from "~/config/site";
import { constructMetadata, getBlurDataURL } from "~/utils/base";

export const metadata = constructMetadata({
  title: `Blog – ${siteConfig.name}`,
  description: "Latest news and updates from Next SaaS Starter.",
});

export default async function BlogPage() {
  const posts = await Promise.all(
    allPosts
      .filter((post) => post.published)
      .sort((a, b) => b.date.localeCompare(a.date))
      .map(async (post) => ({
        ...post,
        blurDataURL: await getBlurDataURL(post.image),
      }))
  );

  return <BlogPosts posts={posts} />;
}
