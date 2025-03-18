import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axios";
import useRideStore from "./useRideStore";

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  otpSent: false,
  token: localStorage.getItem("authToken") || null, // Initialize from local storage
  isAuthenticated: false,
  isSigningIn: false,
  isSigningUp: false,

  // Actions
  setOtpSent: (otpSent) => set({ otpSent }),

  signIn: async (email) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/signin", { email });

      if (response.data.status === "success") {
        set({ otpSent: true });
      }
    } catch (error) {
      if (error.response) {
        // Server-side error
        throw new Error(error.response.data.message || "An error occurred while sending OTP.");
      } else if (error.request) {
        // Network error
        throw new Error("Network error. Please check your internet connection and try again.");
      } else {
        // Unexpected error
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isSigningIn: false });
    }
  },

  verifySignIn: async (email, otp) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/verify-signin", { email, otp });

      if (response.data.status === "success") {
        const { token, user } = response.data.data;

        // Save token to local storage
        set({
          token,
          user,
          isAuthenticated: true,
          otpSent: false,
        });
        localStorage.setItem("authToken", token);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Server-side error
        throw new Error(error.response.data.message || "Failed to verify OTP.");
      } else if (error.request) {
        // Network error
        throw new Error("Network error. Please check your internet connection and try again.");
      } else {
        // Unexpected error
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isSigningIn: false });
    }
  },

  signUp: async (fullname, email) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/signup", { fullname, email });

      if (response.data.status === "success") {
        set({ otpSent: true });
      }
    } catch (error) {
      if (error.response) {
        // Server-side error
        throw new Error(error.response.data.message || "An error occurred while sending OTP.");
      } else if (error.request) {
        // Network error
        throw new Error("Network error. Please check your internet connection and try again.");
      } else {
        // Unexpected error
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifySignUp: async (fullname, email, otp) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/verify-signup", { fullname, email, otp });

      if (response.data.status === "success") {
        const { token, user } = response.data.data;

        // Save token to local storage
        set({
          token,
          user,
          isAuthenticated: true,
          otpSent: false,
        });
        localStorage.setItem("authToken", token);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Server-side error
        throw new Error(error.response.data.message || "Failed to verify OTP.");
      } else if (error.request) {
        // Network error
        throw new Error("Network error. Please check your internet connection and try again.");
      } else {
        // Unexpected error
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  signOut: () => {
    set({ user: null, token: null, isAuthenticated: false, otpSent: false });
    localStorage.removeItem("authToken");
    useRideStore.getState().resetState();
  },

  checkAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const isTokenValid = get().isTokenValid(token);
      if (isTokenValid) {
        set({ token, isAuthenticated: true });
      } else {
        set({ token: null, isAuthenticated: false });
        localStorage.removeItem("authToken");
      }
    }
  },

  isTokenValid: (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp >= currentTime; // Check if token is still valid
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return false; // If decoding fails, consider the token invalid
    }
  },
}));

export default useAuthStore;

// TODO: Are we making sure that the user is logged out from the store when the token expires?
