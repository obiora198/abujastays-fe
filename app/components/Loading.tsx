import React from "react";
import LoadingSpinner from "./LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center py-8">
      <LoadingSpinner size="lg" />
    </div>
  );
}
  
  // For page-level loading states, create app/loading.tsx:
  export function PageLoading() {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading Abuja's best hotels...</p>
        </div>
      </div>
    )
  }