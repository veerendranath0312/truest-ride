import React from "react";

function ErrorMessage() {
  return (
    <div className="error">
      <p className="error__message">
        <span>
          <ion-icon name="warning-outline"></ion-icon>
        </span>
        Sign in failed. Wrong email.
      </p>
    </div>
  );
}

export default ErrorMessage;
