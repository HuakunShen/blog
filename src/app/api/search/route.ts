import { source, blog } from "@/lib/source";
import { createFromSource, createSearchAPI } from "fumadocs-core/search/server";

// export const { GET } = createFromSource(source);

function getIndexes(src: typeof source | typeof blog) {
  return src.getPages().map((page) => ({
    title: page.data.title,
    description: page.data.description,
    url: page.url,
    id: page.url,
    structuredData: page.data.structuredData,
  }));
}

export const { GET } = createSearchAPI("advanced", {
  indexes: [...getIndexes(source), ...getIndexes(blog)],
});
