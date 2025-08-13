// context/ReviewContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

type Review = {
  _id?: string
  rating: number
  comment: string
  propertyId?: string
  userId?: string
  createdAt?: string
}

type ReviewContextType = {
  reviews: Review[]
  setReviews: (reviews: Review[]) => void
  rating: number | null
  setRating: (rating: number | null) => void
  comment: string
  setComment: (comment: string) => void
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined)

export const ReviewProvider = ({ children }: { children: ReactNode }) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [rating, setRating] = useState<number | null>(null)
  const [comment, setComment] = useState<string>('')

  return (
    <ReviewContext.Provider value={{ reviews, setReviews, rating, setRating, comment, setComment }}>
      {children}
    </ReviewContext.Provider>
  )
}

export const useReview = () => {
  const context = useContext(ReviewContext)
  if (!context) throw new Error('useReview must be used within a ReviewProvider')
  return context
}
