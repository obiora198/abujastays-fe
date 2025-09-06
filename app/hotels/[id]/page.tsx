"use client";

import React from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_PROPERTY_DETAILS } from "@/lib/gql/queries";
import ReviewSection from "../../components/ReviewSection";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { MapPin, Star, Calendar, Users } from "lucide-react";

export default function HotelDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);
  const { data, loading, error } = useQuery(GET_PROPERTY_DETAILS, {
    variables: { id },
    fetchPolicy: "network-only",
  });

  const property = data?.property;
  const averageRating = property?.reviews?.length 
    ? (property.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / property.reviews.length).toFixed(1)
    : "0.0";

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );

  if (error || !property) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <span className="text-red-500 text-2xl">⚠️</span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Property Not Found</h2>
        <p className="text-gray-600">Sorry, we couldn't find this property. Please try again.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm">
        <div className="container-responsive py-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {property.name}
            </h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{property.location}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 mr-1" />
                <span className="font-semibold">{averageRating}</span>
                <span className="text-gray-500 ml-1">
                  ({property.reviews?.length || 0} reviews)
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-2xl font-bold text-green-600">
                  ₦{property.pricePerNight?.toLocaleString()}
                </span>
                <span className="text-gray-500 ml-1">/night</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-responsive py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.images?.map((image: string, index: number) => (
                <div
                  key={index}
                  className={`relative h-64 rounded-lg overflow-hidden ${
                    index === 0 ? "md:col-span-2" : ""
                  }`}
                >
                  <Image
                    src={image || "/placeholder-hotel.jpg"}
                    alt={`${property.name} - Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4">About this property</h2>
              <p className="text-gray-700 leading-relaxed">
                {property.description || "No description available. This beautiful property offers comfortable accommodations in a great location."}
              </p>
            </div>

            {/* Reviews Section */}
            <ReviewSection propertyId={id} reviews={property.reviews} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Booking Card */}
              <div className="bg-white rounded-xl shadow-lg border p-6">
                <h3 className="text-lg font-semibold mb-4">Book your stay</h3>
                
                <div className="space-y-4">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-green-600">
                      ₦{property.pricePerNight?.toLocaleString()}
                    </span>
                    <span className="text-gray-500">/night</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm">Check-in</span>
                      </div>
                      <span className="text-sm text-gray-500">Select dates</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm">Check-out</span>
                      </div>
                      <span className="text-sm text-gray-500">Select dates</span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2 text-gray-600" />
                        <span className="text-sm">Guests</span>
                      </div>
                      <span className="text-sm text-gray-500">1 guest</span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200">
                    Check Availability
                  </button>
                </div>
              </div>

              {/* Property Details Card */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold mb-4">Property Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Price per night</span>
                    <span className="font-semibold">₦{property.pricePerNight?.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Total reviews</span>
                    <span className="font-semibold">{property.reviews?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-gray-600">Average rating</span>
                    <span className="font-semibold flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      {averageRating}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Status</span>
                    <span className="font-semibold text-green-600">
                      {property.verified ? "Verified" : "Unverified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}