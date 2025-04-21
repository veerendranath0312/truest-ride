import { create } from "zustand";
import axiosInstance from "../utils/axios";
import useAuthStore from "./useAuthStore";

const useUserStore = create((set) => ({
  // State
  currentUser: null,
  isLoading: false,

  // Actions
  fetchUser: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });

      if (response.data.status === "success") {
        set({ currentUser: response.data.data.user });
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateUser: async (userId, userData) => {
    try {
      const response = await axiosInstance.patch(`/users/${userId}`, userData, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });

      if (response.data.status === "success") {
        set({ currentUser: response.data.data.user });
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  initiateDeleteAccount: async (email) => {
    try {
      const response = await axiosInstance.post(
        "/users/initiate-delete",
        { email },
        {
          headers: {
            Authorization: `Bearer ${useAuthStore.getState().token}`,
          },
        }
      );

      if (response.data.status !== "success") {
        throw new Error(response.data.message);
      }

      return response.data.message;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Failed to initiate account deletion."
      );
    }
  },

  deleteAccount: async (email, otp) => {
    try {
      const response = await axiosInstance.delete("/users", {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
        data: { email, otp }, // Use 'data' property to send body with DELETE request
      });

      if (response.data.status === "success") {
        set({ currentUser: null });
        // Call signOut from useAuthStore which will handle setting the user to null.
        useAuthStore.getState().signOut();
      }
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete account");
    }
  },
}));

export default useUserStore;
