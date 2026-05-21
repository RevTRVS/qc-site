import { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group rounded-2xl p-4 border border-white/10 hover:border-green-400/50 transition-all duration-300 hover:bg-white/5 hover:shadow-xl hover:shadow-green-500/10 hover:scale-105 glow-box animate-slide-up">
      <div className="relative h-48 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-xl mb-4 flex items-center justify-center overflow-hidden group">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="text-gray-600 text-sm">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="space-y-2 mb-4">
        <h3 className="font-black text-lg text-white group-hover:text-green-400 transition-colors duration-300">
          {product.name}
        </h3>
        <p className="gradient-text font-bold text-2xl">
          {product.currency}
          {product.price}
        </p>
        {product.seller && (
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-wide">
            via {product.seller}
          </p>
        )}
      </div>

      <a
        href={product.link || "#"}
        className="w-full block text-center btn-primary font-bold"
      >
        View Product ↗
      </a>
    </div>
  );
}
