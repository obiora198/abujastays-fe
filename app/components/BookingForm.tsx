"use client";

import React,{ useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_BOOKING, INITIALIZE_PAYMENT } from '../../lib/gql/mutations';
import LoadingSpinner from './LoadingSpinner';
import { useToast } from '../../context/ToastContext';

export default function BookingForm({ propertyId }: { propertyId: string }) {
  const [createBooking, { loading: bookingLoading }] = useMutation(CREATE_BOOKING);
  const [initializePayment, { loading: paymentLoading }] = useMutation(INITIALIZE_PAYMENT);
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [bookingId, setBookingId] = useState<string | null>(null);
  const { showToast } = useToast();

  const loading = bookingLoading || paymentLoading;

  const handleSubmit = async () => {
    try {
      // First create the booking
      const bookingResult = await createBooking({
        variables: { propertyId, checkIn: dates.checkIn, checkOut: dates.checkOut }
      });

      const newBookingId = bookingResult.data.createBooking._id;
      setBookingId(newBookingId);

      // Then initialize payment
      const paymentResult = await initializePayment({
        variables: { bookingId: newBookingId }
      });

      if (paymentResult.data.initializePayment.success) {
        // Redirect to Paystack payment page
        window.location.href = paymentResult.data.initializePayment.authorizationUrl;
      } else {
        showToast('error', 'Payment initialization failed');
      }
    } catch (error: any) {
      showToast('error', error.message || 'Booking failed');
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Book this property</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-in Date
          </label>
          <input
            type="date"
            value={dates.checkIn}
            onChange={(e) => setDates({...dates, checkIn: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Check-out Date
          </label>
          <input
            type="date"
            value={dates.checkOut}
            onChange={(e) => setDates({...dates, checkOut: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
      </div>
      <button 
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2"
      >
        {loading && <LoadingSpinner size="sm" />}
        {loading ? 'Processing...' : 'Book Now'}
      </button>
    </div>
  );
}