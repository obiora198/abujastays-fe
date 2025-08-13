# Abuja Booking App

A modern hotel booking platform built with Next.js 15, Apollo GraphQL, and Node.js.

## Features

- 🏨 **Property Listings** - Browse and search hotels in Abuja
- 🔐 **Authentication** - Email/password and Google OAuth login
- 📅 **Booking System** - Reserve properties with date selection
- ⭐ **Reviews & Ratings** - Leave and view property reviews
- 👨‍💼 **Manager Dashboard** - Property management for hotel owners
- 📱 **Responsive Design** - Mobile-first design approach
- 🔔 **Real-time Notifications** - Toast notifications for user feedback

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **Apollo Client** - GraphQL client
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript

### Backend
- **Node.js** - JavaScript runtime
- **Apollo Server** - GraphQL server
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **Nodemailer** - Email service
- **Cloudinary** - Image upload service

## Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd hotel-booking-app
```

### 2. Backend Setup
```bash
cd abuja-booking-backend

# Install dependencies
npm install

# Copy environment variables
cp env.example .env

# Edit .env with your configuration
# See Environment Variables section below

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
cd abuja-booking-frontend

# Install dependencies
npm install

# Copy environment variables
cp env.example .env.local

# Edit .env.local with your configuration
# See Environment Variables section below

# Start development server
npm run dev
```

### 4. Seed Database (Optional)
```bash
cd abuja-booking-backend
npm run seed
```

This creates sample users and properties for testing:
- **Traveler**: traveler@example.com / password123
- **Manager**: manager@example.com / password123

## Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/abuja-booking

# JWT Secret
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
EMAIL_FROM=your_email@gmail.com

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (.env.local)
```env
# GraphQL API URL
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:5000/graphql

# Frontend URL
NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
```

## API Documentation

### GraphQL Endpoint
- **Development**: http://localhost:5000/graphql
- **Playground**: http://localhost:5000/graphql (Apollo Studio)

### Key Queries & Mutations

#### Authentication
```graphql
mutation Register($input: RegisterInput!) {
  register(input: $input) {
    token
    user { id name email role }
  }
}

mutation Login($input: LoginInput!) {
  login(input: $input) {
    token
    user { id name email role }
  }
}
```

#### Properties
```graphql
query Properties($location: String) {
  properties(location: $location) {
    _id name location pricePerNight images
  }
}

mutation CreateProperty($input: PropertyInput!) {
  createProperty(input: $input) {
    _id name location pricePerNight
  }
}
```

#### Bookings
```graphql
mutation CreateBooking($propertyId: ID!, $checkIn: String!, $checkOut: String!) {
  createBooking(propertyId: $propertyId, checkIn: $checkIn, checkOut: $checkOut) {
    _id totalPrice status
  }
}
```

## Deployment

### Backend (Render/Heroku)
1. Connect your repository
2. Set environment variables
3. Deploy with Node.js buildpack

### Frontend (Vercel)
1. Connect your repository
2. Set environment variables
3. Deploy automatically on push

## Project Structure

```
hotel-booking-app/
├── abuja-booking-backend/
│   ├── config/          # Configuration files
│   ├── graphql/         # GraphQL schemas & resolvers
│   ├── models/          # Mongoose models
│   ├── middleware/      # Express middleware
│   ├── services/        # Business logic
│   ├── utils/           # Utility functions
│   └── scripts/         # Database scripts
└── abuja-booking-frontend/
    ├── app/             # Next.js App Router
    ├── components/      # React components
    ├── context/         # React context providers
    ├── lib/             # Utility libraries
    └── types/           # TypeScript types
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
