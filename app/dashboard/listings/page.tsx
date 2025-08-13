"use client";
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_PROPERTIES } from "@/lib/gql/queries";
import PropertyManagerCard from "../../components/PropertyManagerCard";
import PropertyForm from "../../components/PropertyForm";
import AuthGuard from "../../components/AuthGuard";

export default function ManagerListings() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { data, loading, refetch } = useQuery(GET_MY_PROPERTIES);
  
  return (
    <AuthGuard requiredRole="manager">
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Your Properties</h1>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Create Property
          </button>
        </div>

        {showCreateForm && (
          <div className="mb-6 border rounded-lg p-4 bg-gray-50">
            <PropertyForm
              onSuccess={() => {
                setShowCreateForm(false);
                refetch();
              }}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-6">
            {data?.myProperties?.map((property: any) => (
              <PropertyManagerCard 
                key={property._id} 
                property={property} 
                onUpdate={refetch}
              />
            ))}
            {data?.myProperties?.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No properties found. Create your first property to get started.
              </p>
            )}
          </div>
        )}
      </div>
    </AuthGuard>
  );
}