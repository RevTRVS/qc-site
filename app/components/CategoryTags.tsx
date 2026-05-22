'use client';

import { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface CategoryTagsProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryTags({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryTagsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-full">
      {/* Expandable Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-5 py-3 rounded-lg font-bold transition-all duration-300 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-2 border-green-500/50 hover:border-green-400 text-green-400 flex items-center justify-between hover:shadow-lg hover:shadow-green-500/20"
      >
        <span>📂 Categories</span>
        <span className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="mt-3 flex flex-wrap gap-2 p-4 rounded-lg bg-black/40 border border-green-500/20 animate-in fade-in duration-200">
          {/* "All" button */}
          <button
            onClick={() => {
              onSelectCategory(null);
              setIsExpanded(false);
            }}
            className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black border-2 border-green-400 shadow-lg shadow-green-500/50 scale-105'
                : 'text-green-400 border-2 border-green-500/50 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105'
            }`}
          >
            All
          </button>

          {/* Category buttons */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                onSelectCategory(category.name);
                setIsExpanded(false);
              }}
              className={`px-4 py-2 rounded-full font-bold transition-all duration-300 ${
                selectedCategory === category.name
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black border-2 border-green-400 shadow-lg shadow-green-500/50 scale-105'
                  : 'text-green-400 border-2 border-green-500/50 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
