import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import Image from "next/image";

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	nav: {
		title: (
			<>
				<Image
					src="https://github.com/huakunshen.png"
					alt="avatar"
					width={24}
					height={24}
					className="rounded-full"
				/>
				HK Blog
			</>
		),
	},
	links: [
		{
			text: "Notes",
			url: "/docs",
			active: "nested-url",
		},
		{
			text: "Projects",
			url: "/projects",
			active: "nested-url",
		},
		{
			text: "Blog",
			url: "/blog",
			active: "nested-url",
		},
	],
};
