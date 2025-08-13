import { gql } from "@apollo/client";

export const GET_REVIEWS_BY_PROPERTY = gql`
  query ReviewsByProperty($propertyId: ID!) {
    reviewsByProperty(propertyId: $propertyId) {
      _id
      rating
      comment
      createdAt
      user {
        id
        name
        avatar
      }
    }
  }
`;

// Optionally, add property details query if needed for review context
export const GET_PROPERTY_DETAILS = gql`
  query Property($id: ID!) {
    property(id: $id) {
      _id
      name
      location
      images
      pricePerNight
      reviews {
        _id
        rating
        comment
        createdAt
        user {
          id
          name
          avatar
        }
      }
    }
  }
`;

export const GET_PROPERTIES = gql`
  query Properties($location: String, $maxPrice: Int) {
    properties(location: $location, maxPrice: $maxPrice) {
      id
      name
      location
      images
      pricePerNight
      owner {
        id
        name
      }
      reviews {
        id
        rating
      }
    }
  }
`;

export const GET_MY_PROPERTIES = gql`
  query MyProperties {
    myProperties {
      _id
      name
      location
      images
      pricePerNight
      verified
      createdAt
      bookings {
        _id
        checkIn
        checkOut
        status
        user {
          id
          name
        }
      }
    }
  }
`;

export const GET_USER_BOOKINGS = gql`
  query UserBookings {
    bookingsByUser {
      id
      checkIn
      checkOut
      totalPrice
      status
      paymentReference
      paymentStatus
      createdAt
      property {
        id
        name
        location
        images
      }
    }
  }
`;

export const GET_USER_REVIEWS = gql`
  query UserReviews {
    reviewsByUser {
      _id
      rating
      comment
      createdAt
      property {
        _id
        name
        location
      }
    }
  }
`;
