export default function Footer() {
  const socialLinks = [
    { icon: "𝕏", href: "https://twitter.com", label: "Twitter" },
    { icon: "📸", href: "https://instagram.com", label: "Instagram" },
    { icon: "🎵", href: "https://tiktok.com", label: "TikTok" },
    { icon: "▶️", href: "https://youtube.com", label: "YouTube" },
  ];

  return (
    <footer className="relative mt-32 py-20 border-t border-white/10">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-white/10">
          <div className="animate-slide-up">
            <h3 className="text-2xl font-black mb-3">
              Nexa<span className="gradient-text">Finds</span>
            </h3>
            <p className="text-gray-400 max-w-xs">
              Your platform for discovering curated products from global marketplaces with quality assurance.
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
            <h4 className="font-black mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              {["Products", "FAQ", "Best Sellers", "Discord"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 hover:translate-x-1 inline-block"
                  >
                    → {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <h4 className="font-black mb-4 text-lg">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={link.label}
                  className="text-3xl hover:text-green-400 hover:scale-125 transition-all duration-300 hover:drop-shadow-lg"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4 animate-fade-in">
          <p className="text-gray-600 text-xs">
            © 2026 NexaFinds. Contains affiliate links. Not affiliated with Taobao, Weidian, or their parent companies.
          </p>
          <div className="flex gap-6 text-xs text-gray-600">
            <a href="#" className="hover:text-green-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
