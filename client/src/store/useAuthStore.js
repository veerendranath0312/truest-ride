import { create } from "zustand";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axios";
import useRideStore from "./useRideStore";
import useChatStore from "./useChatStore";

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  otpSent: false,
  token: localStorage.getItem("authToken") || null,
  isAuthenticated: false,
  isSigningIn: false,
  isSigningUp: false,
  tokenExpirationTimer: null,

  // Actions
  setOtpSent: (otpSent) => set({ otpSent }),

  setupTokenExpirationTimer: (token) => {
    // Clear any existing timer
    const currentTimer = get().tokenExpirationTimer;
    if (currentTimer) {
      clearTimeout(currentTimer);
    }

    try {
      const decoded = jwtDecode(token);
      const expirationTime = decoded.exp * 1000; // Convert to milliseconds
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      if (timeUntilExpiration <= 0) {
        // Token is already expired
        get().handleTokenExpiration();
        return;
      }

      // Set new timer
      const timer = setTimeout(() => {
        get().signOut();
      }, timeUntilExpiration);

      set({ tokenExpirationTimer: timer });
    } catch (err) {
      // If decoding fails, consider the token invalid
      get().signOut();
      throw new Error(err.message);
    }
  },

  signIn: async (email) => {
    set({ isSigningIn: true });
    try {
      const response = await axiosInstance.post("/auth/signin", { email });

      if (response.data.status === "success") {
        set({ otpSent: true });
      }
    } catch (error) {
      if (error.response) {
        throw new Error(
          error.response.data.message || "An error occurred while sending OTP."
        );
      } else if (error.request) {
        throw new Error(
          "Network error. Please check your internet connection and try again."
        );
      } else {
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
        get().setupTokenExpirationTimer(token);

        // Save token to local storage and update state
        set({
          token,
          user,
          isAuthenticated: true,
          otpSent: false,
        });
        localStorage.setItem("authToken", token);

        // Initialize socket connection after successful sign in
        useChatStore.getState().initializeSocket();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to verify OTP.");
      } else if (error.request) {
        throw new Error(
          "Network error. Please check your internet connection and try again."
        );
      } else {
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
        throw new Error(
          error.response.data.message || "An error occurred while sending OTP."
        );
      } else if (error.request) {
        throw new Error(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  verifySignUp: async (fullname, email, otp) => {
    set({ isSigningUp: true });
    try {
      const response = await axiosInstance.post("/auth/verify-signup", {
        fullname,
        email,
        otp,
      });

      if (response.data.status === "success") {
        const { token, user } = response.data.data;
        get().setupTokenExpirationTimer(token);

        // Save token to local storage and update state
        set({
          token,
          user,
          isAuthenticated: true,
          otpSent: false,
        });
        localStorage.setItem("authToken", token);

        // Initialize socket connection after successful sign up
        useChatStore.getState().initializeSocket();
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        throw new Error(error.response.data.message || "Failed to verify OTP.");
      } else if (error.request) {
        throw new Error(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        throw new Error("An unexpected error occurred. Please try again.");
      }
    } finally {
      set({ isSigningUp: false });
    }
  },

  signOut: () => {
    // Disconnect socket connection before signing out
    useChatStore.getState().disconnectSocket();

    // Clear token expiration timer
    const currentTimer = get().tokenExpirationTimer;
    if (currentTimer) {
      clearTimeout(currentTimer);
    }

    // Clear local storage and reset state
    localStorage.removeItem("authToken");
    set({
      user: null,
      token: null,
      isAuthenticated: false,
      otpSent: false,
      tokenExpirationTimer: null,
    });

    // Reset other stores
    useRideStore.getState().resetState();
    useChatStore.getState().resetState();
  },

  checkAuth: () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const isTokenValid = get().isTokenValid(token);
      if (isTokenValid) {
        // Update axios default headers
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Setup expiration timer and update state
        get().setupTokenExpirationTimer(token);
        set({ token, isAuthenticated: true });

        // Initialize socket connection if token is valid
        useChatStore.getState().initializeSocket();
      } else {
        get().signOut();
      }
    }
  },

  isTokenValid: (token) => {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp > currentTime; // Check if token is still valid
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      return false; // If decoding fails, consider the token invalid
    }
  },
}));

export default useAuthStore;
