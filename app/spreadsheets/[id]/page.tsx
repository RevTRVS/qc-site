"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SpreadsheetProductItem from "@/app/components/SpreadsheetProductItem";
import { Spreadsheet, SpreadsheetProduct } from "@/app/types";

// Mock data - in a real app, this would come from a database
const SPREADSHEETS_DATA: { [key: string]: Spreadsheet } = {
  "1": {
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
    products: [
      {
        id: 1,
        name: "New foreign trade men's and women's glasses",
        price: 30.44,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop",
        seller: "我的小店",
        link: "https://taobao.com/item",
        category: "Eyewear",
        likes: 156,
        views: 1234,
      },
      {
        id: 2,
        name: "Monster Energy Vitamin Drink Set",
        price: 5.71,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300&h=300&fit=crop",
        seller: "宜大喝",
        link: "https://taobao.com/item",
        category: "Beverages",
        likes: 89,
        views: 856,
      },
      {
        id: 3,
        name: "Summer New Product Villain Design Print",
        price: 0.38,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        seller: "金器销砌买",
        link: "https://taobao.com/item",
        category: "Fashion",
        likes: 234,
        views: 1161,
      },
      {
        id: 4,
        name: "CoteVue Winrar Archive Edition",
        price: 25.75,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop",
        seller: "lufuright",
        link: "https://taobao.com/item",
        category: "Accessories",
        likes: 145,
        views: 943,
      },
      {
        id: 5,
        name: "G D Drive Autumn Tie-Dye Jacket",
        price: 17.78,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop",
        seller: "安安影秀",
        link: "https://taobao.com/item",
        category: "Outerwear",
        likes: 267,
        views: 2134,
      },
      {
        id: 6,
        name: "1:1 Fashion GALLERY. DEPT. Hoodie",
        price: 18.77,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=300&h=300&fit=crop",
        seller: "包个套买入",
        link: "https://taobao.com/item",
        category: "Fashion",
        likes: 321,
        views: 3214,
      },
      {
        id: 7,
        name: "GALLERY. DEPT. Black Sweatshirt",
        price: 22.5,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop",
        seller: "GALLERY Official",
        link: "https://taobao.com/item",
        category: "Fashion",
        likes: 198,
        views: 1876,
      },
      {
        id: 8,
        name: "Premium Wireless Headphones",
        price: 45.99,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
        seller: "音乐店铺",
        link: "https://taobao.com/item",
        category: "Electronics",
        likes: 412,
        views: 4521,
      },
      {
        id: 9,
        name: "Vintage Denim Jacket",
        price: 28.3,
        currency: "€",
        image:
          "https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop",
        seller: "牛仔大师",
        link: "https://taobao.com/item",
        category: "Outerwear",
        likes: 276,
        views: 2789,
      },
    ],
  },
};

export default function SpreadsheetDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const spreadsheet = SPREADSHEETS_DATA[id];
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(spreadsheet?.likes || 0);
  const [followers, setFollowers] = useState(spreadsheet?.followers || 0);
  const [isFollowing, setIsFollowing] = useState(false);

  if (!spreadsheet) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen pt-32 px-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-black text-white mb-4">
              Spreadsheet Not Found
            </h1>
            <p className="text-gray-400">
              The spreadsheet you're looking for doesn't exist.
            </p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  const handleFollow = () => {
    if (!isFollowing) {
      setFollowers(followers + 1);
      setIsFollowing(true);
    } else {
      setFollowers(followers - 1);
      setIsFollowing(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Header Section */}
      <div className="pt-32 pb-12 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Title and Author Info */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              {spreadsheet.title}
              <span className="text-green-500">.</span>
            </h1>
            
            <div className="flex justify-center items-center gap-4 mb-6">
              <div className="flex items-center gap-3">
                {spreadsheet.authorAvatar && (
                  <img
                    src={spreadsheet.authorAvatar}
                    alt={spreadsheet.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                  />
                )}
                <div className="text-left">
                  <p className="font-black text-white">{spreadsheet.author}</p>
                  <p className="text-sm text-gray-400">
                    {spreadsheet.followers} Followers • {spreadsheet.items} Items
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            {spreadsheet.description && (
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                {spreadsheet.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mb-8">
              <button
                onClick={handleFollow}
                className={`px-8 py-3 font-bold rounded-full transition-all duration-300 border-2 ${
                  isFollowing
                    ? "bg-green-500 text-black border-green-500"
                    : "bg-white text-black border-white hover:bg-gray-100"
                }`}
              >
                {isFollowing ? "✓ Following" : "Follow"}
              </button>
              <button className="px-4 py-3 bg-gray-800 text-white font-bold rounded-full hover:bg-gray-700 transition-all duration-300 border border-gray-600">
                ⋯
              </button>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <p className="text-2xl font-black text-white">{likes}</p>
                <p className="text-sm text-gray-400">
                  {liked ? "❤️" : "🤍"} Likes
                </p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-white">
                  {spreadsheet.views}
                </p>
                <p className="text-sm text-gray-400">👁️ Views</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-white">
                  {spreadsheet.shares}
                </p>
                <p className="text-sm text-gray-400">🔗 Shares</p>
              </div>
            </div>
          </div>

          {/* Like Button */}
          <div className="flex justify-center">
            <button
              onClick={handleLike}
              className={`px-6 py-3 font-bold rounded-lg transition-all duration-300 ${
                liked
                  ? "bg-red-500 text-white"
                  : "bg-gradient-to-r from-green-500 to-emerald-500 text-black hover:from-green-400 hover:to-emerald-400"
              }`}
            >
              {liked ? "❤️ Liked" : "🤍 Like This"}
            </button>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-0 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-float pointer-events-none -z-10"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none -z-10" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Filter and Products Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Filter Bar */}
          <div className="flex flex-wrap gap-3 mb-8 pb-6 border-b border-green-500/20">
            <button className="px-6 py-2 bg-green-500/20 border border-green-500/40 text-green-300 rounded-full font-bold hover:border-green-400 transition-colors">
              🎛 Filter
            </button>
            <button className="px-6 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-bold hover:border-gray-500 transition-colors">
              Price
            </button>
            <button className="px-6 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-bold hover:border-gray-500 transition-colors">
              With OCs
            </button>
            <button className="px-6 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-bold hover:border-gray-500 transition-colors">
              Tops
            </button>
            <button className="px-6 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-bold hover:border-gray-500 transition-colors">
              Tech & Lifestyle
            </button>
            <button className="px-6 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-bold hover:border-gray-500 transition-colors">
              Jewelry
            </button>
            <button className="px-6 py-2 bg-gray-800 border border-gray-600 text-gray-300 rounded-full font-bold hover:border-gray-500 transition-colors">
              Accessories
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {spreadsheet.products?.map((product) => (
              <SpreadsheetProductItem
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
