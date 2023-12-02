import { cleanAndTransformBlocks } from "@/utils/cleanAndTransformBlocks";

import { getPageData } from "@/utils/getPageData";
import { BlockRenderer } from "@/components/BlockRenderer";
import { notFound } from "next/navigation";

export default async function Home({ params }) {
  console.log(params);
  const slug = params?.slug[0];

  const content = await getPageData(slug);
  const uncleanBlocks = content?.data?.nodeByUri?.blocks;

  if (!uncleanBlocks) {
    return notFound();
  }

  const blocks = cleanAndTransformBlocks(uncleanBlocks);

  return (
    <div className="relative container mx-auto px-5 md:px-16 py-4 md:py-8 lg:py-16">
      <main>
        <BlockRenderer blocks={blocks} />
      </main>
    </div>
  );
}
