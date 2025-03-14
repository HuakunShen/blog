import { blogPosts, docs, projects as _projects } from "@/.source";
import { loader } from "fumadocs-core/source";
import { createMDXSource } from "fumadocs-mdx";

export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});

export const projects = loader({
  baseUrl: "/projects",
  source: _projects.toFumadocsSource(),
});

console.log("_projects.toFumadocsSource()", _projects.toFumadocsSource().files);

export const blog = loader({
  baseUrl: "/blog",
  source: createMDXSource(blogPosts),
});
