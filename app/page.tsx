import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import PromoCarousel from "@/app/components/PromoCarousel";
import ProductGrid from "@/app/components/ProductGrid";
import FAQ from "@/app/components/FAQ";
import Footer from "@/app/components/Footer";
import PopupAgent from "@/app/components/PopupAgent";
import { Product, FAQItem } from "@/app/types";

const FEATURED_PRODUCTS: Product[] = [

  {
    id: 2,
    name: "Designer Watch",
    price: 89,
    currency: "€",
    seller: "Weidian",
  },
  {
    id: 3,
    name: "Luxury Bag",
    price: 125,
    currency: "€",
    seller: "Agent",
  },
  {
    id: 4,
    name: "Branded Shirt",
    price: 35,
    currency: "€",
    seller: "Taobao",
  },
  {
    id: 5,
    name: "Premium Jacket",
    price: 156,
    currency: "€",
    seller: "Weidian",
  },
  {
    id: 6,
    name: "Fashion Accessory",
    price: 22,
    currency: "€",
    seller: "Agent",
  },
  {
    id: 7,
    name: "Elegant Belt",
    price: 28,
    currency: "€",
    seller: "Taobao",
  },
  {
    id: 8,
    name: "Stylish Sunglasses",
    price: 42,
    currency: "€",
    seller: "Weidian",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 1,
    question: "What is NexaFinds?",
    answer:
      "NexaFinds is a curated discovery platform for finding trending products from global marketplaces like Taobao, Weidian, and verified agents.",
  },
  {
    id: 2,
    question: "Is it safe to buy through the agents?",
    answer:
      "Yes! We partner with trusted, verified agents. Always use secure payment methods and check seller ratings before purchasing.",
  },
  {
    id: 3,
    question: "How do affiliate links work?",
    answer:
      "When you purchase through our links, we may earn a small commission at no extra cost to you. This helps us maintain the platform.",
  },
  {
    id: 4,
    question: "How often are products updated?",
    answer:
      "Our product catalog is curated weekly to showcase the latest trending finds across all marketplaces.",
  },
  {
    id: 5,
    question: "Can I suggest products?",
    answer:
      "Absolutely! Join our Discord community to share product recommendations and connect with other enthusiasts.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <PopupAgent />
      <Navbar />
      <Hero />
      <section className="max-w-7xl mx-auto px-6 py-12">
        <PromoCarousel />
      </section>
      <ProductGrid products={FEATURED_PRODUCTS} />
      <FAQ items={FAQ_ITEMS} />
      <Footer />
    </main>
  );
}