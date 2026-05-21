"use client";

import { useState } from "react";
import LinkConverterPage from "./LinkConverterPage";
import ToolsPageContent from "./ToolsPageContent";

export default function Tools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

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
    <section id="tools" className="min-h-screen bg-black text-white py-20 px-4">
      <ToolsPageContent onSelectTool={setSelectedTool} />
    </section>
  );
}
