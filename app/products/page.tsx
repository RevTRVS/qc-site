"use client";

import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  seller: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { id: "1", name: "Tops", icon: "👕" },
  { id: "2", name: "Bottoms", icon: "👖" },
  { id: "3", name: "Outerwear", icon: "🧥" },
  { id: "4", name: "Shoes", icon: "👟" },
  { id: "5", name: "Swim & Intimates", icon: "🩱" },
  { id: "6", name: "Dresses & One-Pieces", icon: "👗" },
  { id: "7", name: "Accessories", icon: "🎀" },
  { id: "8", name: "Bags", icon: "👜" },
  { id: "9", name: "Jewelry", icon: "💎" },
  { id: "10", name: "Tech & Lifestyle", icon: "📱" },
  { id: "11", name: "Toys & Adult", icon: "🎮" },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod_1",
    name: "Premium Designer Bag",
    price: 45,
    currency: "€",
    image: "https://i.imgur.com/RxCmWDb.jpg",
    category: "Bags",
    seller: "Taobao",
  },
  {
    id: "prod_2",
    name: "Classic White Beanie",
    price: 12,
    currency: "€",
    image: "https://i.imgur.com/kVSxKjb.jpg",
    category: "Accessories",
    seller: "Agent",
  },
  {
    id: "prod_3",
    name: "Luxury Backpack",
    price: 89,
    currency: "€",
    image: "https://i.imgur.com/EqN4A8e.jpg",
    category: "Bags",
    seller: "Weidian",
  },
  {
    id: "prod_4",
    name: "Stylish Belt",
    price: 28,
    currency: "€",
    image: "https://i.imgur.com/vJ3XkDY.jpg",
    category: "Accessories",
    seller: "Taobao",
  },
  {
    id: "prod_5",
    name: "Premium Accessories Set",
    price: 35,
    currency: "€",
    image: "https://i.imgur.com/h8Nm7pJ.jpg",
    category: "Accessories",
    seller: "Agent",
  },
  {
    id: "prod_6",
    name: "Winter Cap Collection",
    price: 22,
    currency: "€",
    image: "https://i.imgur.com/q9PqFkL.jpg",
    category: "Accessories",
    seller: "Taobao",
  },
  {
    id: "prod_7",
    name: "Branded Jacket",
    price: 156,
    currency: "€",
    image: "https://i.imgur.com/Z1Vc2mK.jpg",
    category: "Outerwear",
    seller: "Weidian",
  },
  {
    id: "prod_8",
    name: "Designer Sunglasses",
    price: 42,
    currency: "€",
    image: "https://i.imgur.com/A5zJkBm.jpg",
    category: "Accessories",
    seller: "Agent",
  },
  {
    id: "prod_9",
    name: "Designer T-Shirt",
    price: 18,
    currency: "€",
    image: "https://i.imgur.com/A5zJkBm.jpg",
    category: "Tops",
    seller: "Taobao",
  },
  {
    id: "prod_10",
    name: "Nike Air Max",
    price: 65,
    currency: "€",
    image: "https://i.imgur.com/A5zJkBm.jpg",
    category: "Shoes",
    seller: "Weidian",
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currency, setCurrency] = useState<"€" | "$" | "£">("€");
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  const exchangeRates: { [key in "€" | "$" | "£"]: number } = {
    "€": 1,
    "$": 1.08,
    "£": 0.86,
  };

  const convertPrice = (price: number) => {
    return Math.round(price * exchangeRates[currency]);
  };

  useEffect(() => {
    let filtered = MOCK_PRODUCTS;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setProducts(filtered);
  }, [selectedCategory, searchTerm]);

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-black mb-4">
              Discover <span className="gradient-text">Products</span>
            </h1>
            <p className="text-gray-400 text-lg">
              Curated finds from Taobao, Weidian & verified agents
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-12 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition duration-300 -z-10"></div>
            <div className="relative flex items-center bg-black border border-green-500/30 rounded-2xl px-6 py-4 hover:border-green-500/60 transition-colors">
              <svg
                className="w-6 h-6 text-green-400 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 focus:outline-none text-lg"
              />
            </div>
          </div>

          {/* Currency Selector */}
          <div className="mb-12 flex gap-3 items-center">
            <span className="text-sm font-semibold text-gray-400 dark:text-gray-400">Currency:</span>
            <div className="flex gap-2">
              {(["€", "$", "£"] as const).map((curr) => (
                <button
                  key={curr}
                  onClick={() => setCurrency(curr)}
                  className={`px-4 py-2 rounded-lg font-bold transition-all duration-300 ${
                    currency === curr
                      ? "bg-green-500/30 text-green-300 border border-green-500/50"
                      : "bg-white/10 text-gray-400 hover:text-gray-300 border border-white/20 hover:bg-white/20"
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <div className="glass-effect rounded-2xl p-6 border border-green-500/20 sticky top-32 max-h-96 overflow-y-auto">
                <h3 className="text-lg font-black mb-6 gradient-text uppercase tracking-wider">
                  Categories
                </h3>

                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center gap-3 ${
                      selectedCategory === null
                        ? "bg-green-500/30 text-green-300 border border-green-500/50"
                        : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
                    }`}
                  >
                    <span>🏠</span>
                    All Products
                  </button>

                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center gap-3 ${
                        selectedCategory === category.name
                          ? "bg-green-500/30 text-green-300 border border-green-500/50"
                          : "text-gray-400 hover:text-gray-300 hover:bg-white/5"
                      }`}
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Main Content - Products Grid */}
            <div className="lg:col-span-4">
              {products.length > 0 ? (
                <div>
                  <p className="text-gray-400 mb-6 text-sm">
                    Showing {products.length} product
                    {products.length !== 1 ? "s" : ""}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="group glass-effect rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300 border border-green-500/20 hover:shadow-lg hover:shadow-green-500/20"
                      >
                        {/* Product Image */}
                        <div className="h-48 bg-gradient-to-br from-green-500/10 to-emerald-500/10 flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                            📦
                          </div>
                          <div className="absolute top-3 right-3 bg-green-500/80 px-3 py-1 rounded-full text-xs font-bold text-white">
                            {product.seller}
                          </div>
                        </div>

                        {/* Product Info */}
                        <div className="p-4">
                          <h3 className="font-black text-lg mb-2 line-clamp-2 group-hover:text-green-400 transition-colors">
                            {product.name}
                          </h3>

                          <div className="flex items-center justify-between mb-4">
                            <span className="text-2xl font-black gradient-text">
                              {currency}
                              {convertPrice(product.price)}
                            </span>
                            <span className="text-xs bg-white/10 px-2 py-1 rounded text-gray-300">
                              {product.category}
                            </span>
                          </div>

                          <div className="flex gap-2">
                            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg text-green-400 hover:text-green-300 hover:border-green-500/60 font-semibold transition-all duration-300 text-sm">
                              View
                            </button>
                            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-lg text-blue-400 hover:text-blue-300 hover:border-blue-500/60 font-semibold transition-all duration-300 text-sm">
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-gray-400 text-lg mb-4">
                    No products found
                  </p>
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 hover:text-green-300 font-semibold transition-all duration-300"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
