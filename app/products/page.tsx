'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import SearchBar from '@/app/components/SearchBar';
import CategoryTags from '@/app/components/CategoryTags';
import ProductGridProducts from '@/app/components/ProductGridProducts';

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image?: string;
  category: string;
  seller: string;
}

interface Category {
  id: string;
  name: string;
}

// Mock data - substituir por API real da Rizzitgo
const MOCK_CATEGORIES: Category[] = [
  { id: '1', name: 'Best Batches' },
  { id: '2', name: 'Bought' },
  { id: '3', name: 'Accessories' },
  { id: '4', name: 'Backpacks' },
  { id: '5', name: 'Bags' },
  { id: '6', name: 'Balaclava' },
  { id: '7', name: 'Basketball' },
  { id: '8', name: 'Beanie' },
  { id: '9', name: 'Belt' },
  { id: '10', name: 'Bestseller' },
  { id: '11', name: 'Books' },
  { id: '12', name: 'Boots' },
  { id: '13', name: 'Boxers' },
  { id: '14', name: 'Boxes' },
  { id: '15', name: 'Bracelet' },
  { id: '16', name: 'Budget' },
  { id: '17', name: 'Cap' },
  { id: '18', name: 'Cardholder' },
  { id: '19', name: 'Down Jacket' },
  { id: '20', name: 'Electronics' },
];

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_1',
    name: 'Premium Designer Bag',
    price: 45,
    currency: '€',
    image: 'https://i.imgur.com/RxCmWDb.jpg',
    category: 'Bags',
    seller: 'Taobao',
  },
  {
    id: 'prod_2',
    name: 'Classic White Beanie',
    price: 12,
    currency: '€',
    image: 'https://i.imgur.com/kVSxKjb.jpg',
    category: 'Beanie',
    seller: 'Agent',
  },
  {
    id: 'prod_3',
    name: 'Luxury Backpack',
    price: 89,
    currency: '€',
    image: 'https://i.imgur.com/EqN4A8e.jpg',
    category: 'Backpacks',
    seller: 'Weidian',
  },
  {
    id: 'prod_4',
    name: 'Stylish Belt',
    price: 28,
    currency: '€',
    image: 'https://i.imgur.com/vJ3XkDY.jpg',
    category: 'Belt',
    seller: 'Taobao',
  },
  {
    id: 'prod_5',
    name: 'Premium Accessories Set',
    price: 35,
    currency: '€',
    image: 'https://i.imgur.com/h8Nm7pJ.jpg',
    category: 'Accessories',
    seller: 'Agent',
  },
  {
    id: 'prod_6',
    name: 'Winter Cap Collection',
    price: 22,
    currency: '€',
    image: 'https://i.imgur.com/q9PqFkL.jpg',
    category: 'Cap',
    seller: 'Taobao',
  },
  {
    id: 'prod_7',
    name: 'Branded Jacket',
    price: 156,
    currency: '€',
    image: 'https://i.imgur.com/Z1Vc2mK.jpg',
    category: 'Down Jacket',
    seller: 'Weidian',
  },
  {
    id: 'prod_8',
    name: 'Designer Sunglasses',
    price: 42,
    currency: '€',
    image: 'https://i.imgur.com/A5zJkBm.jpg',
    category: 'Accessories',
    seller: 'Agent',
  },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [loading, setLoading] = useState(false);

  // Fetch products when category or search term changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Replace with actual API call to Rizzitgo
        // const response = await fetch(
        //   `/api/products?category=${selectedCategory || ''}&search=${searchTerm}`
        // );
        // const data = await response.json();
        // setProducts(data.products);

        // For now, filter mock data
        let filtered = MOCK_PRODUCTS;

        if (selectedCategory) {
          filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        if (searchTerm) {
          filtered = filtered.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }

        setProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchTerm]);

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <Navbar />

      <div className="relative py-12 md:py-20 pt-32 z-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title with glow effect */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full pointer-events-none" style={{ top: '-50px', height: '200px' }}></div>
            <h1 className="text-4xl md:text-6xl font-black text-center mb-4 relative z-10">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow-pulse">
                DISCOVER TRENDING
              </span>
              <br />
              <span className="text-white">PRODUCTS</span>
            </h1>
            <p className="text-center text-gray-400 text-lg md:text-xl relative z-10 mt-4">
              Curated finds from Taobao, Weidian & verified agents
            </p>
          </div>

          {/* Category Tags */}
          <div className="mb-16 relative z-10">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-gradient-to-b from-green-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            <CategoryTags
              categories={MOCK_CATEGORIES}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Search Bar */}
          <div className="mb-16 relative z-10">
            <SearchBar value={searchTerm} onChange={setSearchTerm} />
          </div>

          {/* Products Grid */}
          <div className="relative z-10">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block">
                  <div className="w-12 h-12 border-3 border-green-500/20 border-t-green-500 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-400 mt-4 text-lg">Carregando produtos...</p>
              </div>
            ) : products.length > 0 ? (
              <ProductGridProducts products={products} />
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 text-xl">Nenhum produto encontrado</p>
                <p className="text-gray-500 text-sm mt-2">Tente outra categoria ou termo de busca</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
