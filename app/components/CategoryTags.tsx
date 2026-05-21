'use client';

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
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {/* "All" button */}
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 ${
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
          onClick={() => onSelectCategory(category.name)}
          className={`px-5 py-2.5 rounded-full font-bold transition-all duration-300 ${
            selectedCategory === category.name
              ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-black border-2 border-green-400 shadow-lg shadow-green-500/50 scale-105'
              : 'text-green-400 border-2 border-green-500/50 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/20 hover:scale-105'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
