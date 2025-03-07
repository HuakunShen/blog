export default function IndexPage() {
  return (
    <main>
      <div className="text-center h-[98vh]">
        <div className="m-0 absolute top-[30%] font-mono w-full space-y-4">
          <h1 className="font-bold text-6xl">
            <a href="/docs">Welcome To Huakun's World</a>
          </h1>
          <a href="/docs" className="bg-slate-100/30 text-2xl p-3 rounded-lg">Get Started</a>
        </div>
        <iframe
          v-show="iframeLoaded"
          src="https://git-skyline.huakun.tech/contribution/github/huakunshen/embed?enableZoom=false&autoRotate=true"
          className="w-full h-full"
        ></iframe>
      </div>
    </main>
  );
}
