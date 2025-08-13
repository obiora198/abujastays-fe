"use client";

import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USER_BOOKINGS } from '@/lib/gql/queries';
import LoadingSpinner from './LoadingSpinner';

interface Booking {
  _id: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  paymentReference: string;
  createdAt: string;
  property: {
    _id: string;
    name: string;
    location: string;
    images: string[];
  };
}

export default function BookingList() {
  const { data, loading, error } = useQuery(GET_USER_BOOKINGS);

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSpinner size="md" />
        <p className="text-gray-500 mt-2">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-lg">Failed to load bookings.</p>
        <p className="text-gray-500 mt-2">Please try again later.</p>
      </div>
    );
  }

  const bookings: Booking[] = data?.bookingsByUser || [];

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
        <p className="text-gray-500">Start exploring hotels to make your first booking.</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'payment_failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price);
  };

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div key={booking._id} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                {booking.property.images && booking.property.images[0] && (
                  <img
                    src={booking.property.images[0]}
                    alt={booking.property.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {booking.property.name}
                  </h3>
                  <p className="text-gray-600">{booking.property.location}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Check-in</p>
                  <p className="font-medium">{formatDate(booking.checkIn)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Check-out</p>
                  <p className="font-medium">{formatDate(booking.checkOut)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total</p>
                  <p className="font-medium">{formatPrice(booking.totalPrice)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
              
              {booking.paymentReference && (
                <div className="mt-3 text-sm">
                  <p className="text-gray-500">Payment Reference: <span className="font-mono">{booking.paymentReference}</span></p>
                </div>
              )}
            </div>
            
            <div className="ml-4 flex flex-col space-y-2">
              {booking.status === 'pending' && (
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Pay Now
                </button>
              )}
              {booking.status === 'confirmed' && (
                <span className="text-green-600 text-sm font-medium">
                  ✓ Confirmed
                </span>
              )}
              {booking.status === 'cancelled' && (
                <span className="text-red-600 text-sm font-medium">
                  Cancelled
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 