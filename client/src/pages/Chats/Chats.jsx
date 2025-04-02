import { useEffect } from "react";
import useChatStore from "../../store/useChatStore";
import Navbar from "../../components/Navbar";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./chats.css";

function Chats() {
  const { chats, fetchChats, isLoading } = useChatStore();
  useEffect(() => {
    const loadRides = async () => {
      await fetchChats();
    };

    loadRides();
  }, [fetchChats]);

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
