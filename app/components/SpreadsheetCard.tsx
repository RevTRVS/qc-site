"use client";

import { useState } from "react";
import Link from "next/link";
import { Spreadsheet } from "@/app/types";

interface SpreadsheetCardProps {
  spreadsheet: Spreadsheet;
}

export default function SpreadsheetCard({ spreadsheet }: SpreadsheetCardProps) {
  const [likes, setLikes] = useState(spreadsheet.likes);
  const [liked, setLiked] = useState(false);
  const [views, setViews] = useState(spreadsheet.views);

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
    <Link href={`/spreadsheets/${spreadsheet.id}`}>
      <div className="group rounded-2xl overflow-hidden border-2 border-green-500/30 hover:border-green-400 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-105 glow-box animate-slide-up relative bg-gradient-to-br from-gray-900 to-black cursor-pointer">
        {/* Glowing background on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

        {/* Image container */}
        <div className="relative h-64 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] overflow-hidden">
          {spreadsheet.thumbnail ? (
            <img
              src={spreadsheet.thumbnail}
              alt={spreadsheet.title}
              className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-600 text-sm bg-gradient-to-br from-green-500/10 to-emerald-500/5">
              No thumbnail
            </div>
          )}
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Trending Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-black px-3 py-1 rounded-full text-xs font-bold">
            🔥 Trending
          </div>

          {/* Category Badge */}
          {spreadsheet.category && (
            <div className="absolute top-3 right-3 bg-green-500/20 border border-green-500/40 text-green-300 px-3 py-1 rounded-full text-xs font-bold">
              {spreadsheet.category}
            </div>
          )}

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
        <div className="p-4 relative z-10 space-y-3">
          {/* Author Info */}
          <div className="flex items-center gap-2">
            {spreadsheet.authorAvatar && (
              <img
                src={spreadsheet.authorAvatar}
                alt={spreadsheet.author}
                className="w-8 h-8 rounded-full object-cover border border-green-500/30"
              />
            )}
            <div>
              <p className="text-xs text-gray-400">by</p>
              <p className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">
                {spreadsheet.author}
              </p>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-black text-lg text-white group-hover:text-green-400 transition-colors duration-300 line-clamp-2">
            {spreadsheet.title}
          </h3>

          {/* Description */}
          {spreadsheet.description && (
            <p className="text-sm text-gray-400 line-clamp-2">
              {spreadsheet.description}
            </p>
          )}

          {/* Engagement Metrics */}
          <div className="flex items-center justify-between pt-2 border-t border-green-500/20">
            <div className="flex gap-4">
              {/* Likes */}
              <button
                onClick={handleLike}
                className={`flex items-center gap-2 transition-all duration-300 ${
                  liked
                    ? "text-red-500 scale-110"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                <span className="text-lg">{liked ? "♥" : "♡"}</span>
                <span className="text-xs font-bold">{likes}</span>
              </button>

              {/* Views */}
              <div className="flex items-center gap-2 text-gray-400">
                <span className="text-lg">👁️</span>
                <span className="text-xs font-bold">{views}</span>
              </div>

              {/* Shares */}
              {spreadsheet.shares !== undefined && (
                <button className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors">
                  <span className="text-lg">🔗</span>
                  <span className="text-xs font-bold">{spreadsheet.shares}</span>
                </button>
              )}
            </div>

            {/* View Button */}
            <button className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-sm font-bold rounded-lg hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/50 active:scale-95">
              View ↗
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500"></div>
      </div>
    </Link>
  );
}
