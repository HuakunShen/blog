import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "user-images.githubusercontent.com" },
      { hostname: "camo.githubusercontent.com" },
      { hostname: "cdn.hashnode.com" },
      { hostname: "github.com" },
    ],
  },
};

export default withMDX(config);
