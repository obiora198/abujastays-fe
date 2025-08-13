import React from "react";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] bg-[url('/hero-bg.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="container mx-auto px-4 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Discover Your Perfect Stay in Abuja
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Book luxury hotels, apartments, and resorts at the best prices in Nigeria's capital
            </p>
            <div className="flex space-x-4">
              <Link
                href="/hotels"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-lg"
              >
                Browse Hotels
              </Link>
              <Link
                href="/deals"
                className="px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-lg font-medium text-lg"
              >
                Special Offers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}