"use client";

import { useState, useEffect } from "react";

interface Banner {
  id: number;
  image: string;
  title: string;
  description: string;
  link?: string;
}

const BANNERS: Banner[] = [
  {
    id: 1,
    image: "blob:https://imgur.com/2361cacc-561b-43e6-96d6-9407eca6f588",
    title: "NexaFinds",
    description: "Check out the latest trending products",
    link: "/products",
  },
  {
    id: 2,
    image: "blob:https://imgur.com/0b523063-6eb4-4989-a316-85ac13252087",
    title: "Summer Collection",
    description: "Hot deals on summer essentials",
    link: "/products",
  },
  {
    id: 3,
    image: "https://imgur.com/a/KL5CZTj",
    title: "Flash Sale",
    description: "Limited time offers you won't want to miss",
    link: "/products",
  },
];

export default function PromoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, [autoPlay]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % BANNERS.length);
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  return (
    <section className="relative w-full h-56 bg-black overflow-hidden rounded-3xl">
      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('${banner.image}')`,
              }}
            >
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                {banner.title}
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                {banner.description}
              </p>
              {banner.link && (
                <a
                  href={banner.link}
                  className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-black font-bold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Shop Now →
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Previous Button */}
      <button
        onClick={goToPrevious}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {BANNERS.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
