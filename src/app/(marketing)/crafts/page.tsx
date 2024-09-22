import MaxWidthWrapper from "~/components/shared/max-width-wrapper";

import AllCrafts from "./_components/all-crafts";

export default function CraftsPage() {
  return (
    <div className="mt-10">
      <MaxWidthWrapper>
        <section>
          <div className="grid gap-1">
            <h1 className="font-heading text-2xl font-semibold">
              Browse Crafts
            </h1>
            <p className="text-base text-muted-foreground">
              All hand picked custom made UI components for faster, better,
              experience with designing.
            </p>
          </div>
          <div>
            <AllCrafts className="my-10" />
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}
