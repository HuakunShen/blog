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
