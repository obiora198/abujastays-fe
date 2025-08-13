// context/UserContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

type DashboardView = 'bookings' | 'listings'

type UserContextType = {
  dashboardView: DashboardView
  setDashboardView: (view: DashboardView) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [dashboardView, setDashboardView] = useState<DashboardView>('bookings')

  return (
    <UserContext.Provider value={{ dashboardView, setDashboardView }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUserContext must be used within a UserProvider')
  return ctx
}
