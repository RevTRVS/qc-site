'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface CategoriesDropdownProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoriesDropdown({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoriesDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Main Dropdown Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 rounded-xl font-bold transition-all duration-300 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 hover:border-green-400 text-green-400 flex items-center justify-between hover:shadow-lg hover:shadow-green-500/20 group"
      >
        <span className="text-lg flex items-center gap-2">
          📂 Browse Categories
        </span>
        <span className={`transition-transform duration-300 text-xl ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isExpanded && (
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2 p-4 rounded-xl bg-black/40 border border-green-500/20 animate-in fade-in duration-200">
          {/* All Categories Button */}
          <button
            onClick={() => {
              onSelectCategory(null);
              setIsExpanded(false);
            }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all duration-300 text-left ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black border border-green-400 shadow-lg shadow-green-500/50'
                : 'text-green-400 border border-green-500/30 hover:border-green-400 hover:bg-white/5'
            }`}
          >
            <span className="text-2xl">🏪</span>
            <div>
              <div className="font-bold">All Products</div>
              <div className="text-xs opacity-75">View everything</div>
            </div>
          </button>

          {/* Category Items */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onSelectCategory(category.name);
                setIsExpanded(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all duration-300 text-left ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black border border-green-400 shadow-lg shadow-green-500/50'
                  : 'text-green-400 border border-green-500/30 hover:border-green-400 hover:bg-white/5'
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <div>
                <div className="font-bold">{category.name}</div>
                <div className="text-xs opacity-75">Shop this category</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
