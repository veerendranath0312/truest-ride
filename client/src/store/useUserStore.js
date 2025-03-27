import { create } from "zustand";
import axiosInstance from "../utils/axios";

const useUserStore = create((set) => ({
  // State
  user: null,
  isLoading: false,

  // Actions
  fetchUser: async (userId) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get(`/users/${userId}`);

      if (response.data.status === "success") {
        set({ user: response.data.data.user });
      }
    } catch (error) {
      throw new Error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
