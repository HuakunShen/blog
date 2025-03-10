"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BlogCard({
  url,
  title,
  description,
  date,
  tags,
}: {
  url: string;
  title: string;
  description?: string;
  date: Date | string;
  tags?: string[];
}) {
  return (
    <Link
      href={url}
      className="block bg-fd-secondary rounded-lg shadow-md overflow-hidden p-6"
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      {date && (
        <p className="text-sm text-fd-muted-foreground">
          {new Date(date).toDateString()}
        </p>
      )}
      <div className="flex gap-2 mt-2 overflow-auto">
        {tags?.map((tag) => {
          return (
            <Button
              key={tag}
              variant="outline"
              size="sm"
              className="z-50"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("click tag");
              }}
            >
              {tag}
            </Button>
          );
        })}
      </div>
    </Link>
  );
}
