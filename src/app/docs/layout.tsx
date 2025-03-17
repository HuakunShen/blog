import { DocsLayout, DocsLayoutProps } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { baseOptions } from "@/app/layout.config";
import { source } from "@/lib/source";
import { GithubInfo } from "fumadocs-ui/components/github-info";
import { RootToggle } from "fumadocs-ui/components/layout/root-toggle";
import { BookOpenIcon, Camera, CodeXmlIcon } from "lucide-react";

const docsOptions: DocsLayoutProps = {
  ...baseOptions,
  tree: source.pageTree,
  links: [
    {
      type: "custom",
      children: (
        <div className="px-2">
          <GithubInfo owner="HuakunShen" repo="blog" className="lg:-mx-2" />
        </div>
      ),
    },
    {
      type: "main",
      url: "/docs/projects",
      text: "Projects",
      icon: <CodeXmlIcon />,
    },
    {
      type: "main",
      url: "/blog",
      text: "Blog",
      icon: <BookOpenIcon />,
    },
    {
      type: "menu",
      text: "Working On",
      items: [
        {
          type: "main",
          url: "https://kunkun.sh",
          text: "Kunkun",
        },
      ],
    },
  ],
  sidebar: {
    // hideSearch: true,
  },
};

export default function Layout({ children }: { children: ReactNode }) {
  return <DocsLayout {...docsOptions}>{children}</DocsLayout>;
}
