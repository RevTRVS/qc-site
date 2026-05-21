"use client";

import * as React from "react";
import { FAQItem } from "@/app/types";

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openId, setOpenId] = React.useState<number | null>(0);

  return (
    <section id="faq" className="max-w-3xl mx-auto mt-20 px-6 py-12 relative">
      {/* Ambient glow */}
      <div className="absolute -left-40 top-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-6xl font-black mb-4 animate-slide-up">
            Frequently Asked <span className="gradient-text animate-glow-pulse">Questions</span>
          </h2>
          <p className="text-gray-400 text-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Everything you need to know about RepMania
          </p>
        </div>

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="glass-effect rounded-xl overflow-hidden group animate-slide-up"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <button
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-white/10 transition-all duration-300"
              >
                <span className="font-black text-lg text-left group-hover:text-green-400 transition-colors duration-300">
                  {item.question}
                </span>
                <span
                  className={`text-green-400 text-2xl transition-transform duration-300 flex-shrink-0 ${
                    openId === item.id ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {openId === item.id && (
                <div className="px-6 py-5 border-t border-white/10 bg-white/5 text-gray-300 text-base animate-slide-up">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
