"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import AuthGuard from "../components/AuthGuard";
import BookingList from "../components/BookingList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            
            {/* Bookings Section */}
            <div className="bg-white rounded-lg shadow p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">My Bookings</h2>
              <BookingList />
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="flex gap-4">
                <button 
                  onClick={() => window.location.href = "/hotels"}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Browse Properties
                </button>
                {user?.role === "manager" && (
                  <button 
                    onClick={() => window.location.href = "/dashboard/listings"}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Manage Properties
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  );
} 