'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import LinkConverterPage from '@/app/components/LinkConverterPage';
import LoginModal from '@/app/components/LoginModal';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

const TOOLS: Tool[] = [
  {
    id: 'link-converter',
    name: 'Link Converter',
    description: 'Convert product links to Rizzitgo format instantly',
    icon: '🔗',
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'shipping-calculator',
    name: 'Shipping Calculator',
    description: 'Calculate shipping costs and delivery estimates',
    icon: '📦',
    color: 'from-emerald-500 to-green-500',
  },
  {
    id: 'price-tracker',
    name: 'Price Tracker',
    description: 'Track price changes across marketplaces',
    icon: '📊',
    color: 'from-green-400 to-emerald-400',
  },
  {
    id: 'batch-converter',
    name: 'Batch Converter',
    description: 'Convert multiple links at once',
    icon: '⚡',
    color: 'from-emerald-400 to-green-400',
  },
];

export default function ToolsPage() {
  const { isLoggedIn } = useAuth();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedToolForAuth, setSelectedToolForAuth] = useState<string>('');

  const handleToolClick = (toolId: string) => {
    if (!isLoggedIn) {
      setSelectedToolForAuth(toolId);
      setShowLoginModal(true);
      return;
    }
    setSelectedTool(toolId);
  };

  if (selectedTool === 'link-converter') {
    return (
      <div>
        <button
          onClick={() => setSelectedTool(null)}
          className="fixed top-24 left-6 z-50 inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors font-bold"
        >
          <span>←</span> Back to Tools
        </button>
        <LinkConverterPage />
      </div>
    );
  }

  if (selectedTool === 'shipping-calculator') {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="min-h-screen bg-black text-white py-20 px-4 pt-32 relative overflow-hidden">
          <div className="absolute top-0 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
          <button
            onClick={() => setSelectedTool(null)}
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8 font-bold"
          >
            <span>←</span> Back to Tools
          </button>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Shipping Calculator
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Coming soon...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (selectedTool === 'price-tracker') {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="min-h-screen bg-black text-white py-20 px-4 pt-32 relative overflow-hidden">
          <div className="absolute top-0 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
          <button
            onClick={() => setSelectedTool(null)}
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8 font-bold"
          >
            <span>←</span> Back to Tools
          </button>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Price Tracker
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Coming soon...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  if (selectedTool === 'batch-converter') {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />
        <section className="min-h-screen bg-black text-white py-20 px-4 pt-32 relative overflow-hidden">
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
          <button
            onClick={() => setSelectedTool(null)}
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors mb-8 font-bold"
          >
            <span>←</span> Back to Tools
          </button>
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Batch Converter
              </span>
            </h1>
            <p className="text-gray-400 text-lg">Coming soon...</p>
          </div>
        </section>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute top-1/2 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-green-500/3 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>

      <Navbar />

      <div className="relative py-12 md:py-20 pt-32 z-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title with glow */}
          <div className="mb-16 relative">
            <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full pointer-events-none" style={{ top: '-50px', height: '200px' }}></div>
            <h1 className="text-4xl md:text-6xl font-black text-center mb-4 relative z-10">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent animate-glow-pulse">
                POWERFUL TOOLS
              </span>
              <br />
              <span className="text-white">FOR YOUR SHOPPING</span>
            </h1>
            <p className="text-center text-gray-400 text-lg md:text-xl relative z-10 mt-4">
              Convert links, calculate shipping, track prices & more
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {TOOLS.map((tool, idx) => (
              <button
                key={tool.id}
                onClick={() => handleToolClick(tool.id)}
                className="group cursor-pointer text-left h-full animate-slide-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`relative h-full rounded-2xl overflow-hidden border-2 border-green-500/30 hover:border-green-400 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/30 bg-gradient-to-br from-white/5 to-white/0 p-8 flex flex-col items-center justify-center text-center hover:scale-105`}>
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-gradient-to-br ${tool.color} blur-2xl -z-10`}></div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    <div className="text-6xl md:text-5xl group-hover:scale-120 transition-transform duration-500 inline-block">
                      {tool.icon}
                    </div>
                    <div>
                      <h3 className="text-xl md:text-lg font-black mb-2 group-hover:text-green-400 transition-colors">
                        {tool.name}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
                        {tool.description}
                      </p>
                    </div>
                    {!isLoggedIn && (
                      <div className="text-xs text-green-400/60 font-bold mt-2">
                        🔒 Login required
                      </div>
                    )}
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-2xl">
                    →
                  </div>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-500"></div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          if (isLoggedIn) {
            setSelectedTool(selectedToolForAuth);
          }
        }}
        toolName={TOOLS.find(t => t.id === selectedToolForAuth)?.name || 'Tool'}
      />
    </main>
  );
}
