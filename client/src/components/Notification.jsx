function Notification({ type, message }) {
  const notificationClass =
    type === "success" ? "notification__success" : "notification__error";

  return (
    <div className={`notification ${notificationClass}`}>
      <p className="notification__message">
        <span>
          {type === "success" ? (
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          ) : (
            <ion-icon name="warning-outline"></ion-icon>
          )}
        </span>
        {message}
      </p>
    </div>
  );
}

export default Notification;
