"use client";

import * as React from "react";

interface ShippingRate {
  name: string;
  days: string;
  price: (weight: number) => number;
}

const SHIPPING_RATES: Record<string, ShippingRate[]> = {
  standard: [
    {
      name: "Standard Shipping",
      days: "15-30 days",
      price: (weight) => 5 + weight * 0.5,
    },
    {
      name: "Economy Shipping",
      days: "20-40 days",
      price: (weight) => 3 + weight * 0.3,
    },
  ],
  express: [
    {
      name: "Express Shipping",
      days: "5-10 days",
      price: (weight) => 15 + weight * 1.2,
    },
    {
      name: "DHL Priority",
      days: "3-5 days",
      price: (weight) => 25 + weight * 1.8,
    },
  ],
};

export default function ShippingCalculator() {
  const [weight, setWeight] = React.useState(0.5);
  const [shippingType, setShippingType] = React.useState<"standard" | "express">(
    "standard"
  );
  const [selectedRate, setSelectedRate] = React.useState(0);

  const rates = SHIPPING_RATES[shippingType];
  const currentRate = rates[selectedRate];
  const shippingCost = currentRate.price(weight);

  return (
    <section className="max-w-3xl mx-auto mt-20 px-6 py-12 relative">
      {/* Ambient glow */}
      <div className="absolute right-0 -top-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-black mb-4 animate-slide-up">
            Shipping <span className="gradient-text animate-glow-pulse">Calculator</span>
          </h2>
          <p className="text-gray-400 text-lg animate-slide-up" style={{ animationDelay: "0.1s" }}>
            Estimate your delivery cost and time
          </p>
        </div>

        <div className="glass-effect rounded-2xl p-8 animate-slide-up" style={{ animationDelay: "0.2s" }}>
          {/* Weight Input */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <label className="font-black text-lg">
                Package Weight
              </label>
              <span className="text-3xl font-black gradient-text">
                {weight.toFixed(1)} kg
              </span>
            </div>
            <input
              type="range"
              min="0.1"
              max="10"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(parseFloat(e.target.value))}
              className="w-full h-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg appearance-none cursor-pointer accent-green-500 hover:accent-green-400 transition"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>0.1 kg</span>
              <span>10 kg</span>
            </div>
          </div>

          {/* Shipping Type Tabs */}
          <div className="mb-10">
            <label className="font-black text-lg block mb-4">
              Shipping Method
            </label>
            <div className="flex gap-3">
              {(["standard", "express"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setShippingType(type);
                    setSelectedRate(0);
                  }}
                  className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all duration-300 ${
                    shippingType === type
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                >
                  {type === "standard" ? "📦 Standard" : "⚡ Express"}
                </button>
              ))}
            </div>
          </div>

          {/* Shipping Options */}
          <div className="space-y-3 mb-10">
            {rates.map((rate, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedRate(idx)}
                className={`p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 group ${
                  selectedRate === idx
                    ? "gradient-text border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                    : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-lg group-hover:text-green-400 transition-colors duration-300">
                      {rate.name}
                    </h4>
                    <p className="text-sm text-gray-400 mt-2">
                      ⏱️ {rate.days}
                    </p>
                  </div>
                  <span className="text-2xl font-black gradient-text">
                    €{shippingCost.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex justify-between items-center mb-6">
              <span className="font-black text-xl text-gray-300">
                Estimated Total
              </span>
              <span className="text-4xl font-black gradient-text animate-glow-pulse">
                €{shippingCost.toFixed(2)}
              </span>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-xs text-gray-400">
                ℹ️ Costs are estimates based on weight. Final price may vary by destination & carrier. Calculated in EUR.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
