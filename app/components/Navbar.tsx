"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import DiscordButton from "./DiscordButton";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "glass-effect bg-black/50 dark:bg-black/50 dark:border-b dark:border-green-500/20 border-b border-gray-200/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="group">
          <h1 className="text-2xl font-black transition-all duration-300 hover:scale-105 dark:text-white text-black">
            Nexa<span className="gradient-text group-hover:animate-glow-pulse">Finds</span>
          </h1>
        </Link>

        <nav className="hidden md:flex gap-8">
          {[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "Tools", href: "/tools" },
            { label: "FAQ", href: "#" },
            { label: "Best Sellers", href: "/sellers" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="dark:text-gray-400 dark:hover:text-green-400 text-gray-600 hover:text-green-600 transition-colors duration-300 font-semibold relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        <div className="flex gap-3 items-center">
          <ThemeToggle />
          <DiscordButton />
          {isLoggedIn ? (
            <div className="flex gap-3 items-center">
              <span className="text-sm dark:text-gray-400 text-gray-600 hidden sm:inline">
                {user?.username}
              </span>
              <button
                onClick={logout}
                className="btn-secondary text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="btn-secondary text-sm font-bold hover:font-black">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
