import { gql } from "@apollo/client";

export const CREATE_BOOKING = gql`
  mutation CreateBooking($propertyId: ID!, $checkIn: String!, $checkOut: String!) {
    createBooking(propertyId: $propertyId, checkIn: $checkIn, checkOut: $checkOut) {
      _id
      property {
        _id
        name
      }
      user {
        _id
        name
      }
      checkIn
      checkOut
      totalPrice
      status
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation LeaveReview($propertyId: ID!, $rating: Int!, $comment: String!) {
    leaveReview(propertyId: $propertyId, rating: $rating, comment: $comment) {
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

export const CREATE_PROPERTY = gql`
  mutation CreateProperty($input: PropertyInput!) {
    createProperty(input: $input) {
      _id
      name
      location
      description
      pricePerNight
      images
      owner {
        _id
        name
      }
    }
  }
`;

export const UPDATE_PROPERTY = gql`
  mutation UpdateProperty($id: ID!, $input: PropertyInput!) {
    updateProperty(id: $id, input: $input) {
      _id
      name
      location
      description
      pricePerNight
      images
      owner {
        _id
        name
      }
    }
  }
`;

export const DELETE_PROPERTY = gql`
  mutation DeleteProperty($id: ID!) {
    deleteProperty(id: $id)
  }
`;

export const INITIALIZE_PAYMENT = gql`
  mutation InitializePayment($bookingId: ID!) {
    initializePayment(bookingId: $bookingId) {
      success
      authorizationUrl
      reference
      amount
      error
    }
  }
`;

export const VERIFY_PAYMENT = gql`
  mutation VerifyPayment($reference: String!) {
    verifyPayment(reference: $reference) {
      success
      booking {
        _id
        status
        paymentStatus
        totalPrice
        property {
          _id
          name
        }
      }
      message
      error
    }
  }
`;