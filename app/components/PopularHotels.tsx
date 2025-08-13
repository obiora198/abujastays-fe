import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const popularHotels = [
  {
    id: 1,
    name: 'Transcorp Hilton Abuja',
    location: 'Central Business District',
    price: 45000,
    rating: 4.8,
    image: '/hilton.jpg',
    amenities: ['Pool', 'Spa', 'Restaurant', 'Free WiFi'],
  },
  {
    id: 2,
    name: 'Sheraton Abuja Hotel',
    location: 'Ladi Kwali Way, Garki',
    price: 38000,
    rating: 4.5,
    image: '/sheraton.jpg',
    amenities: ['Pool', 'Fitness Center', 'Bar'],
  },
  {
    id: 3,
    name: 'Fraser Suites Abuja',
    location: 'Plot 1261, Tafawa Balewa Way',
    price: 52000,
    rating: 4.9,
    image: '/fraser.jpg',
    amenities: ['Kitchen', 'Laundry', 'Free Parking'],
  },
  {
    id: 4,
    name: 'Nicon Luxury Hotel',
    location: '19, Muhammadu Buhari Way',
    price: 35000,
    rating: 4.3,
    image: '/nicon.jpg',
    amenities: ['Pool', 'Conference Rooms', 'Bar'],
  },
]

export default function PopularHotels() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Popular Hotels in Abuja</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our most booked accommodations in Nigeria's capital city
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
                  <span className="text-yellow-500 mr-1">★</span>
                  <span className="font-medium">{hotel.rating}</span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold mb-1">{hotel.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{hotel.location}</p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <span
                      key={amenity}
                      className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="text-lg font-bold">₦{hotel.price.toLocaleString()}</span>
                  <Link
                    href={`/hotels/${hotel.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/hotels"
            className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            View All Hotels
          </Link>
        </div>
      </div>
    </section>
  )
}