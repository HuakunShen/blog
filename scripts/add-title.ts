import { $ } from "bun";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { globSync } from "glob";
import matter from "gray-matter";

const DOCS_DIR = "content/docs/Languages";

// Function to convert filename to title
function fileNameToTitle(fileName: string): string {
  return fileName
    .replace(/\.mdx?$/, "") // Remove .md or .mdx extension
    .split(/[-_]/) // Split by dash or underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter
    .join(" "); // Join with spaces
}

// Function to find and remove first h1 in markdown content
function findAndRemoveFirstH1(content: string): { title: string | null; content: string } {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (!h1Match) {
    return { title: null, content };
  }
  
  const title = h1Match[1].trim();
  // Remove the H1 line and any following empty lines
  const updatedContent = content
    .replace(/^#\s+.+\n+/, '')
    .replace(/^\n+/, ''); // Clean up any remaining empty lines at the start
    
  return { title, content: updatedContent };
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

    // Look for first h1 and remove it if found
    const { title: h1Title, content: updatedMarkdown } = findAndRemoveFirstH1(markdownContent);
    if (h1Title) {
      // Use h1 as title
      data.title = h1Title;
      console.log(`→ ${file}: Using H1 as title: ${h1Title} (removed from content)`);
    } else {
      // Use filename as title
      data.title = fileNameToTitle(file.split("/").pop()!);
      console.log(`+ ${file}: Generated title from filename: ${data.title}`);
    }

    // Write back to file with updated content
    const updatedContent = matter.stringify(h1Title ? updatedMarkdown : markdownContent, data);
    writeFileSync(fullPath, updatedContent);
  }
}

main().catch(console.error);
