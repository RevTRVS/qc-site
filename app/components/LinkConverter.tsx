"use client";

import * as React from "react";

interface ConvertedLink {
  original: string;
  rizzitgo: string;
  status: "success" | "error";
  platform?: string;
  error?: string;
}

export default function LinkConverter() {
  const [inputLinks, setInputLinks] = React.useState("");
  const [results, setResults] = React.useState<ConvertedLink[]>([]);
  const [activeTab, setActiveTab] = React.useState<"rizzitgo">("rizzitgo");

  const detectPlatform = (url: string): string => {
    if (url.includes("tmall.com") || url.includes("taobao.com")) {
      return "Taobao/Tmall";
    } else if (url.includes("1688.com")) {
      return "1688";
    } else if (url.includes("weidian.com")) {
      return "Weidian";
    }
    return "Unknown";
  };

  const extractId = (url: string): string | null => {
    // Taobao/Tmall: detail.tmall.com/item.htm?id=123 or item.taobao.com/item.htm?id=123
    let match = url.match(/[?&]id=(\d+)/i);
    if (match) return match[1];

    // Weidian: weidian.com/item.html?itemID=123456
    match = url.match(/[?&]itemID=(\d+)/i);
    if (match) return match[1];

    // 1688: detail.1688.com/offer/123456789.html
    match = url.match(/\/offer\/(\d+)/i);
    if (match) return match[1];

    // Legacy num_iid format
    match = url.match(/[?&]num_iid=(\d+)/i);
    if (match) return match[1];

    return null;
  };

  const convertToRizzitgo = (url: string): { link: string; platform: string } => {
    const platform = detectPlatform(url);
    const id = extractId(url);
    
    if (!id) {
      throw new Error(`Could not extract product ID from ${platform} URL`);
    }
    
    // Rizzitgo link format
    const rizzitgoLink = `https://www.rizzitgo.com/detail-page/?goodsId=${id}&source=1&rno=Rev`;
    
    return { link: rizzitgoLink, platform };
  };

  const handleConvert = () => {
    const links = inputLinks
      .split("\n")
      .map((link) => link.trim())
      .filter((link) => link.length > 0);

    const converted: ConvertedLink[] = links.map((link) => {
      try {
        const { link: rizzitgoLink, platform } = convertToRizzitgo(link);
        return {
          original: link,
          rizzitgo: rizzitgoLink,
          platform,
          status: "success",
        };
      } catch (error) {
        return {
          original: link,
          rizzitgo: "",
          status: "error",
          error: error instanceof Error ? error.message : "Conversion failed",
        };
      }
    });

    setResults(converted);
  };

  const handleClearAll = () => {
    setResults([]);
    setInputLinks("");
  };

  const handleExport = () => {
    const csv = results
      .map((r) => `"${r.original}","${r.platform || "Unknown"}","${r.rizzitgo || "ERROR: " + r.error}"`)
      .join("\n");

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/csv;charset=utf-8," + encodeURIComponent(csv)
    );
    element.setAttribute("download", "converted_links.csv");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-8 border-b border-white/10">
        <button
          onClick={() => setActiveTab("rizzitgo")}
          className={`pb-3 px-4 font-bold transition-all duration-300 border-b-2 ${
            activeTab === "rizzitgo"
              ? "border-green-500 text-green-400"
              : "border-transparent text-gray-400 hover:text-white"
          }`}
        >
          🔗 Rizzitgo Converter
        </button>
      </div>

      {/* Rizzitgo Tab */}
      {activeTab === "rizzitgo" && (
        <div className="space-y-6">
          {/* Input Section */}
          <div className="glass-effect rounded-xl p-6 border border-green-500/20">
            <h3 className="text-lg font-black mb-2 flex items-center gap-2">
              <span className="text-2xl">🔗</span> Input Links
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Paste product links from Taobao, Tmall, Weidian, or 1688 (one per line)
            </p>

            {/* Supported Platforms Info */}
            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-xs text-green-300 font-semibold mb-2">✓ Supported Platforms:</p>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <div>📌 Taobao: detail.taobao.com/item.htm?id=...</div>
                <div>📌 Tmall: detail.tmall.com/item.htm?id=...</div>
                <div>📌 Weidian: weidian.com/item.html?itemID=...</div>
                <div>📌 1688: detail.1688.com/offer/...</div>
              </div>
            </div>

            <textarea
              value={inputLinks}
              onChange={(e) => setInputLinks(e.target.value)}
              placeholder="https://detail.tmall.com/item.htm?id=1034145281523&#10;https://weidian.com/item.html?itemID=123456&#10;https://detail.1688.com/offer/123456789.html"
              className="w-full h-40 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:border-green-400/50 focus:ring-1 focus:ring-green-400/30 resize-none transition-all duration-300"
            />

            <button
              onClick={handleConvert}
              disabled={!inputLinks.trim()}
              className={`mt-6 w-full py-3 rounded-xl font-bold text-lg transition-all duration-300 border-2 ${
                inputLinks.trim()
                  ? "btn-primary border-green-500 hover:scale-105"
                  : "bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed"
              }`}
            >
              🔄 Convert Links
            </button>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="glass-effect rounded-xl p-6 border border-green-500/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black">Results</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-all duration-300"
                  >
                    ⬇️ Export CSV
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg font-semibold transition-all duration-300"
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {results.map((result, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      result.status === "success"
                        ? "border-green-500/30 bg-green-500/5"
                        : "border-red-500/30 bg-red-500/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-xs text-gray-400">Platform:</p>
                          {result.status === "success" && (
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded font-semibold">
                              {result.platform}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mb-2">Original:</p>
                        <p className="text-sm text-white break-all mb-3">
                          {result.original}
                        </p>

                        {result.status === "success" ? (
                          <>
                            <p className="text-xs text-gray-400 mb-2">
                              Rizzitgo Link:
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-sm text-green-400 break-all flex-1">
                                {result.rizzitgo}
                              </p>
                              <button
                                onClick={() =>
                                  copyToClipboard(result.rizzitgo)
                                }
                                className="flex-shrink-0 p-2 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded transition-all duration-300"
                                title="Copy to clipboard"
                              >
                                📋
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="text-xs text-red-400">
                              ❌ {result.error}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-500">
                ✅ {results.filter((r) => r.status === "success").length}{" "}
                successful • ❌{" "}
                {results.filter((r) => r.status === "error").length} failed
              </div>
            </div>
          )}

          {/* Info */}
          {results.length === 0 && inputLinks.length === 0 && (
            <div className="glass-effect rounded-xl p-6 border border-green-500/20">
              <div className="flex gap-4">
                <span className="text-3xl">ℹ️</span>
                <div>
                  <h4 className="font-black mb-3">How it works</h4>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li>✓ Paste your Taobao, Tmall, Weidian, or 1688 product links</li>
                    <li>✓ Supports multiple formats: ?id=, ?itemID=, /offer/ patterns</li>
                    <li>✓ Click "Convert Links" to transform them to Rizzitgo format</li>
                    <li>✓ Each link gets your affiliate code (rno=Rev)</li>
                    <li>✓ Copy individual links or export all as CSV</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
