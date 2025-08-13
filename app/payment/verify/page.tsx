"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useMutation } from '@apollo/client';
import { VERIFY_PAYMENT } from '../../../lib/gql/mutations';
import { useToast } from '../../../context/ToastContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function PaymentVerificationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [verifyPayment, { loading }] = useMutation(VERIFY_PAYMENT);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [verificationMessage, setVerificationMessage] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    const reference = searchParams.get('reference');
    const trxref = searchParams.get('trxref');

    if (!reference && !trxref) {
      setVerificationStatus('error');
      setVerificationMessage('No payment reference found');
      return;
    }

    const paymentReference = reference || trxref;

    const verifyPaymentStatus = async () => {
      try {
        const result = await verifyPayment({
          variables: { reference: paymentReference }
        });

        if (result.data.verifyPayment.success) {
          setVerificationStatus('success');
          setVerificationMessage('Payment verified successfully! Your booking has been confirmed.');
          showToast('success', 'Payment successful! Your booking is confirmed.');
          
          // Redirect to dashboard after 3 seconds
          setTimeout(() => {
            router.push('/dashboard');
          }, 3000);
        } else {
          setVerificationStatus('error');
          setVerificationMessage(result.data.verifyPayment.error || 'Payment verification failed');
          showToast('error', 'Payment verification failed');
        }
      } catch (error: any) {
        setVerificationStatus('error');
        setVerificationMessage(error.message || 'Payment verification failed');
        showToast('error', 'Payment verification failed');
      }
    };

    verifyPaymentStatus();
  }, [searchParams, verifyPayment, showToast, router]);

  const getStatusIcon = () => {
    switch (verificationStatus) {
      case 'success':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        );
      case 'error':
        return (
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      default:
        return <LoadingSpinner size="lg" />;
    }
  };

  const getStatusColor = () => {
    switch (verificationStatus) {
      case 'success':
        return 'text-green-600';
      case 'error':
        return 'text-red-600';
      default:
        return 'text-blue-600';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-6">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              {getStatusIcon()}
              
              <h2 className={`mt-4 text-xl font-semibold ${getStatusColor()}`}>
                {verificationStatus === 'pending' && 'Verifying Payment...'}
                {verificationStatus === 'success' && 'Payment Successful!'}
                {verificationStatus === 'error' && 'Payment Failed'}
              </h2>
              
              <p className="mt-2 text-gray-600">
                {verificationMessage}
              </p>
              
              {verificationStatus === 'pending' && (
                <p className="mt-4 text-sm text-gray-500">
                  Please wait while we verify your payment...
                </p>
              )}
              
              {verificationStatus === 'success' && (
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-4">
                    Redirecting to your dashboard...
                  </p>
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </button>
                </div>
              )}
              
              {verificationStatus === 'error' && (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => router.push('/dashboard')}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Go to Dashboard
                  </button>
                  <button
                    onClick={() => router.push('/hotels')}
                    className="w-full bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                  >
                    Browse Hotels
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
} 