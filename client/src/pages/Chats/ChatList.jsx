import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { MoreVertical, Trash2, MapPin, CalendarDays, Loader2 } from "lucide-react";
import useChatStore from "../../store/useChatStore";
import { formattedRideDate, capitalize, truncateNames } from "../../utils/helpers";

function ChatList({ chats, isLoading }) {
  const navigate = useNavigate();
  const { currentChat, setCurrentChat } = useChatStore();
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Close dropdown when user clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".chat-list__item-actions")) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const toggleDropdown = (e, chatId) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === chatId ? null : chatId);
  };

  const handleChatSelect = (chat) => {
    if (currentChat?.id === chat.id) {
      setCurrentChat(null);
      navigate("/chats");
    } else {
      setCurrentChat(chat);
      navigate(`/chats/${chat.id}`);
    }
  };

  // const handleDeleteChat = async (e, chatId) => {
  //   e.stopPropagation();
  //   try {
  //     await deleteChat(chatId);
  //     if (currentChat?.id === chatId) {
  //       navigate("/chats");
  //     }
  //   } catch (error) {
  //     console.error("Failed to delete chat:", error);
  //   }
  //   setActiveDropdown(null);
  // };

  return (
    <div className="chat-list">
      <div className="chat-list__header">
        <h1 className="chat-list__header__title">Group messaging</h1>
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
                  <div onClick={(e) => toggleDropdown(e, chat.id)}>
                    <MoreVertical size={24} />
                  </div>
                  {activeDropdown === chat.id && (
                    <div className="chat-list__item-dropdown">
                      <div
                        className="chat-list__item-dropdown__item"
                        // onClick={(e) => handleDeleteChat(e, chat.id)}
                      >
                        <Trash2 size={16} />
                        Delete chat
                      </div>
                    </div>
                  )}
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
