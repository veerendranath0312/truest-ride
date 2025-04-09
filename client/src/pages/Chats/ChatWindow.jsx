import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { SendHorizontal, MessageSquare, Loader, ArrowLeft } from "lucide-react";
import useChatStore from "../../store/useChatStore";
import useAuthStore from "../../store/useAuthStore";
import { truncateNames } from "../../utils/helpers";
import ChatBubble from "./ChatBubble";

function ChatWindow() {
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { currentChat, messages, sendMessage, isLoadingMessages, chats, setCurrentChat } =
    useChatStore();
  const { user } = useAuthStore();
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 850);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll to the bottom of the chat window when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    try {
      await sendMessage(currentChat.id, message.trim());
      setMessage(""); // Clear the input after successful send
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Failed to send message:", error);
    }
  };

  const handleBack = () => {
    setCurrentChat(null);
    navigate("/chats", { replace: true });
  };

  // If there are no chats at all, don't display anything
  if (chats.length === 0) {
    return null;
  }

  // If no chat is selected, display a message
  if (!currentChat && !isMobile) {
    return (
      <div className="chat-window chat-window--empty">
        <div className="chat-window__empty">
          <MessageSquare size={30} />
          <h2>Start a conversation</h2>
          <p>Select a chat from the list to start messaging</p>
        </div>
      </div>
    );
  }

  // If no chat is selected and mobile, don't display anything
  if (!currentChat && isMobile) {
    return null;
  }

  return (
    <div className="chat-window">
      <div className="chat-window__header">
        {isMobile && (
          <button className="chat-window__back-button" onClick={handleBack}>
            <ArrowLeft size={24} />
          </button>
        )}
        <h2 className="chat-window__title">{truncateNames(currentChat.users, 30)}</h2>
      </div>

      <div className="chat-window__messages">
        {isLoadingMessages ? (
          <div className="chat-window__loading">
            <Loader size={20} className="loader-spin" />
          </div>
        ) : (
          <div className="chat-window__messages-container">
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id || index}
                message={message}
                isCurrentUser={message.sender?.id === user?.id}
              />
            ))}
            <div ref={messagesEndRef} className="messages-end-anchor" />
          </div>
        )}
      </div>

      <div className="chat-window__input">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <SendHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
