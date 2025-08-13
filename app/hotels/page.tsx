"use client";

import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROPERTIES } from "@/lib/gql/queries";
import HotelCard from "../components/HotelCard";
import SearchFilters from "../components/SearchFilters";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSearchParams } from "next/navigation";

export default function HotelsPage() {
  const searchParams = useSearchParams();
  const location = searchParams.get('location') || "Abuja";
  const maxPrice = searchParams.get('maxPrice') || undefined;

  const { data, loading, error } = useQuery(GET_PROPERTIES, {
    variables: { 
      location,
      maxPrice: maxPrice ? parseInt(maxPrice) : undefined
    },
    fetchPolicy: "network-only",
  });
  console.log(data);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <div className="container px-4 py-4 sm:py-6 lg:py-8 mx-auto">
          {/* Mobile Filter Toggle - Only shows on small screens */}
          <div className="lg:hidden mb-4">
            <details className="group">
              <summary className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm cursor-pointer">
                <h1 className="text-xl font-bold">Hotels in {location}</h1>
                <svg className="w-5 h-5 text-gray-500 transition-transform group-open:rotate-180" 
                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="p-4 mt-2 bg-white rounded-lg shadow-sm">
                <SearchFilters />
              </div>
            </details>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block lg:w-1/4">
              <div className="sticky top-4 space-y-6">
                <h1 className="text-2xl font-bold mb-4">Hotels in {location}</h1>
                <SearchFilters />
              </div>
            </div>
            
            {/* Hotels Grid */}
            <div className="w-full lg:w-3/4">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <Loading />
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <p className="text-red-500 text-lg">Failed to load hotels.</p>
                  <p className="text-gray-500 mt-2">Please try again later.</p>
                </div>
              ) : (
                <>
                  {/* Mobile results count */}
                  <div className="lg:hidden mb-4">
                    <p className="text-gray-600">
                      {data?.properties?.length || 0} hotels found
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                    {data?.properties?.map((hotel: any) => (
                      <HotelCard key={hotel.id} hotel={hotel} />
                    ))}
                    {data?.properties?.length === 0 && (
                      <div className="col-span-full text-center py-12">
                        <p className="text-gray-500 text-lg">No hotels found in {location}.</p>
                        <p className="text-gray-400 mt-2">Try adjusting your search criteria.</p>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}