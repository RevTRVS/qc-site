"use client";

import { useState } from "react";
import { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [views, setViews] = useState(product.views || 0);

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setViews(views + 1);
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: { [key: string]: string } = {
      "€": "€",
      "$": "$",
      "¥": "¥",
      "CNY": "¥",
    };
    return symbols[currency] || currency;
  };

  return (
    <div className="group rounded-2xl overflow-hidden border-2 border-green-500/30 hover:border-green-400 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 glow-box animate-slide-up relative">
      {/* Glowing background on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Image container */}
      <div className="relative h-48 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm">No image</div>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Badge */}
        <div className="absolute top-3 right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          ⭐ Featured
        </div>

        {/* Eye icon with view count */}
        <button
          onClick={handleViewClick}
          className="absolute bottom-3 right-3 flex items-center gap-2 bg-black/70 hover:bg-black/90 px-3 py-1.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 border border-green-500/50 hover:border-green-400"
        >
          <span className="text-lg">👁️</span>
          <span className="text-xs font-bold text-white">{views}</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-4 relative z-10">
        <div className="space-y-2 mb-4">
          <h3 className="font-black text-lg text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
            {product.name}
          </h3>
          <p className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent font-bold text-2xl">
            {getCurrencySymbol(product.currency)}
            {product.price}
          </p>
          {product.seller && (
            <p className="text-green-500/70 text-xs font-semibold uppercase tracking-wider">
              ✓ via {product.seller}
            </p>
          )}
        </div>

        <a
          href="#"
          className="w-full block text-center py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
        >
          View Product ↗
        </a>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
}
