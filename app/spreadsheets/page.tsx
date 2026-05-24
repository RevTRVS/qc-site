"use client";

import { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SpreadsheetGrid from "@/app/components/SpreadsheetGrid";
import CreateSpreadsheetModal from "@/app/components/CreateSpreadsheetModal";
import { Spreadsheet } from "@/app/types";

// Mock data
const INITIAL_SPREADSHEETS: Spreadsheet[] = [
  {
    id: 1,
    title: "Hidden Gems",
    author: "Towy",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    description: "Curated rare finds and lesser-known brands with amazing quality and price.",
    thumbnail: "https://i.imgur.com/nN2bNOm.png",
    likes: 2847,
    views: 15420,
    shares: 342,
    category: "Fashion",
    followers: 27,
    items: 55,
  },
  {
    id: 2,
    title: "Summer Collection 2025",
    author: "Sarah Chen",
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    description: "The best summer finds from Taobao and Weidian. Perfect for beach season!",
    thumbnail: "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=600&h=600&fit=crop",
    likes: 1543,
    views: 8920,
    shares: 215,
    category: "Fashion",
    followers: 18,
    items: 42,
  },
  {
    id: 3,
    title: "Tech Gadgets Under $50",
    author: "Tech Lover",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    description: "Amazing tech deals that won't break your budget.",
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    likes: 3421,
    views: 22340,
    shares: 567,
    category: "Electronics",
    followers: 52,
    items: 78,
  },
  {
    id: 4,
    title: "Vintage Fashion Must-Haves",
    author: "Vintage Queen",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    description: "Classic vintage pieces that never go out of style.",
    thumbnail: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    likes: 2156,
    views: 11230,
    shares: 289,
    category: "Fashion",
    followers: 34,
    items: 61,
  },
  {
    id: 5,
    title: "Home Decor Essentials",
    author: "Interior Designer",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    description: "Transform your space with these affordable home decor items.",
    thumbnail: "https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=600&h=600&fit=crop",
    likes: 876,
    views: 4520,
    shares: 145,
    category: "Home",
    followers: 12,
    items: 38,
  },
  {
    id: 6,
    title: "Fitness Gear Collection",
    author: "Fitness Guru",
    authorAvatar:
      "https://images.unsplash.com/photo-1570295676220-9b08dd00e528?w=100&h=100&fit=crop",
    description: "Everything you need to start your fitness journey.",
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=600&h=600&fit=crop",
    likes: 1234,
    views: 6780,
    shares: 198,
    category: "Sports",
    followers: 28,
    items: 52,
  },
];

export default function SpreadsheetsPage() {
  const [spreadsheets, setSpreadsheets] = useState<Spreadsheet[]>(INITIAL_SPREADSHEETS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateSpreadsheet = (data: Omit<Spreadsheet, "id" | "likes" | "views">) => {
    const newSpreadsheet: Spreadsheet = {
      ...data,
      id: Math.max(...spreadsheets.map((s) => s.id), 0) + 1,
      likes: 0,
      views: 0,
      followers: 0,
      items: 0,
    };
    setSpreadsheets([newSpreadsheet, ...spreadsheets]);
  };

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <div className="pt-32 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Trending Spreadsheets
            <span className="text-green-500"> ›</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover curated collections from the community. Create your own spreadsheet and share
            your favorite finds!
          </p>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-black text-lg rounded-xl hover:from-green-400 hover:to-emerald-400 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 active:scale-95"
          >
            ✨ Create Spreadsheet
          </button>
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none -z-10" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Spreadsheets Grid */}
      <SpreadsheetGrid
        spreadsheets={spreadsheets}
        title="Trending Spreadsheets"
      />

      {/* Create Modal */}
      <CreateSpreadsheetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateSpreadsheet}
      />

      <Footer />
    </>
  );
}
