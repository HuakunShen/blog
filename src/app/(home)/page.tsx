import { cn } from "@/lib/cn";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col justify-center text-center">
      <div className="absolute text-center w-full">
        <h1 className="font-mono text-5xl font-bold translate-y-[-100%] select-none">
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
    </main>
  );
}
