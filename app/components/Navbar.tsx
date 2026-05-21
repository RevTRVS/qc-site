"use client";

import { useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-effect bg-black/50 border-b border-green-500/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <a href="#" className="group">
          <h1 className="text-2xl font-black transition-all duration-300 hover:scale-105">
            Rep<span className="gradient-text group-hover:animate-glow-pulse">Mania</span>
          </h1>
        </a>

        <nav className="hidden md:flex gap-8">
          {[
            { label: "Home", href: "#" },
            { label: "Products", href: "#" },
            { label: "Tools", href: "#tools" },
            { label: "FAQ", href: "#" },
            { label: "Best Sellers", href: "#" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 font-semibold relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </nav>

        <button className="btn-secondary">
          💬 Discord
        </button>
      </div>
    </header>
  );
}
