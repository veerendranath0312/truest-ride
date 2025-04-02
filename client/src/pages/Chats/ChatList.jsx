import { useState, useEffect } from "react";
import { MoreVertical, LogOut, Trash2, MapPin, CalendarDays, Loader } from "lucide-react";
import useChatStore from "../../store/useChatStore";
import { formattedRideDate, capitalize, truncateNames } from "../../utils/helpers";

function ChatList({ chats, isLoading }) {
  const { currentChat, setCurrentChat } = useChatStore();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handler to close dropdown when clicking outside
  const handleClickOutside = (e) => {
    if (!e.target.closest(".chat-list__item-actions")) {
      setActiveDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (chatId) => {
    setActiveDropdown(activeDropdown === chatId ? null : chatId);
  };

  const handleLeaveChat = async (chatId) => {
    console.log("Leaving chat: ", chatId);
  };

  const handleDeleteChat = async (chatId) => {
    console.log("Deleting chat: ", chatId);
  };

  const handleChatSelect = (chat) => {
    // If clicking the same chat, deselect it
    if (currentChat?.id === chat.id) {
      setCurrentChat(null);
    } else {
      setCurrentChat(chat);
    }
  };

  return (
    <div className="chat-list">
      <div className="chat-list__header">
        <h1 className="chat-list__header__title">Group messaging</h1>
      </div>
      <div className="chat-list__content">
        {isLoading ? (
          <div className="chat-list__loading">
            <Loader size={20} className="loader-spin" />
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
                        {capitalize(chat.ride.from_location)} to{" "}
                        {capitalize(chat.ride.to_location)}
                      </span>
                    </div>
                    <div className="chat-list__item-detail">
                      <CalendarDays size={14} />
                      <span>{formattedRideDate(chat.ride.ride_date)}</span>
                    </div>
                  </div>
                </div>
                <div className="chat-list__item-actions">
                  <div onClick={() => toggleDropdown(chat)}>
                    <MoreVertical size={24} />
                  </div>
                  <div
                    className={
                      activeDropdown === chat
                        ? "chat-list__item-dropdown active"
                        : "chat-list__item-dropdown"
                    }
                  >
                    <div
                      className="chat-list__item-dropdown__item"
                      onClick={() => handleLeaveChat(chat)}
                    >
                      <LogOut size={16} />
                      Leave chat
                    </div>
                    <div
                      className="chat-list__item-dropdown__item"
                      onClick={() => handleDeleteChat(chat)}
                    >
                      <Trash2 size={16} />
                      Delete chat
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
