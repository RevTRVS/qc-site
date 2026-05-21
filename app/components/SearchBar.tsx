'use client';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="max-w-4xl mx-auto relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
      <input
        type="text"
        placeholder="Search... and press Enter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="relative w-full px-6 py-4 bg-black/50 border-2 border-green-500/30 rounded-full text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-all duration-300 focus:bg-black/70 focus:shadow-lg focus:shadow-green-500/20 backdrop-blur-sm"
      />
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 text-green-500/50 group-hover:text-green-400 transition-colors">
        ⌕
      </div>
    </div>
  );
}

