import { Product } from "@/app/types";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <section id="products" className="max-w-7xl mx-auto mt-20 px-6 py-12 relative">
      {/* Ambient glow */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-4 animate-slide-up">
            Trending <span className="gradient-text animate-glow-pulse">Now</span>
          </h2>
          <p className="text-gray-400 text-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Discover the most popular finds this week
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, idx) => (
            <div key={product.id} style={{ animationDelay: `${idx * 0.05}s` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
