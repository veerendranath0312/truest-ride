import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import Navbar from "../../components/Navbar";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";
import Notification from "../../components/Notification";
import { validateEducationalEmail } from "../../utils/helpers";

import "./signin.css";
import astroImage from "../../assets/Astro.svg";
import OTPVerification from "../../components/OTPVerification";

function SignIn() {
  const navigate = useNavigate();
  const { otpSent, signIn, verifySignIn, isSigningIn, isAuthenticated, setOtpSent } =
    useAuthStore();

  const [email, setEmail] = useState("");
  const [emailErrorLabel, setEmailErrorLabel] = useState(""); // For label error text
  const [errorMessage, setErrorMessage] = useState(""); // For ErrorMessage component

  // Reset otpSent state when user navigates away from the page
  useEffect(() => {
    setOtpSent(false);
  }, [setOtpSent]);

  // Redirect authenticated users to the home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle email input change and clear error messages
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailErrorLabel("");
    setErrorMessage(""); // Clear error message when user starts typing
  };

  // Send OTP to the user's email for verification
  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!email) {
      setEmailErrorLabel("Email is required");
      return;
    }

    if (!validateEducationalEmail(email)) {
      setEmailErrorLabel("");
      setErrorMessage("Enter a valid educational email.");
      return;
    }

    try {
      await signIn(email);
      setEmailErrorLabel("");
      setErrorMessage("");
    } catch (err) {
      // Server-side
      setErrorMessage(err.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      await signIn(email);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Verify OTP and sign in the user if OTP is valid and redirect to the home page
  const handleVerifyOtp = async (otp) => {
    try {
      await verifySignIn(email, otp);
      navigate("/home", { replace: true });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="signin">
      <Navbar />

      <section className="signin__hero">
        <div className="container">
          <div className="form__wrapper">
            {otpSent ? (
              <OTPVerification
                email={email}
                onVerify={handleVerifyOtp}
                onResend={handleResendOtp}
                isLoading={isSigningIn}
                title="Check your inbox"
                buttonText="Sign in"
                loadingText="Signing in..."
                action="finish your sign in"
              />
            ) : (
              <>
                {/* Email entering step */}
                <div className="form__hero__text">
                  <h1 className="form__hero__text__title">Sign in</h1>
                </div>

                {errorMessage && <Notification type="error" message={errorMessage} />}

                <form className="form" onSubmit={handleSignIn}>
                  <div className="form__group">
                    <label
                      htmlFor="email"
                      className={`form__label ${emailErrorLabel && "form__label--error"}`}
                    >
                      {emailErrorLabel || "Email"}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      className={`form__input ${emailErrorLabel && "form__input--error"}`}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </div>
                  <button className="btn form__button form__button--email">
                    {isSigningIn ? (
                      <>
                        <Loader2 className="loader-spin" size={24} /> Sending OTP...
                      </>
                    ) : (
                      "Sign in with email"
                    )}
                  </button>

                  <div className="form__footer">
                    <span>Don&apos;t have an account? </span>
                    <Link to="/register">Join us</Link>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="signin__illustration">
            <img src={astroImage} alt="" />
          </div>

          <JoinUs />
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default SignIn;
