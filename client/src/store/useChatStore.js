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
    const token = useAuthStore.getState().token;

    // Disconnect existing socket if it exists
    if (socket) {
      socket.disconnect();
      socket.removeAllListeners();
    }

    // Create new socket with proper configuration
    socket = io(import.meta.env.SOCKET_URL, {
      query: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socket.on("connect", () => {
      set({ isConnected: true });
    });

    socket.on("connect_error", () => {
      set({ isConnected: false });
    });

    socket.on("disconnect", () => {
      set({ isConnected: false });
    });

    socket.on("new_message", (message) => {
      const currentChat = get().currentChat;

      if (currentChat && message.chat === currentChat.id) {
        set((state) => {
          // Simpler deduplication based only on message ID
          const messageExists = state.messages.some((m) => m.id === message.id);

          if (!messageExists) {
            // Ensure the timestamp is in ISO format
            const formattedMessage = {
              ...message,
              timestamp: message.timestamp
                ? new Date(message.timestamp).toISOString()
                : new Date().toISOString(),
            };
            const newMessages = [...state.messages, formattedMessage];
            return { messages: newMessages };
          }
          return state;
        });
      }
    });

    socket.on("user_joined", (data) => {
      set((state) => {
        // Add system message about user joining
        const newMessages = [
          ...state.messages,
          {
            content: `${data.user} joined the chat`,
            timestamp: new Date().toISOString(),
            type: "system",
          },
        ];

        // Update the users list in the current chat if it matches
        let updatedChats = state.chats.map((chat) => {
          if (chat.id === data.chat_id) {
            return {
              ...chat,
              users: [...chat.users, { id: data.user_id, full_name: data.user }],
            };
          }
          return chat;
        });

        return {
          messages: newMessages,
          chats: updatedChats,
        };
      });
    });

    socket.on("user_left", (data) => {
      set((state) => {
        // Add system message about user leaving
        const newMessages = [
          ...state.messages,
          {
            content: `${data.user} left the chat`,
            timestamp: new Date().toISOString(),
            type: "system",
          },
        ];

        // Update the users list in the current chat if it matches
        let updatedChats = state.chats.map((chat) => {
          if (chat.id === data.chat_id) {
            return {
              ...chat,
              users: chat.users.filter((user) => user.id !== data.user_id),
            };
          }
          return chat;
        });

        return {
          messages: newMessages,
          chats: updatedChats,
        };
      });
    });

    socket.on("chat_deleted", (data) => {
      set((state) => {
        const deletedChatId = data.chat_id;
        const isCurrentChat = state.currentChat?.id === deletedChatId;

        // Filter out the deleted chat from chats list
        const updatedChats = state.chats.filter((chat) => chat.id !== deletedChatId);

        // If we're currently viewing the deleted chat, clear messages and current chat
        const updatedMessages = isCurrentChat ? [] : state.messages;
        const updatedCurrentChat = isCurrentChat ? null : state.currentChat;

        // If we're in the deleted chat, navigate back to chats list
        if (isCurrentChat && window.navigateToChats) {
          // Using window.location here because we can't use useNavigate in a store
          window.navigateToChats();
        }

        // TODO:Show toast notification about chat deletion
        return {
          chats: updatedChats,
          messages: updatedMessages,
          currentChat: updatedCurrentChat,
        };
      });
    });

    socket.on("message_history", (messages) => {
      set({ messages });
    });

    socket.connect();
    set({ socket });
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

      const token = useAuthStore.getState().token;
      if (!token) {
        throw new Error("No authentication token available");
      }

      const messageData = {
        chat_id: chatId,
        message: message,
        token: token, // Include token with message
      };

      // Emit the message and wait for acknowledgment
      return new Promise((resolve, reject) => {
        socket.emit("send_message", messageData, (response) => {
          if (response && response.status === "success") {
            resolve(response);
          } else {
            reject(new Error(response?.message || "Failed to send message"));
          }
        });
      });
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to send message.");
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
