function ChatBubble({ message, isCurrentUser }) {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "";

    try {
      // Add 'Z' to explicitly treat the timestamp as UTC if it doesn't have a timezone
      const utcTimestamp = timestamp.endsWith("Z") ? timestamp : timestamp + "Z";

      // Create Date object from UTC timestamp
      const utcDate = new Date(utcTimestamp);

      // Convert to local timezone
      const localDate = new Date(utcDate.toLocaleString());
      const currentTime = new Date();

      // For messages from today, show only time
      if (localDate.toDateString() === currentTime.toDateString()) {
        return localDate.toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
      }

      // For older messages, show date and time
      return localDate.toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return "";
    }
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
