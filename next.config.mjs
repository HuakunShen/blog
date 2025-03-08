import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    domains: [
      "user-images.githubusercontent.com",
      "camo.githubusercontent.com",
      "cdn.hashnode.com",
    ],
  },
};

export default withMDX(config);
