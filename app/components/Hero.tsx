export default function Hero() {
  return (
    <section className="pt-20 pb-12 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Side - Logo & Content */}
          <div className="relative z-10">
            {/* Large Logo */}
            <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
              <img 
                src="/NexaFindsLogo.png" 
                alt="NexaFinds" 
                className="h-40 w-auto transition-all duration-300 hover:scale-110"
              />
            </div>

            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl animate-slide-up" style={{ animationDelay: "0.2s" }}>
              Curated finds from Taobao, Weidian & agents. Quality verified. Shipped fast.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300 -z-10"></div>
                <a href="/products" className="relative block px-6 py-3 bg-black rounded-lg text-base font-bold text-green-400 hover:text-white transition-all duration-300 border border-green-500/50 hover:border-green-400">
                  ✨ Explore Products
                </a>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition duration-300 -z-10"></div>
                <button className="relative px-6 py-3 bg-black rounded-lg text-base font-bold text-gray-300 hover:text-white transition-all duration-300 border border-gray-500/30 hover:border-gray-400/60 hover:scale-105">
                  📊 Calculator
                </button>
              </div>
            </div>
          </div>

          {/* Right Side - Carousel Import */}
          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            {/* Placeholder - PromoCarousel será importada dinamicamente */}
            <div className="text-sm text-gray-400 text-center">Carousel component will render here</div>
          </div>
        </div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1s" }}></div>
    </section>
  );
}
