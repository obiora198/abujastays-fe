// context/BookingContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

type Dates = {
  checkIn: string
  checkOut: string
}

type BookingContextType = {
  booking: any | null
  setBooking: (booking: any | null) => void
  dates: Dates
  setDates: (dates: Dates) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [booking, setBooking] = useState<any | null>(null)
  const [dates, setDates] = useState<Dates>({ checkIn: '', checkOut: '' })

  return (
    <BookingContext.Provider value={{ booking, setBooking, dates, setDates }}>
      {children}
    </BookingContext.Provider>
  )
}

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
