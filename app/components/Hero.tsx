export default function Hero() {
  return (
    <section className="pt-32 pb-20 text-center px-6 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1s" }}></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-block mb-6 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/40 backdrop-blur animate-slide-up">
          <span className="text-sm font-bold text-green-400 uppercase tracking-wider">
            ✨ Welcome to NexaFinds
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
          Discover <span className="gradient-text animate-glow-pulse">Trending</span> Products
        </h1>

        <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.2s" }}>
          Curated finds from Taobao, Weidian & agents. Quality verified. Shipped fast. Trusted sellers only.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300 -z-10"></div>
            <a href="/products" className="relative block px-8 py-4 bg-black rounded-xl text-lg font-black text-green-400 hover:text-white transition-all duration-300 border border-green-500/50 hover:border-green-400">
              ✨ Explore Now
            </a>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300 -z-10"></div>
            <button className="relative px-8 py-4 bg-black rounded-xl text-lg font-black text-gray-300 hover:text-white transition-all duration-300 border border-gray-500/30 hover:border-gray-400/60 hover:scale-105">
              📊 View Calculator
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
