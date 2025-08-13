"use client";

import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchFilters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [priceValue, setPriceValue] = useState(
    searchParams.get("maxPrice") || "50000"
  );

  const handleFilter = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPriceValue(value);
    // Add a small delay to prevent too many rapid updates
    const timer = setTimeout(() => {
      handleFilter("maxPrice", value);
    }, 500);
    return () => clearTimeout(timer);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-4">Filter By</h3>

      <div className="space-y-6">
        {/* Price Range Section - Improved */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-medium">Price Range</h4>
            <span className="text-sm font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded">
              Up to {formatPrice(Number(priceValue))}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="100000"
            step="5000"
            value={priceValue}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatPrice(10000)}</span>
            <span>{formatPrice(100000)}+</span>
          </div>
        </div>

        {/* Star Rating Section */}
        <div>
          <h4 className="text-sm font-medium mb-2">Star Rating</h4>
          {[5, 4, 3].map((stars) => (
            <label key={stars} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                onChange={() => handleFilter("rating", stars.toString())}
                checked={searchParams.get("rating") === stars.toString()}
              />
              <span className="text-yellow-400">
                {Array(stars).fill("★").join("")}
              </span>
            </label>
          ))}
        </div>

        {/* Amenities Section */}
        <div>
          <h4 className="text-sm font-medium mb-2">Amenities</h4>
          {["Pool", "WiFi", "Parking", "Gym", "Spa"].map((amenity) => (
            <label key={amenity} className="flex items-center mb-2">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                onChange={() => handleFilter("amenities", amenity)}
                checked={searchParams.getAll("amenities").includes(amenity)}
              />
              {amenity}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
