"use client";

interface ToolsPageContentProps {
  onSelectTool: (toolId: string) => void;
}

export default function ToolsPageContent({ onSelectTool }: ToolsPageContentProps) {
  const tools = [
    {
      id: "link-converter",
      name: "Link Converter",
      description: "Convert product links to Rizzitgo format",
      icon: "🔗",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "shipping-calculator",
      name: "Shipping Calculator",
      description: "Calculate shipping costs and estimates",
      icon: "🛒",
      gradient: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16 text-center">
            <h1 className="text-6xl md:text-7xl font-black mb-6">
              <span className="gradient-text">Tools</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
              Convert product links, calculate shipping costs, and manage your shopping workflow
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => onSelectTool(tool.id)}
                className="h-full group cursor-pointer text-left"
              >
                <div className={`relative h-full rounded-2xl overflow-hidden border-2 border-white/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30 bg-gradient-to-br from-white/5 to-white/0 p-8 flex flex-col items-center justify-center text-center hover:scale-105`}>
                  {/* Background glow effect */}
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br ${tool.gradient} blur-2xl -z-10`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <h3 className="text-2xl font-black mb-3 group-hover:text-white transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-sm">
                      {tool.description}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl">
                    →
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
