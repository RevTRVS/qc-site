"use client";

import { useState } from "react";
import { SpreadsheetProduct } from "@/app/types";

interface SpreadsheetProductItemProps {
  product: SpreadsheetProduct;
}

export default function SpreadsheetProductItem({
  product,
}: SpreadsheetProductItemProps) {
  const [likes, setLikes] = useState(product.likes || 0);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(product.views || 0);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setViews(views + 1);
  };

  return (
    <div className="group rounded-2xl overflow-hidden border-2 border-green-500/30 hover:border-green-400 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 glow-box relative bg-gradient-to-br from-gray-900 to-black">
      {/* Glowing background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      {/* Image container */}
      <div className="relative h-56 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-700"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* View & Like badges */}
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 bg-black/70 hover:bg-black/90 px-2 py-1 rounded-full transition-all duration-300 border border-green-500/50 hover:border-green-400 ${
              liked ? "text-red-500" : "text-gray-300"
            }`}
          >
            <span className="text-sm">{liked ? "❤️" : "🤍"}</span>
            <span className="text-xs font-bold">{likes}</span>
          </button>

          <button
            onClick={handleViewClick}
            className="flex items-center gap-1 bg-black/70 hover:bg-black/90 px-2 py-1 rounded-full transition-all duration-300 border border-green-500/50 hover:border-green-400 text-gray-300"
          >
            <span className="text-sm">👁️</span>
            <span className="text-xs font-bold">{views}</span>
          </button>
        </div>

        {/* Category badge */}
        {product.category && (
          <div className="absolute top-2 left-2 bg-green-500/20 border border-green-500/40 text-green-300 px-2 py-1 rounded-full text-xs font-bold">
            {product.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 relative z-10 space-y-2">
        {/* Title */}
        <h3 className="font-black text-sm text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        {/* Price */}
        <p className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent font-bold text-lg">
          {product.currency}
          {product.price}
        </p>

        {/* Seller */}
        <p className="text-green-500/70 text-xs font-semibold uppercase tracking-wider">
          ✓ via {product.seller}
        </p>

        {/* Link Button */}
        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block text-center py-2 px-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-sm font-bold rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 active:scale-95"
        >
          View Product ↗
        </a>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500"></div>
    </div>
  );
}
