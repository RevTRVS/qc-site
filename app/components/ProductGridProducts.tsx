'use client';

import ProductCard from '@/app/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  seller: string;
}

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
