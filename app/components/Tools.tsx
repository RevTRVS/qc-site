"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import LinkConverterPage from "./LinkConverterPage";
import ToolsPageContent from "./ToolsPageContent";

export default function Tools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleSelectTool = (toolId: string) => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true);
      return;
    }
    setSelectedTool(toolId);
  };

  if (selectedTool === "link-converter") {
    return (
      <div>
        <button
          onClick={() => setSelectedTool(null)}
          className="fixed top-24 left-6 z-50 inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span>←</span> Back to Tools
        </button>
        <LinkConverterPage />
      </div>
    );
  }

  if (selectedTool === "shipping-calculator") {
    return (
      <section className="min-h-screen bg-black text-white py-20 px-4 pt-32">
        <button
          onClick={() => setSelectedTool(null)}
          className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors mb-8"
        >
          <span>←</span> Back to Tools
        </button>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl font-black mb-4">
            <span className="gradient-text">Shipping Calculator</span>
          </h1>
          <p className="text-gray-400 text-lg">Coming soon...</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/40 to-pink-500/20 flex items-center justify-center margin-auto mx-auto border-2 border-purple-500/40">
                <span className="text-4xl gradient-text">🔐</span>
              </div>
            </div>
            <h2 className="text-4xl font-black mb-4">
              <span className="gradient-text">Login Required</span>
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Sign in to access and use our exclusive tools
            </p>
            <div className="flex gap-4">
              <Link href="/auth/login" className="flex-1 btn-primary text-lg px-6 py-3 inline-block">
                Sign In
              </Link>
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="flex-1 btn-secondary text-lg px-6 py-3"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tools Page */}
      <section id="tools" className="min-h-screen bg-black text-white py-20 px-4">
        <ToolsPageContent onSelectTool={handleSelectTool} />
      </section>
    </>
  );
}
