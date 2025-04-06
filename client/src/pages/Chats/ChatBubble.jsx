function ChatBubble({ message, isCurrentUser }) {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (message.type === "system") {
    return (
      <div className="chat-window__message chat-window__message--system">
        <div className="chat-window__message-system">{message.content}</div>
      </div>
    );
  }

  return (
    <div
      className={`chat-window__message ${
        isCurrentUser ? "chat-window__message--sent" : "chat-window__message--received"
      }`}
    >
      <div className="chat-window__message-header">
        <span className="chat-window__message-sender">{message.sender?.full_name}</span>
        <span className="chat-window__message-time">
          {formatTimestamp(message.timestamp)}
        </span>
      </div>
      <div className="chat-window__message-content">{message.content}</div>
    </div>
  );
}

export default ChatBubble;
