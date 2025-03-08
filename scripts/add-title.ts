import { $ } from "bun";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { globSync } from "glob";
import matter from "gray-matter";

const DOCS_DIR = "content/docs/SystemDesign";

// Function to convert filename to title
function fileNameToTitle(fileName: string): string {
  return fileName
    .replace(/\.mdx?$/, "") // Remove .md or .mdx extension
    .split(/[-_]/) // Split by dash or underscore
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join with spaces
}

// Function to find first h1 in markdown content
function findFirstH1(content: string): string | null {
  const h1Match = content.match(/^#\s+(.+)$/m);
  return h1Match ? h1Match[1].trim() : null;
}

async function main() {
  // Find all .md and .mdx files
  const files = globSync("**/*.{md,mdx}", {
    cwd: DOCS_DIR,
    absolute: false,
  });

  for (const file of files) {
    const fullPath = join(DOCS_DIR, file);
    const content = readFileSync(fullPath, "utf-8");
    const { data, content: markdownContent } = matter(content);
    
    // Skip if title already exists in frontmatter
    if (data.title) {
      console.log(`✓ ${file} already has title: ${data.title}`);
      continue;
    }

    // Look for first h1
    const h1Title = findFirstH1(markdownContent);
    if (h1Title) {
      // Use h1 as title
      data.title = h1Title;
      console.log(`→ ${file}: Using H1 as title: ${h1Title}`);
    } else {
      // Use filename as title
      data.title = fileNameToTitle(file.split("/").pop()!);
      console.log(`+ ${file}: Generated title from filename: ${data.title}`);
    }

    // Write back to file
    const updatedContent = matter.stringify(markdownContent, data);
    writeFileSync(fullPath, updatedContent);
  }
}

main().catch(console.error);
