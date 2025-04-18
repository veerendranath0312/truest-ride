import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MapPin, CalendarDays, Loader2, MessageCircleMore } from "lucide-react";

import useChatStore from "../../store/useChatStore";
import { formattedRideDate, truncateNames } from "../../utils/helpers";

function ChatList({ chats, isLoading }) {
  const navigate = useNavigate();
  const { currentChat, setCurrentChat } = useChatStore();
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

  const handleChatSelect = (chat) => {
    if (currentChat?.id === chat.id) {
      setCurrentChat(null);
      navigate("/chats");
    } else {
      setCurrentChat(chat);
      navigate(`/chats/${chat.id}`);
    }
  };

  return (
    <div className={`chat-list ${currentChat && isMobile ? "hidden" : ""}`}>
      <div className="chat-list__header">
        <h1 className="chat-list__header__title">
          <MessageCircleMore color="var(--text-secondary)" />
          Group messaging
        </h1>
      </div>
      <div className="chat-list__content">
        {isLoading ? (
          <div className="chat-list__loading">
            <Loader2 size={20} className="loader-spin" />
            &nbsp;
          </div>
        ) : chats?.length === 0 ? (
          <div className="chat-list__empty">
            <p>No chats here yet</p>
          </div>
        ) : (
          <>
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`chat-list__item ${
                  currentChat?.id === chat.id ? "chat-list__item--active" : ""
                }`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="chat-list__item-info">
                  <h3>{truncateNames(chat.users, 25)}</h3>
                  <div className="chat-list__item-details">
                    <div className="chat-list__item-detail">
                      <MapPin size={14} />
                      <span>
                        {chat.ride.from_location} to {chat.ride.to_location}
                      </span>
                    </div>
                    <div className="chat-list__item-detail">
                      <CalendarDays size={14} />
                      <span>{formattedRideDate(chat.ride.ride_date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default ChatList;
