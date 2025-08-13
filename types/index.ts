// types/index.ts
export interface Hotel {
    id: number;
    name: string;
    location: string;
    price: number;
    rating: number;
    image: string;
    description?: string;
    amenities?: string[];
    rooms?: Room[];
  }
  
  export interface Room {
    id: number;
    type: string;
    price: number;
    capacity: number;
    available: number;
    amenities: string[];
  }
  
  export interface Booking {
    id: string;
    hotelId: number;
    userId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    totalPrice: number;
    status: 'confirmed' | 'pending' | 'cancelled';
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    bookings: string[]; // Array of booking IDs
  }
  
  export interface SearchParams {
    location: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    minPrice?: number;
    maxPrice?: number;
    amenities?: string[];
    rating?: number;
  }