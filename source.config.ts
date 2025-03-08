import { defineCollections, frontmatterSchema } from "fumadocs-mdx/config";
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import { remarkMermaid } from "@theguild/remark-mermaid";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkMermaid],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});

export const blogPosts = defineCollections({
  type: "doc",
  dir: "content/blog",
  // add required frontmatter properties
  schema: frontmatterSchema.extend({
    author: z.string(),
    date: z.string().date().or(z.date()),
  }),
});
