"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface Seller {
  id: number;
  name: string;
  icon: string;
  rating: number;
  followers: number;
  minPrice: number;
  minPriceFormatted: string;
  image: string;
  products: number;
}

const SELLERS: Seller[] = [
  {
    id: 1,
    name: "Artistic Resear",
    icon: "🟠",
    rating: 4.0,
    followers: 180,
    minPrice: 4.99,
    minPriceFormatted: "€4.99",
    image: "🎨",
    products: 150,
  },
  {
    id: 2,
    name: "TMF",
    icon: "SellerIcon",
    rating: 4.0,
    followers: 291,
    minPrice: 1.9,
    minPriceFormatted: "€1.90",
    image: "🎪",
    products: 200,
  },
  {
    id: 3,
    name: "gustavo",
    icon: "images",
    rating: 4.5,
    followers: 450,
    minPrice: 3.19,
    minPriceFormatted: "€3.19",
    image: "👗",
    products: 300,
  },
  {
    id: 4,
    name: "Tech Store",
    icon: "🔵",
    rating: 4.2,
    followers: 380,
    minPrice: 5.99,
    minPriceFormatted: "€5.99",
    image: "💻",
    products: 250,
  },
  {
    id: 5,
    name: "Luxury Goods",
    icon: "💜",
    rating: 4.7,
    followers: 520,
    minPrice: 12.99,
    minPriceFormatted: "€12.99",
    image: "👜",
    products: 180,
  },
  {
    id: 6,
    name: "Sports Central",
    icon: "⚽",
    rating: 4.3,
    followers: 340,
    minPrice: 6.99,
    minPriceFormatted: "€6.99",
    image: "⚽",
    products: 220,
  },
];

const CATEGORIES = [
  "Popular",
  "Sellers",
];

const BROWSE_CATEGORIES = [
  { name: "Tops", icon: "👕" },
  { name: "Bottoms", icon: "👖" },
  { name: "Outerwear", icon: "🧥" },
  { name: "Shoes", icon: "👟" },
  { name: "Swim & Intimates", icon: "🩱" },
  { name: "Dresses & One-Pieces", icon: "👗" },
  { name: "Accessories", icon: "🎀" },
  { name: "Bags", icon: "👜" },
  { name: "Jewelry", icon: "💎" },
  { name: "Tech & Lifestyle", icon: "📱" },
  { name: "Toys & Adult", icon: "🎮" },
];

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Popular");
  const [selectedFilter, setSelectedFilter] = useState("Popular");

  const filteredSellers = SELLERS.filter((seller) =>
    seller.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Browse <span className="gradient-text">Sellers</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Discover verified sellers with the best deals and quality products
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-300 -z-10"></div>
            <div className="relative flex items-center bg-black border border-green-500/30 rounded-2xl px-6 py-4 hover:border-green-500/60 transition-colors">
              <svg className="w-6 h-6 text-green-400 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl p-6 border border-green-500/20 sticky top-32">
                <h3 className="text-lg font-black mb-6 gradient-text uppercase tracking-wider">
                  Browse
                </h3>
                
                {/* Main Categories */}
                <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
                    Categories
                  </h4>
                  <div className="space-y-2">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedFilter(category)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 font-semibold ${
                          selectedFilter === category
                            ? "bg-green-500/30 text-green-300 border border-green-500/50"
                            : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Type Categories - Removed clothing categories */}
                <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 tracking-wider">
                    Featured
                  </h4>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    <button className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:text-green-400 transition-colors duration-300 font-semibold hover:bg-white/5 flex items-center gap-2">
                      <span>⭐</span>
                      Top Rated Sellers
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:text-green-400 transition-colors duration-300 font-semibold hover:bg-white/5 flex items-center gap-2">
                      <span>🔥</span>
                      Trending Now
                    </button>
                    <button className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:text-green-400 transition-colors duration-300 font-semibold hover:bg-white/5 flex items-center gap-2">
                      <span>💰</span>
                      Best Deals
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content - Sellers Grid */}
            <div className="lg:col-span-3">
              {/* Filter tabs */}
              <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-green-500/20">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-green-500/30 text-green-300 border border-green-500/50"
                        : "text-gray-400 hover:text-gray-300 border border-gray-500/20 hover:border-gray-500/40"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sellers Grid */}
              {filteredSellers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSellers.map((seller) => (
                    <div
                      key={seller.id}
                      className="group glass-effect rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 border border-green-500/20 hover:shadow-lg hover:shadow-green-500/20"
                    >
                      {/* Seller Header */}
                      <div className="p-6 border-b border-green-500/10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500/40 to-emerald-500/20 flex items-center justify-center text-2xl">
                              {seller.icon}
                            </div>
                            <div>
                              <h3 className="font-black text-lg">{seller.name}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-yellow-400 font-bold">★ {seller.rating}</span>
                                <span className="text-gray-500 text-sm">
                                  • {seller.followers} followers
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-semibold text-gray-300 hover:text-white transition-all duration-300">
                          Follow
                        </button>
                      </div>

                      {/* Seller Info */}
                      <div className="p-6">
                        <div className="mb-4">
                          <p className="text-gray-400 text-sm mb-2">From {seller.minPriceFormatted}</p>
                          <p className="text-gray-500 text-xs">{seller.products} products</p>
                        </div>
                        <a
                          href="#"
                          className="inline-block px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg text-green-400 hover:text-green-300 hover:border-green-500/60 font-semibold transition-all duration-300"
                        >
                          View Store →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg">
                    No sellers found matching "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
