"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_REVIEWS_BY_PROPERTY } from "../../lib/gql/queries";
import { CREATE_REVIEW } from "../../lib/gql/mutations";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import LoadingSpinner from "./LoadingSpinner";
import { Star, User, Calendar, MessageSquare } from "lucide-react";

interface Review {
  _id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
}

interface ReviewSectionProps {
  propertyId: string;
  reviews?: Review[];
}

export default function ReviewSection({ propertyId, reviews: initialReviews }: ReviewSectionProps) {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery(GET_REVIEWS_BY_PROPERTY, {
    variables: { propertyId },
    fetchPolicy: "network-only",
    skip: !!initialReviews,
  });
  
  const [createReview, { loading: submitting }] = useMutation(CREATE_REVIEW);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoverRating, setHoverRating] = useState(0);
  const { showToast } = useToast();

  const reviews = initialReviews || data?.reviewsByProperty || [];
  const averageRating = reviews.length 
    ? (reviews.reduce((sum: number, review: Review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "0.0";

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

  const renderStars = (rating: number, size = "w-4 h-4") => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`${size} ${
          i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Guest Reviews</h2>
        {reviews.length > 0 && (
          <div className="flex items-center">
            <div className="flex mr-2">{renderStars(Number(averageRating), "w-5 h-5")}</div>
            <span className="text-lg font-semibold">{averageRating}</span>
            <span className="text-gray-500 ml-1">({reviews.length} reviews)</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner size="md" />
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-red-500">Failed to load reviews.</p>
          <button
            onClick={() => refetch()}
            className="text-blue-600 hover:text-blue-700 mt-2"
          >
            Try again
          </button>
        </div>
      ) : (
        <div className="space-y-6 mb-8">
          {reviews.length > 0 ? (
            reviews.map((review: Review) => (
              <div key={review._id} className="border-l-4 border-blue-100 pl-4 py-2">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {review.user?.name || "Anonymous Guest"}
                      </h4>
                      <div className="flex items-center">
                        {renderStars(review.rating)}
                        <span className="text-sm text-gray-500 ml-2">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      )}

      {user && (
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Share your experience</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your rating
              </label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= (hoverRating || rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      } transition-colors`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share details of your experience at this property..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !rating || !comment.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center"
            >
              {submitting ? (
                <>
                  <LoadingSpinner size="sm" className="mr-2" />
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      )}

      {!user && (
        <div className="text-center py-6 border-t">
          <p className="text-gray-600">
            Please{" "}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              sign in
            </button>{" "}
            to leave a review.
          </p>
        </div>
      )}
    </section>
  );
}