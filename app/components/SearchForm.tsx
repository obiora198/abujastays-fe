'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from './LoadingSpinner';

// Popular locations in Abuja
const popularLocations = [
  "Central Area", "Garki", "Wuse", "Maitama", "Asokoro", 
  "Jabi", "Utako", "Gwarinpa", "Kubwa", "Lugbe", 
  "Apo", "Gudu", "Durumi", "Wuye", "Jahi", "Kado"
];

// Available amenities for filtering
const amenitiesList = [
  { id: 'wifi', label: 'Free WiFi' },
  { id: 'pool', label: 'Swimming Pool' },
  { id: 'spa', label: 'Spa' },
  { id: 'gym', label: 'Fitness Center' },
  { id: 'breakfast', label: 'Free Breakfast' },
  { id: 'parking', label: 'Free Parking' },
  { id: 'airport', label: 'Airport Shuttle' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'bar', label: 'Bar/Lounge' },
  { id: 'roomService', label: 'Room Service' },
  { id: 'concierge', label: 'Concierge' },
  { id: 'business', label: 'Business Center' }
];

export default function SearchForm() {
  const [location, setLocation] = useState('Central Area');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);
  const router = useRouter();
  const locationRef = useRef<HTMLDivElement>(null);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
      if (amenitiesRef.current && !amenitiesRef.current.contains(event.target as Node)) {
        setShowAmenitiesDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle location input changes
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
    
    if (value.length > 1) {
      const filtered = popularLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
    } else {
      setLocationSuggestions(popularLocations);
    }
    
    setShowLocationDropdown(true);
  };

  // Select a location from suggestions
  const selectLocation = (selectedLocation: string) => {
    setLocation(selectedLocation);
    setShowLocationDropdown(false);
  };

  // Toggle amenity selection
  const toggleAmenity = (amenityId: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityId) 
        ? prev.filter(id => id !== amenityId) 
        : [...prev, amenityId]
    );
  };

  // Handle search form submission
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Build query parameters
    const params = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests: guests.toString(),
    });
    
    // Add amenities if any are selected
    if (selectedAmenities.length > 0) {
      params.append('amenities', selectedAmenities.join(','));
    }
    
    // Simulate loading
    setTimeout(() => {
      router.push(`/hotels?${params.toString()}`);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="container-responsive -mt-12 relative z-10">
      <form 
        onSubmit={handleSearch}
        className="bg-white rounded-lg shadow-xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {/* Location with dropdown */}
        <div className="sm:col-span-1 relative" ref={locationRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              onFocus={() => {
                setShowLocationDropdown(true);
                setLocationSuggestions(popularLocations);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Where in Abuja?"
            />
            {showLocationDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {locationSuggestions.length > 0 ? (
                  locationSuggestions.map((loc, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                      onClick={() => selectLocation(loc)}
                    >
                      {loc}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No locations found</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Check-in */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Check-out */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min={checkIn || new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Guests */}
        <div className="sm:col-span-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
              <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
            ))}
          </select>
        </div>

        {/* Amenities Dropdown */}
        <div className="sm:col-span-1 relative" ref={amenitiesRef}>
          <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowAmenitiesDropdown(!showAmenitiesDropdown)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-left flex justify-between items-center"
            >
              <span>{selectedAmenities.length > 0 ? `${selectedAmenities.length} selected` : 'Any'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showAmenitiesDropdown && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                <div className="p-2">
                  {amenitiesList.map(amenity => (
                    <label key={amenity.id} className="flex items-center px-2 py-1 hover:bg-blue-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedAmenities.includes(amenity.id)}
                        onChange={() => toggleAmenity(amenity.id)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm">{amenity.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Search Button */}
        <div className="sm:col-span-full">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
          >
            {loading && <LoadingSpinner size="sm" />}
            {loading ? "Searching..." : "Search Hotels"}
          </button>
        </div>
      </form>
    </div>
  );
}