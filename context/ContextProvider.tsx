'use client'

import { ReactNode } from 'react'
import { AuthProvider } from './AuthContext'
import { BookingProvider } from './BookingContext'
import { PropertyProvider } from './PropertyContext'
import { UserProvider } from './UserContext'
import { ReviewProvider } from './ReviewContext'
import { ToastProvider } from './ToastContext'

export default function AppContextProvider({ children }: { children: ReactNode }) {
  return (
    <ToastProvider>
      <AuthProvider>
        <UserProvider>
          <PropertyProvider>
            <BookingProvider>
              <ReviewProvider>
                {children}
              </ReviewProvider>
            </BookingProvider>
          </PropertyProvider>
        </UserProvider>
      </AuthProvider>
    </ToastProvider>
  )
}
