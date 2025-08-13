"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_REVIEWS_BY_PROPERTY } from "../../lib/gql/queries";
import { CREATE_REVIEW } from "../../lib/gql/mutations";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import LoadingSpinner from "./LoadingSpinner";

export default function ReviewSection({ propertyId }: { propertyId: string }) {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_REVIEWS_BY_PROPERTY, {
    variables: { propertyId },
    fetchPolicy: "network-only",
  });
  const [createReview, { loading: submitting }] = useMutation(CREATE_REVIEW);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState("");
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      showToast("error", "Please provide a rating and comment.");
      return;
    }
    try {
      await createReview({
        variables: { propertyId, rating, comment },
      });
      showToast("success", "Review submitted successfully!");
      setRating(0);
      setComment("");
      refetch();
    } catch (err: any) {
      showToast("error", err.message || "Failed to submit review");
    }
  };

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Reviews</h2>
      {loading ? (
        <p>Loading reviews...</p>
      ) : error ? (
        <p className="text-red-500">Failed to load reviews.</p>
      ) : (
        <div className="space-y-4 mb-6">
          {data?.reviewsByProperty?.length ? (
            data.reviewsByProperty.map((review: any) => (
              <div key={review._id} className="border rounded p-3">
                <div className="flex items-center mb-1">
                  <span className="font-semibold mr-2">{review.user?.name || "Anonymous"}</span>
                  <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  <span className="ml-2 text-xs text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      )}

      {user && (
        <form onSubmit={handleSubmit} className="border rounded p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Leave a review</h3>
          <div className="mb-2">
            <label className="block mb-1">Rating</label>
            <select
              value={rating}
              onChange={e => setRating(Number(e.target.value))}
              className="border rounded p-2"
              required
            >
              <option value={0}>Select rating</option>
              {[1,2,3,4,5].map(n => (
                <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>
              ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="border rounded p-2 w-full"
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 flex items-center gap-2"
          >
            {submitting && <LoadingSpinner size="sm" />}
            {submitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      )}
      {!user && <p className="text-gray-500">Log in to leave a review.</p>}
    </section>
  );
} 