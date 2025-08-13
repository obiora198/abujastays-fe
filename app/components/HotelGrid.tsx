import React from "react";
import Link from 'next/link';
import { Hotel } from '@/types'; 

const featuredHotels: Hotel[] = [
  {
    id: 1,
    name: 'Transcorp Hilton Abuja',
    location: 'Central District',
    price: 45000,
    rating: 4.8,
    image: '/hilton.jpg',
  },
  {
    id: 2,
    name: 'Sheraton Abuja Hotel',
    location: 'Garki',
    price: 38000,
    rating: 4.5,
    image: '/sheraton.jpg',
  },
  {
    id: 3,
    name: 'Fraser Suites Abuja',
    location: 'Central Business District',
    price: 52000,
    rating: 4.9,
    image: '/fraser.jpg',
  },
];

export default function HotelGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Hotels in Abuja</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
              <div className="h-48 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{hotel.name}</h3>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                    {hotel.rating} ★
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{hotel.location}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">₦{hotel.price.toLocaleString()}</span>
                  <Link
                    href={`/hotels/${hotel.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            href="/hotels"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
          >
            View All Hotels
          </Link>
        </div>
      </div>
    </section>
  );
}