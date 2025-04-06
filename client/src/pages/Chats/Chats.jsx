import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import useChatStore from "../../store/useChatStore";
import Navbar from "../../components/Navbar";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./chats.css";

function Chats() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const {
    chats,
    currentChat,
    fetchChats,
    setCurrentChat,
    isLoading,
    initializeSocket,
    disconnectSocket,
  } = useChatStore();

  // Initialize socket connection
  useEffect(() => {
    initializeSocket();
    return () => disconnectSocket();
  }, [initializeSocket, disconnectSocket]);

  // Fetch chats
  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  // Handle URL-based chat selection
  useEffect(() => {
    if (chatId && chats.length > 0) {
      const chat = chats.find((c) => c.id === chatId);
      if (chat) {
        setCurrentChat(chat);
      } else {
        navigate("/chats", { replace: true });
      }
    } else if (!chatId && currentChat) {
      setCurrentChat(null);
    }
  }, [chatId, chats, currentChat, setCurrentChat, navigate]);

  return (
    <div className="chats">
      <Navbar isAuthenticated={true} />
      <div className="chats__container">
        <ChatList chats={chats} isLoading={isLoading} />
        <ChatWindow />
      </div>
    </div>
  );
}

export default Chats;
