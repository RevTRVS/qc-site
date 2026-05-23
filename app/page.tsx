import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import PromoCarousel from "@/app/components/PromoCarousel";
import ProductGrid from "@/app/components/ProductGrid";
import FAQ from "@/app/components/FAQ";
import Footer from "@/app/components/Footer";
import PopupAgent from "@/app/components/PopupAgent";
import { Product, FAQItem } from "@/app/types";

const FEATURED_PRODUCTS: Product[] = [

   {
    id: 1,
    name: "Air max 95",
    price: 45.57,
    currency: "€",
    seller: "Taobao",
    image: "https://i.imgur.com/y7oLysb.png",  // ← URL da imagem
    link: "https://weidian.com/item.html?itemID=7733312382",            // ← Link clicável
  },
  {
    id: 2,
    name: "AP x Swatch",
    price: 96.23,
    currency: "€",
    seller: "Taobao",
    image: "https://i.imgur.com/nN2bNOm.png",  // ← URL da imagem
    link: "https://weidian.com/item.html?itemID=7733312382",            // ← Link clicável
  },
    {
    id: 3,
    name: "Fashion Shirt",
    price: 5.55,
    currency: "€",
    seller: "Taobao",
    image: "https://i.imgur.com/rg4dWU4.png",  // ← URL da imagem
    link: "https://weidian.com/item.html?itemID=7733312382",            // ← Link clicável
  },

  {
    id: 4,
    name: "Summer style socks",
    price: 8.64,
    currency: "€",
    seller: "Taobao",
    image: "https://i.imgur.com/TNtodHy.png",  // ← URL da imagem
    link: "https://weidian.com/item.html?itemID=7733312382",            // ← Link clicável
  },
  {
    id: 6,
    name: "Fashion Accessory",
    price: 22,
    currency: "€",
    seller: "Agent",
  },
  {
    id: 7,
    name: "Elegant Belt",
    price: 28,
    currency: "€",
    seller: "Taobao",
  },
  {
    id: 8,
    name: "Stylish Sunglasses",
    price: 42,
    currency: "€",
    seller: "Weidian",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "What is NexaFinds?",
    answer:
      "NexaFinds is a curated discovery platform for finding trending products from global marketplaces like Taobao, Weidian, and verified agents.",
  },
  {
    id: 2,
    question: "Is it safe to buy through the agents?",
    answer:
      "Yes! We partner with trusted, verified agents. Always use secure payment methods and check seller ratings before purchasing.",
  },
  {
    id: 3,
    question: "How do affiliate links work?",
    answer:
      "When you purchase through our links, we may earn a small commission at no extra cost to you. This helps us maintain the platform.",
  },
  {
    id: 4,
    question: "How often are products updated?",
    answer:
      "Our product catalog is curated weekly to showcase the latest trending finds across all marketplaces.",
  },
  {
    id: 5,
    question: "Can I suggest products?",
    answer:
      "Absolutely! Join our Discord community to share product recommendations and connect with other enthusiasts.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PopupAgent />
      <Navbar />
      
      {/* Hero + Carousel Section */}
      <section className="pt-0 pb-12 px-6 relative overflow-visible">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            {/* Left Side - Logo & Content */}
            <div className="relative z-10 pt-20">
              <div className="inline-block mb-4 px-4 py-2 bg-green-500/20 rounded-full border border-green-500/40 backdrop-blur animate-slide-up">
                <span className="text-xs font-bold text-green-400 uppercase tracking-wider">
                  ✨ Welcome
                </span>
              </div>

              {/* Large Logo */}
              <div className="mb-8 animate-slide-up" style={{ animationDelay: "0.05s" }}>
                <img 
                  src="/NexaFindsLogo.png" 
                  alt="NexaFinds" 
                  className="h-48 w-auto transition-all duration-300 hover:scale-110"
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

            {/* Right Side - Carousel (Overlay Position) */}
            <div className="absolute top-64 right-24 w-full lg:w-1/3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="h-56">
                <PromoCarousel />
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "1s" }}></div>
      </section>

      <ProductGrid products={FEATURED_PRODUCTS} />
      <FAQ items={FAQ_ITEMS} />
      <Footer />
    </main>
  );
}