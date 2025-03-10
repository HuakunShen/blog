"use client";
import Link from "next/link";
import { blog } from "@/lib/source";
import Fuse from "fuse.js";
import BlogCard from "./BlogCard";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const posts = blog.getPages().sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  const fuse = new Fuse(posts, {
    includeScore: true,
    keys: ["data.title", "data.description", "data.tags"],
  });

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, []);

  const filteredPosts = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : posts;

  return (
    <main className="grow container mx-auto px-4 py-8 space-y-4">
      <h1 className="text-4xl font-bold">Latest Blog Posts</h1>
      <Input
        ref={searchInputRef}
        type="text"
        placeholder="Search, press / to focus"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <BlogCard
            key={post.url}
            url={post.url}
            title={post.data.title}
            description={post.data.description}
            date={post.data.date}
            tags={post.data.tags}
          />
        ))}
      </div>
    </main>
  );
}
