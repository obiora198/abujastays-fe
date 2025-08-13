"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROPERTY } from "../../lib/gql/mutations";
import { useToast } from "../../context/ToastContext";
import PropertyForm from "./PropertyForm";
import LoadingSpinner from "./LoadingSpinner";

interface PropertyManagerCardProps {
  property: any;
  onUpdate?: () => void;
}

export default function PropertyManagerCard({ property, onUpdate }: PropertyManagerCardProps) {
  const [showEditForm, setShowEditForm] = useState(false);
  const [deleteProperty, { loading: deleting }] = useMutation(DELETE_PROPERTY);
  const { showToast } = useToast();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteProperty({
          variables: { id: property._id },
        });
        showToast("success", "Property deleted successfully!");
        onUpdate?.();
      } catch (error: any) {
        showToast("error", error.message || "Failed to delete property");
      }
    }
  };

  if (showEditForm) {
    return (
      <div className="border rounded-lg p-4 bg-gray-50">
        <PropertyForm
          property={property}
          onSuccess={() => {
            setShowEditForm(false);
            onUpdate?.();
          }}
          onCancel={() => setShowEditForm(false)}
        />
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{property.name}</h3>
          <p className="text-gray-600">{property.location}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEditForm(true)}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 flex items-center gap-1"
          >
            {deleting && <LoadingSpinner size="sm" />}
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>

      {property.images?.[0] && (
        <img
          src={property.images[0]}
          alt={property.name}
          className="w-full h-32 object-cover rounded mb-4"
        />
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="font-medium">Price per Night:</span>
          <p>₦{property.pricePerNight?.toLocaleString()}</p>
        </div>
        <div>
          <span className="font-medium">Status:</span>
          <p className={property.verified ? "text-green-600" : "text-yellow-600"}>
            {property.verified ? "Verified" : "Pending"}
          </p>
        </div>
        <div>
          <span className="font-medium">Total Bookings:</span>
          <p>{property.bookings?.length || 0}</p>
        </div>
        <div>
          <span className="font-medium">Created:</span>
          <p>{new Date(property.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {property.description && (
        <p className="text-gray-600 mt-4 text-sm">{property.description}</p>
      )}
    </div>
  );
} 