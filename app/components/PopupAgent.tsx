"use client";

import * as React from "react";

export default function PopupAgent() {
  const [show, setShow] = React.useState(true);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-md">
        <button
          onClick={() => setShow(false)}
          className="absolute -top-8 right-0 text-gray-400 hover:text-white transition text-3xl font-black z-10"
        >
          ✕
        </button>

        <div className="glass-effect rounded-3xl overflow-hidden shadow-2xl animate-slide-up p-8 md:p-12">
          <div className="text-center">
            {/* Logo placeholder */}
            <div className="mb-8 flex justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/40 to-emerald-500/20 flex items-center justify-center border-2 border-green-500/40">
                <span className="text-4xl gradient-text">✨</span>
              </div>
            </div>

            {/* Name */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
              <span className="gradient-text">RizzitGo</span>
            </h2>
            <p className="text-gray-300 text-sm mb-8">Create your account</p>

            {/* CTA Button with referral link */}
            <a
              href="https://rizzitgo.com/?rno=Rev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full btn-primary text-center text-lg font-black py-4 rounded-xl hover:scale-105 transition-transform duration-300"
              onClick={() => setShow(false)}
            >
              Join Now →
            </a>

            {/* Close alternative */}
            <button
              onClick={() => setShow(false)}
              className="mt-4 w-full text-gray-400 hover:text-gray-300 transition text-sm font-semibold"
            >
              Maybe later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
