import { AIChatDialog } from "@/components/ai-chat";
import { AuroraText } from "@/components/magicui/aurora-text";
import { cn } from "@/lib/cn";

export default function HomePage() {
	return (
		<main>
			<section className="flex flex-1 flex-col justify-center text-center min-h-screen">
				<div className="absolute text-center w-full">
					<h1 className="font-mono translate-y-[-100%] select-none text-4xl font-bold tracking-tighter md:text-5xl lg:text-7xl">
						Welcome to My World
					</h1>
				</div>
				<iframe
					className={cn("h-[90vh] max-w-full")}
					title="Git Skyline"
					src="https://git-skyline.huakun.tech/contribution/github/huakunshen/embed?enableZoom=true&autoRotate=true"
					width="100%"
					height="100%"
				/>
			</section>
			<section className="flex justify-center items-center my-10 min-h-96">
				<AIChatDialog className="w-96" />
			</section>
		</main>
	);
}
