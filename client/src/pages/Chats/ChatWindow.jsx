import { useEffect } from "react";
import { SendHorizontal, MessageSquare } from "lucide-react";
import useChatStore from "../../store/useChatStore";

function ChatWindow() {
  const { currentChat, messages, socket, sendMessage } = useChatStore();

  if (!currentChat) {
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

  return (
    <div className="chat-window">
      <div className="chat-window__header">
        <h2 className="chat-window__title">John Doe, Jane Smith</h2>
      </div>

      <div className="chat-window__messages">
        <div className="chat-window__messages-container">
          {/* System Message */}
          <div className="chat-window__message chat-window__message--system">
            <div className="chat-window__message-system">John Doe joined the chat</div>
          </div>

          {/* Received Message */}
          <div className="chat-window__message chat-window__message--received">
            <div className="chat-window__message-header">
              <span className="chat-window__message-sender">John Doe</span>
              <span className="chat-window__message-time">2:30 PM</span>
            </div>
            <div className="chat-window__message-content">
              Hello! Is this ride still available?
            </div>
          </div>

          {/* Sent Message */}
          <div className="chat-window__message chat-window__message--sent">
            <div className="chat-window__message-header">
              <span className="chat-window__message-sender">Me</span>
              <span className="chat-window__message-time">2:31 PM</span>
            </div>
            <div className="chat-window__message-content">
              Yes, it is! Would you like to join?
            </div>
          </div>
        </div>
      </div>

      <div className="chat-window__input">
        <form>
          <input type="text" placeholder="Type a message..." />
          <button type="submit">
            <SendHorizontal size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatWindow;
