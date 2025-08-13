"use client";

import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_PROPERTY, UPDATE_PROPERTY } from "../../lib/gql/mutations";
import { useToast } from "../../context/ToastContext";
import LoadingSpinner from "./LoadingSpinner";

interface PropertyFormProps {
  property?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function PropertyForm({ property, onSuccess, onCancel }: PropertyFormProps) {
  const [formData, setFormData] = useState({
    name: property?.name || "",
    location: property?.location || "",
    description: property?.description || "",
    pricePerNight: property?.pricePerNight || "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(property?.images || []);
  const [loading, setLoading] = useState(false);

  const [createProperty] = useMutation(CREATE_PROPERTY);
  const [updateProperty] = useMutation(UPDATE_PROPERTY);
  const { showToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement image upload to Cloudinary
      // For now, we'll use placeholder URLs
      const uploadedImages = imageUrls;

      const input = {
        ...formData,
        pricePerNight: Number(formData.pricePerNight),
        images: uploadedImages,
      };

      if (property) {
        await updateProperty({
          variables: { id: property._id, input },
        });
        showToast("success", "Property updated successfully!");
      } else {
        await createProperty({
          variables: { input },
        });
        showToast("success", "Property created successfully!");
      }

      onSuccess?.();
    } catch (err: any) {
      showToast("error", err.message || "Failed to save property");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Property Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price per Night (₦)
        </label>
        <input
          type="number"
          value={formData.pricePerNight}
          onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          required
          min="0"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Images
        </label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {imageUrls.length > 0 && (
          <div className="mt-2 grid grid-cols-3 gap-2">
            {imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Property ${index + 1}`}
                className="w-full h-20 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {loading && <LoadingSpinner size="sm" />}
          {loading ? "Saving..." : property ? "Update Property" : "Create Property"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
} 