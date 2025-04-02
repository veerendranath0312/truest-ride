import { create } from "zustand";
import { io } from "socket.io-client";
import axiosInstance from "../utils/axios";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  // State
  socket: null,
  isConnected: false,
  chats: [],
  currentChat: null,
  messages: [],
  isLoading: false,
  isLoadingMessages: false,

  // Actions
  initializeSocket: () => {
    let { socket } = get();

    // If socket is null or disconnected, create a new one
    if (!socket) {
      socket = io("http://127.0.0.1:5000");
      set({ socket });
    }

    // Only set up listeners if they haven't been set up yet
    if (socket && !socket._hasConnected) {
      socket.on("connect", () => {
        set({ isConnected: true });
        socket._hasConnected = true;
      });

      socket.on("disconnect", () => {
        set({ isConnected: false });
      });

      socket.on("new_message", (message) => {
        set((state) => ({
          messages: [...state.messages, message],
        }));
      });

      socket.on("user_joined", (data) => {
        set((state) => ({
          messages: [
            ...state.messages,
            {
              content: `${data.user} joined the chat`,
              timestamp: new Date().toISOString(),
              type: "system",
            },
          ],
        }));
      });

      socket.on("user_left", (data) => {
        set((state) => ({
          messages: [
            ...state.messages,
            {
              content: `${data.user} left the chat`,
              timestamp: new Date().toISOString(),
              type: "system",
            },
          ],
        }));
      });

      socket.on("chat_deleted", (data) => {
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== data.chat_id),
          currentChat: state.currentChat !== data.chat_id ? state.currentChat : null,
          messages: state.currentChat !== data.chat_id ? state.messages : [],
        }));
      });

      socket.on("message_history", (messages) => {
        set({ messages });
      });
    }

    // Connect the socket
    if (socket && !socket.connected) {
      socket.connect();
    }
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      // Remove all listeners
      socket.removeAllListeners();
      socket._hasConnected = false;
      set({
        socket: null,
        isConnected: false,
        messages: [],
        currentChat: null,
      });
    }
  },

  // Fetch all chats  Memoize the fetchChats function
  fetchChats: async () => {
    const state = get();
    if (state.isLoading) return; // Prevent multiple concurrent requests

    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/users/chats", {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });

      console.log(response.data.data);
      if (response.data.status === "success") {
        set({ chats: response.data.data.chats });
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch chats.");
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch messages for a specific chat
  fetchMessages: async (chatId) => {
    set({ isLoadingMessages: true });
    try {
      const response = await axiosInstance.get(`/users/chats/${chatId}`, {
        headers: {
          Authorization: `Bearer ${useAuthStore.getState().token}`,
        },
      });

      if (response.data.status === "success") {
        set({ messages: response.data.data.messages });
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch messages.");
    } finally {
      set({ isLoadingMessages: false });
    }
  },

  // Set current chat
  setCurrentChat: async (chat) => {
    if (chat) {
      await get().fetchMessages(chat.id);
    }
    set({
      currentChat: chat,
      messages: chat ? get().messages : [],
    });
  },

  // Send message
  sendMessage: async (chatId, message) => {
    try {
      const { socket } = get();
      if (!socket) {
        throw new Error("Socket connection not initialized");
      }

      socket.emit("send_message", { chat_id: chatId, message });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to send message.");
    }
  },

  // Join a user to the chat when the user books a ride
  joinChat: async (chatId) => {
    try {
      const { socket } = get();
      if (!socket) {
        throw new Error("Socket connection not initialized");
      }

      socket.emit("join_chat", { chat_id: chatId });
      set({
        currentChat: chatId,
        messages: [], // Clear messages when joining a new chat
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to join chat.");
    }
  },

  // Leave a user from the chat when the user cancels a booking
  leaveChat: async (chatId) => {
    try {
      const { socket } = get();
      if (!socket) {
        throw new Error("Socket connection not initialized");
      }

      socket.emit("leave_chat", { chat_id: chatId });
      set({
        currentChat: null,
        messages: [], // Clear messages when leaving a chat
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to leave chat.");
    }
  },

  // Delete a chat
  deleteChat: async (chatId) => {
    try {
      const { socket } = get();
      if (!socket) {
        throw new Error("Socket connection not initialized");
      }

      socket.emit("delete_chat", { chat_id: chatId });
      set((state) => ({
        chats: state.chats.filter((chat) => chat.id !== chatId),
        currentChat: state.currentChat !== chatId ? state.currentChat : null,
        messages: state.currentChat !== chatId ? state.messages : [],
      }));
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to delete chat.");
    }
  },

  // Reset store state
  resetState: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      socket.removeAllListeners();
      socket._hasConnected = false;
    }
    set({
      socket: null,
      isConnected: false,
      chats: [],
      currentChat: null,
      messages: [],
      isLoading: false,
    });
  },
}));

export default useChatStore;
