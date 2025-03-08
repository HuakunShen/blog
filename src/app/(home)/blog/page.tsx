import Link from "next/link";
import { blog } from "@/lib/source";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  const posts = blog.getPages().sort((a, b) => {
    return new Date(b.data.date).getTime() - new Date(a.data.date).getTime();
  });

  return (
    <main className="grow container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.url}
            href={post.url}
            className="block bg-fd-secondary rounded-lg shadow-md overflow-hidden p-6"
          >
            <h2 className="text-xl font-semibold mb-2">{post.data.title}</h2>
            <p className="mb-4">{post.data.description}</p>
            <p className="text-sm text-fd-muted-foreground">
              {new Date(post.data.date).toDateString()}
            </p>
            <div className="flex gap-2 mt-2">
              {post.data.tags?.map((tag) => {
                return (
                  <Button key={tag} variant="outline" size="sm">
                    {tag}
                  </Button>
                );
              })}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
