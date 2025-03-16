import { create } from "zustand";

// The useRideStore is a store that will handle the things related to rides
// - Offering a ride
//   - The user can offer a ride
//   - It means creating a ride / storing the ride in the database
//   - In order to make a request to the /rides endpoint, we need to send the Bearer token in the Authorization header
// - Searching for a ride
//   - The user can search for a ride
//   - It means finding a ride / fetching the ride from the database
//   - In order to make a request to the /rides/search endpoint, we may or may not send the Bearer token in the Authorization header
//   - This particular route is a partially protected route
//     - It means that the user can search for a ride without being authenticated
//     - But if the user is authenticated, the user can see more details about the ride
// - Booking the ride
//  - The user can book a ride
//  - It means updating the ride in the database
//  - In order to make a request to the /rides/:id endpoint, we need to send the Bearer token in the Authorization header
// - Cancelling the ride
//  - The user can cancel a ride
//  - It means deleting the ride from the database
//  - In order to make a request to the /rides/:id endpoint, we need to send the Bearer token in the Authorization header
// - Cancel booking
//  - The user can cancel a booking
//  - It means updating the ride in the database
//  - In order to make a request to the /rides/:id endpoint, we need to send the Bearer token in the Authorization header
// - Fetching rides that are offered by the user
//   - The user can see the rides that are offered by the user
//   - It means fetching the rides from the database
//   - In order to make a request to the /rides/offered endpoint, we need to send the Bearer token in the Authorization header
// - Fetching rides that are booked by the user
//   - The user can see the rides that are booked by the user
//   - It means fetching the rides from the database
//   - In order to make a request to the /rides/booked endpoint, we need to send the Bearer token in the Authorization header
