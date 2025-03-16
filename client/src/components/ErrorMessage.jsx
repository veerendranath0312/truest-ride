function ErrorMessage({ message }) {
  return (
    <div className="error">
      <p className="error__message">
        <span>
          <ion-icon name="warning-outline"></ion-icon>
        </span>
        {message}
      </p>
    </div>
  );
}

export default ErrorMessage;
