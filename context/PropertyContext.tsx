// context/PropertyContext.tsx
import { createContext, useContext, useState, ReactNode } from 'react'

type Filters = {
  location: string
  priceRange: [number, number]
}

type PropertyContextType = {
  properties: any[]
  setProperties: (properties: any[]) => void
  selectedProperty: any | null
  setSelectedProperty: (property: any | null) => void
  filters: Filters
  setFilters: (filters: Filters) => void
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export const PropertyProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<any[]>([])
  const [selectedProperty, setSelectedProperty] = useState<any | null>(null)
  const [filters, setFilters] = useState<Filters>({ location: '', priceRange: [0, 100000] })

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties,
        selectedProperty,
        setSelectedProperty,
        filters,
        setFilters,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export const useProperty = () => {
  const context = useContext(PropertyContext)
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider')
  }
  return context
}
