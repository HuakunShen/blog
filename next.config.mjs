import nextra from "nextra";

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false,
  },
  latex: true,
  contentDirBasePath: "/docs",
});

export default withNextra({
  reactStrictMode: true,
});
