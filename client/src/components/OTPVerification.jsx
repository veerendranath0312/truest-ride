import { useState, useEffect } from "react";
import { Loader2, Loader } from "lucide-react";
import Notification from "./Notification";

function OTPVerification({
  email,
  onVerify,
  onCancel,
  onResend,
  isLoading,
  title,
  buttonText = "Verify",
  loadingText = "Verifying...",
  action = "finish",
  variant = "primary",
}) {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [countdown]);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setErrorMessage("Please enter a valid 6-digit code.");
      return;
    }

    try {
      await onVerify(otp);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    try {
      await onResend();
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setCountdown(30);
      setCanResend(false);
    }
  };
  return (
    <>
      <div className="form__hero__text">
        {title && <h1 className="form__hero__text__title">{title}</h1>}
        <p className="form__hero__text__subtitle">
          Enter the 6-digit code we sent to <b>{email}</b> to {action}.
        </p>
      </div>

      {errorMessage && <Notification type="error" message={errorMessage} />}

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="otp" className="form__label">
            OTP
          </label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="6-digit code"
            className="form__input"
            value={otp}
            onChange={handleOtpChange}
            maxLength={6}
            required
          />
        </div>
        {variant !== "danger" ? (
          <button className="btn form__button form__button--email">
            {isLoading ? (
              <>
                <Loader2 size={22} /> {loadingText}
              </>
            ) : (
              buttonText
            )}
          </button>
        ) : (
          <div className="form__button-container">
            <button
              type="button"
              className="btn form__button form__button--cancel"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn form__button form__button--danger"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader size={16} className="loader-spin" /> {loadingText}
                </>
              ) : (
                buttonText
              )}
            </button>
          </div>
        )}
        {canResend ? (
          <p className="form__footer form__footer--resend" onClick={handleResend}>
            Resend code
          </p>
        ) : (
          <p className="form__footer">
            Didn&apos;t receive the code? <b>Resend code in {countdown} sec</b>
          </p>
        )}
      </form>
    </>
  );
}

export default OTPVerification;
