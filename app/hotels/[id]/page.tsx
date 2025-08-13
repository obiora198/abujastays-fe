"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_PROPERTY_DETAILS } from "@/lib/gql/queries";
import ReviewSection from "../../components/ReviewSection";
import Loading from "../../components/Loading";

export default function HotelDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { data, loading, error } = useQuery(GET_PROPERTY_DETAILS, {
    variables: { id: params.id },
    fetchPolicy: "network-only",
  });
  const property = data?.property;

  if (loading) return <Loading />;
  if (error || !property) return (
    <div className="container-responsive py-8">
      <div className="text-center">
        <p className="text-red-500 text-lg">Failed to load property details.</p>
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    </div>
  );

  return (
    <div className="container-responsive py-4 sm:py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">{property.name}</h1>
            <p className="text-gray-600 text-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {property.location}
            </p>
          </div>

          {/* Main Image */}
          <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
            <Image
              src={property.images?.[0] || "/hero-bg.png"}
              alt={property.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About this property</h2>
            <p className="text-gray-700 leading-relaxed">{property.description || "No description available."}</p>
          </div>

          {/* Reviews */}
          <ReviewSection propertyId={params.id} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-6">
            {/* Booking Widget Placeholder */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4">Book this property</h3>
              <div className="space-y-4">
                <div>
                  <span className="text-3xl font-bold text-green-600">₦{property.pricePerNight?.toLocaleString()}</span>
                  <span className="text-gray-500">/night</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-lg shadow-sm p-6 border">
              <h3 className="text-lg font-semibold mb-4">Property Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Price per night:</span>
                  <span className="font-medium">₦{property.pricePerNight?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews:</span>
                  <span className="font-medium">{property.reviews?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}