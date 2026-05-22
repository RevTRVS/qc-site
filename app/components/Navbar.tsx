"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import DiscordButton from "./DiscordButton";

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
          ? "glass-effect bg-black/50 border-b border-green-500/20"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link href="/" className="group">
          <h1 className="text-2xl font-black transition-all duration-300 hover:scale-105 text-white">
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
              className="text-gray-400 hover:text-green-400 transition-colors duration-300 font-semibold relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        <div className="flex gap-3 items-center">
          <DiscordButton />
          {isLoggedIn ? (
            <div className="relative" tabIndex={0}>
              <ProfileMenu user={user} onLogout={logout} />
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

function ProfileMenu({ user, onLogout }: { user?: any; onLogout: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (e.target instanceof Node && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-3 px-3 py-1 rounded-full hover:shadow-lg transition-shadow bg-white/5 backdrop-blur"
        aria-expanded={open}
      >
        <div className="w-9 h-9 rounded-full bg-gray-800 overflow-hidden border border-white/10 flex items-center justify-center">
          {user?.avatar ? (
            // Discord avatar url format: https://cdn.discordapp.com/avatars/{id}/{avatar}.png
            <img src={user.avatar.startsWith("http") ? user.avatar : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-sm text-white">{(user?.username || "User")[0]}</span>
          )}
        </div>
        <div className="hidden sm:flex flex-col items-start">
          <span className="text-sm font-semibold text-white leading-none">{user?.username || "User"}</span>
          <span className="text-xs text-gray-400">Conta</span>
        </div>
        <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9l6 6 6-6" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className={`absolute right-0 mt-3 w-52 bg-[#0b0b0b] border border-white/10 rounded-xl shadow-2xl p-2 transition-transform origin-top-right ${open ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"}`}
      >
        <div className="px-3 py-2 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
              {user?.avatar ? (
                <img src={user.avatar.startsWith("http") ? user.avatar : `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white">{(user?.username || "U")[0]}</span>
              )}
            </div>
            <div>
              <div className="text-sm font-bold text-white">{user?.username || "User"}</div>
              <div className="text-xs text-gray-400">{user?.email || ""}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col py-2">
          <a href="/profile" className="px-3 py-2 text-sm text-white hover:bg-white/5 rounded-md">Profile</a>
          <a href="/settings" className="px-3 py-2 text-sm text-white hover:bg-white/5 rounded-md">Settings</a>
          <button onClick={onLogout} className="text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-md">Logout</button>
        </div>
      </div>
    </div>
  );
}
