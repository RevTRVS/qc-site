'use client';

import ProductCard from '@/app/components/ProductCard';
import type { Product } from '@/app/types';

interface ProductGridProductsProps {
  products: Product[];
}

export default function ProductGridProducts({ products }: ProductGridProductsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}
