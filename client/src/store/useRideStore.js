import { create } from "zustand";
import { persist } from "zustand/middleware";
import axiosInstance from "../utils/axios";
import useAuthStore from "./useAuthStore";

const useRideStore = create(
  persist(
    (set, get) => ({
      // State
      rides: [],
      offeredRides: [],
      bookedRides: [],
      isLoading: false,
      isLoadingBookings: false,
      isLoadingOfferings: false,

      // Actions
      // Offer a ride
      offerRide: async (rideData) => {
        set({ isLoading: true });
        try {
          const token = get().getToken();
          const response = await axiosInstance.post("/rides", rideData, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status === "success") {
            set((state) => ({
              offeredRides: [...state.offeredRides, response.data.data.ride],
            }));
          }
        } catch (error) {
          throw new Error(get().handleError(error));
        } finally {
          set({ isLoading: false });
        }
      },

      // Search for a ride with pagination
      // searchRides: async (searchParams, page = 1, limit = 10) => {
      searchRides: async (searchParams) => {
        set({ isLoading: true, rides: [] }); // Clear rides when searching
        try {
          const token = get().getToken();
          const headers = token ? { Authorization: `Bearer ${token}` } : {};
          const response = await axiosInstance.get("/rides/search", {
            // params: { ...searchParams, page, limit },
            params: { ...searchParams },
            headers,
          });

          if (response.data.status === "success") {
            set({ rides: response.data.data.rides });
          }
        } catch (error) {
          console.log(error);
          throw new Error(get().handleError(error));
        } finally {
          set({ isLoading: false });
        }
      },

      // Book a ride
      bookRide: async (rideId) => {
        try {
          const token = get().getToken();
          const response = await axiosInstance.post(`/rides/${rideId}`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status === "success") {
            set((state) => ({
              bookedRides: [...state.bookedRides, response.data.data.ride],
            }));
          }
        } catch (error) {
          throw new Error(get().handleError(error));
        }
      },

      // Cancel an offered ride
      cancelRide: async (rideId) => {
        set({ isLoading: true });
        try {
          const token = get().getToken();
          const response = await axiosInstance.delete(`/rides/${rideId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.data.status === "success") {
            set((state) => ({
              offeredRides: state.offeredRides.filter((ride) => ride.id !== rideId),
            }));
          }
        } catch (error) {
          throw new Error(get().handleError(error));
        } finally {
          set({ isLoading: false });
        }
      },

      // Cancel a bookking
      cancelBooking: async (rideId) => {
        set({ isLoading: true });
        try {
          const token = get().getToken();
          const response = await axiosInstance.patch(
            `/rides/cancel-booking/${rideId}`,
            null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.data.status === "success") {
            set((state) => ({
              bookedRides: state.bookedRides.filter((ride) => ride.id !== rideId),
            }));
          }
        } catch (error) {
          throw new Error(get().handleError(error));
        } finally {
          set({ isLoading: false });
        }
      },

      // Fetch rides offered by the user with pagination
      // fetchOfferedRides: async (page = 1, limit = 10) => {
      fetchOfferedRides: async () => {
        set({ isLoadingOfferings: true });
        try {
          const token = get().getToken();
          const response = await axiosInstance.get("/rides/offered", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // params: { page, limit },
          });

          if (response.data.status === "success") {
            set({ offeredRides: response.data.data.rides });
          }
        } catch (error) {
          throw new Error(get().handleError(error));
        } finally {
          set({ isLoadingOfferings: false });
        }
      },

      // Fetch rides booked by the user with pagination
      // fetchBookedRides: async (page = 1, limit = 10) => {
      fetchBookedRides: async () => {
        set({ isLoadingBookings: true });
        try {
          const token = get().getToken();
          const response = await axiosInstance.get("/rides/booked", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // params: { page, limit },
          });

          if (response.data.status === "success") {
            set({ bookedRides: response.data.data.rides });
          }
        } catch (error) {
          throw new Error(get().handleError(error));
        } finally {
          set({ isLoadingBookings: false });
        }
      },

      // Utility: Get token from the auth store
      getToken: () => {
        return useAuthStore.getState().token || null;
      },

      // Reset state
      resetState: () => {
        set({ rides: [], offeredRides: [], bookedRides: [], isLoading: false });
      },

      // Utility: Handle errors
      handleError: (error) => {
        if (error.response) {
          return error.response.data.message || "An error occurred.";
        } else if (error.request) {
          return "Network error. Please check your internet connection.";
        } else {
          return "An unexpected error occurred.";
        }
      },
    }),
    {
      name: "ride-store",
      partialize: (state) => ({
        rides: state.rides,
        offeredRides: state.offeredRides,
        bookedRides: state.bookedRides,
      }),
    }
  )
);

export default useRideStore;
