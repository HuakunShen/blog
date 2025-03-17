import "./global.css";
import { RootProvider } from "fumadocs-ui/provider";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "katex/dist/katex.css";
import { PostHogProvider } from "./providers";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <script defer src="https://assets.onedollarstats.com/stonks.js" />
        <script
          defer
          src="https://umami.huakunshen.com/script.js"
          data-website-id="5f689e8f-f6b4-4c01-8415-6f92a226f4ff"
        ></script>
        <script
          defer
          src="https://umami.huakunshen.com/script.js"
          data-website-id="d0cce429-8e45-4ad0-b028-2362f99cf1eb"
        ></script>
      </head>
      <body className="flex flex-col min-h-screen">
        <PostHogProvider>
          <RootProvider
            search={{
              links: [
                ["Home", "/"],
                ["Docs", "/docs"],
                ["Projects", "/projects"],
                ["Blog", "/blog"],
              ],
            }}
          >
            {children}
          </RootProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
