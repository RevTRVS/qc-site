export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image?: string;
  seller?: string;
  link?: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
