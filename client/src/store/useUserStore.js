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

  deleteAccount: async () => {
    try {
      const response = await axiosInstance.delete("/users", {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });

      if (response.data.status === "success") {
        set({ currentUser: null });
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
}));

export default useUserStore;
