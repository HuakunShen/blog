import { notFound } from "next/navigation";
import Link from "next/link";
import { InlineTOC } from "fumadocs-ui/components/inline-toc";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { blog } from "@/lib/source";
import { Button } from "@/components/ui/button";
import { Rate } from "@/components/rate";
import posthog from "posthog-js";

export default async function Page(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const page = blog.getPage([params.slug]);

	if (!page) notFound();
	const Mdx = page.data.body;

	return (
		<>
			<div className="container rounded-xl border py-12 md:px-8">
				<h1 className="mb-2 text-3xl font-bold">{page.data.title}</h1>
				<p className="mb-4 text-fd-muted-foreground">{page.data.description}</p>
				<Link href="/blog" className="cursor-pointer">
					<Button>Back</Button>
				</Link>
			</div>
			<article className="container flex flex-col px-4 py-8">
				<div className="flex flex-col md:flex-row gap-8">
					<div className="flex flex-col gap-4 text-sm md:w-48 md:shrink-0">
						<div>
							<p className="mb-1 text-fd-muted-foreground">Written by</p>
							<p className="font-medium">{page.data.author}</p>
						</div>
						<div>
							<p className="mb-1 text-sm text-fd-muted-foreground">At</p>
							<p className="font-medium">
								{new Date(page.data.date).toDateString()}
							</p>
						</div>
						<InlineTOC className="sticky top-20" items={page.data.toc} />
					</div>
					<div className="prose min-w-0 flex-1">
						{/* <InlineTOC items={page.data.toc} /> */}
						<Mdx components={defaultMdxComponents} />
						<Rate
							onRateAction={async (url, feedback) => {
								"use server";
								console.log(url, feedback);
								await posthog.capture("on_rate_docs", feedback);
							}}
						/>
					</div>
				</div>
			</article>
		</>
	);
}

export function generateStaticParams(): { slug: string }[] {
	return blog.getPages().map((page) => ({
		slug: page.slugs[0],
	}));
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}) {
	const params = await props.params;
	const page = blog.getPage([params.slug]);

	if (!page) notFound();

	return {
		title: page.data.title,
		description: page.data.description,
	};
}
