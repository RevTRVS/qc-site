"use client";

import * as React from "react";

export default function PopupAgent() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("nexafinds_popup_seen");
    if (!hasSeenPopup) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    localStorage.setItem("nexafinds_popup_seen", "true");
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="relative w-full max-w-md">
        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-green-500/30 via-emerald-500/20 to-green-500/30 rounded-3xl blur-2xl -z-10"></div>

        <button
          onClick={handleClose}
          className="absolute -top-10 right-0 text-gray-400 hover:text-white transition text-3xl font-black z-10 hover:scale-110"
        >
          ✕
        </button>

        <div className="glass-effect rounded-3xl overflow-hidden shadow-2xl animate-slide-up p-8 md:p-12 border border-green-500/30">
          <div className="text-center">
            {/* Animated Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/40 to-emerald-500/20 rounded-full border-2 border-green-500/40 animate-pulse"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-green-500/60 to-emerald-500/40 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
              </div>
            </div>

            {/* Name */}
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
              <span className="gradient-text">RizzitGo</span>
            </h2>
            <p className="text-gray-300 text-sm mb-2">Elite Shopping Agent</p>
            <p className="text-gray-500 text-xs mb-8 tracking-wider uppercase">Get exclusive deals & premium access</p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-8 text-left text-sm">
              <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                <p className="text-green-400 font-bold">✨ Premium</p>
                <p className="text-gray-400 text-xs mt-1">Exclusive deals</p>
              </div>
              <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                <p className="text-emerald-400 font-bold">🎯 Verified</p>
                <p className="text-gray-400 text-xs mt-1">100% trusted</p>
              </div>
            </div>

            {/* CTA Button */}
            <div className="relative group mb-4">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <a
                href="https://rizzitgo.com/?rno=Rev"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block w-full px-6 py-4 bg-black rounded-xl text-green-400 hover:text-white font-black text-lg transition-all duration-300 border border-green-500/50"
                onClick={handleClose}
              >
                Join Now → Unlock Deals
              </a>
            </div>

            {/* Alternative action */}
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 text-gray-400 hover:text-gray-300 transition text-sm font-semibold"
            >
              I'll check it out later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
