export default function Hero() {
  return (
    <section className="pt-32 pb-20 text-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1s" }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-block mb-6 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/40 backdrop-blur animate-slide-up">
          <span className="text-sm font-bold text-green-400 uppercase tracking-wider">
            ✨ Welcome to RepMania
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Discover <span className="gradient-text animate-glow-pulse">Trending</span> Products
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Curated finds from Taobao, Weidian & agents. Quality verified. Shipped fast. Trusted sellers only.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <button className="btn-primary text-lg">
            Explore Now
          </button>
          <button className="btn-secondary text-lg">
            View Calculator
          </button>
        </div>
      </div>
    </section>
  );
}
