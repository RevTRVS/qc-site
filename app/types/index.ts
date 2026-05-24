export interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
  image?: string;
  seller?: string;
  link?: string;
  views?: number;
}

export interface SpreadsheetProduct {
  id: number;
  name: string;
  price: number;
  currency: string;
  image: string;
  seller: string;
  link: string;
  category?: string;
  likes?: number;
  views?: number;
}

export interface Spreadsheet {
  id: number;
  title: string;
  author: string;
  authorAvatar?: string;
  description?: string;
  thumbnail?: string;
  likes: number;
  views: number;
  shares?: number;
  category?: string;
  createdAt?: string;
  link?: string;
  followers?: number;
  items?: number;
  products?: SpreadsheetProduct[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
