import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import Navbar from "../../components/Navbar";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";
import Notification from "../../components/Notification";
import { validateEducationalEmail } from "../../utils/helpers";

import newBeginningImage from "../../assets/New Beginnings.svg";
import OTPVerification from "../../components/OTPVerification";

function Register() {
  const navigate = useNavigate();
  const { otpSent, signUp, verifySignUp, isSigningUp, isAuthenticated, setOtpSent } =
    useAuthStore();

  const [formData, setFormData] = useState({ fullname: "", email: "" });
  const [formLabelErrors, setFormLabelErrors] = useState({
    fullnameErrorLabel: "",
    emailErrorLabel: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  // Reset otpSent state when user navigates away from the page
  useEffect(() => {
    setOtpSent(false);
  }, [setOtpSent]);

  // Redirect authenticated users to the home page
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Handle form input change and clear error messages
  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setFormLabelErrors({
      ...formLabelErrors,
      [`${e.target.name}ErrorLabel`]: "",
    });
    setErrorMessage(""); // Clear error message when user starts typing
  };

  // Send OTP to the user's email for verification
  const handleRegister = async (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.fullname) {
      errors.fullnameErrorLabel = "Full name is required";
    }

    if (!formData.email) {
      errors.emailErrorLabel = "Email is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormLabelErrors(errors);
      return;
    }

    if (!validateEducationalEmail(formData.email)) {
      setFormLabelErrors({
        fullnameErrorLabel: "",
        emailErrorLabel: "",
      });
      setErrorMessage("Enter a valid educational email.");
      return;
    }

    try {
      await signUp(formData.fullname, formData.email);
      setFormLabelErrors({
        fullnameErrorLabel: "",
        emailErrorLabel: "",
      });
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  // Verify OTP and sign up the user if OTP is valid and redirect to the home page
  const handleVerifyOtp = async (otp) => {
    try {
      await verifySignUp(formData.fullname, formData.email, otp);
      navigate("/home", { replace: true });
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <div className="register">
      <Navbar />

      <section className="signin__hero">
        <div className="container">
          <div className="form__wrapper">
            {otpSent ? (
              <OTPVerification
                email={formData.email}
                onVerify={handleVerifyOtp}
                isLoading={isSigningUp}
                title="Check your inbox"
                buttonText="Sign up"
                loadingText="Signing up..."
                action="finish your sign up"
              />
            ) : (
              <>
                {/* Fullname & Email entering step */}
                <div className="form__hero__text">
                  <h1 className="form__hero__text__title">Sign up</h1>
                </div>

                {errorMessage && <Notification type="error" message={errorMessage} />}

                <form className="form" onSubmit={handleRegister}>
                  <div className="form__group">
                    <label
                      htmlFor="fullname"
                      className={`form__label ${
                        formLabelErrors.fullnameErrorLabel && "form__label--error"
                      }`}
                    >
                      {formLabelErrors.fullnameErrorLabel || "Full name"}
                    </label>
                    <input
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Full name"
                      className={`form__input ${
                        formLabelErrors.fullnameErrorLabel && "form__input--error"
                      }`}
                      value={formData.fullname}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="form__group">
                    <label
                      htmlFor="email"
                      className={`form__label ${
                        formLabelErrors.emailErrorLabel && "form__label--error"
                      }`}
                    >
                      {formLabelErrors.emailErrorLabel || "Email"}
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email address"
                      className={`form__input ${
                        formLabelErrors.emailErrorLabel && "form__input--error"
                      }`}
                      value={formData.email}
                      onChange={handleFormChange}
                    />
                  </div>
                  <button className="btn form__button form__button--email">
                    {isSigningUp ? (
                      <>
                        <Loader2 size={22} className="loader-spin" /> Sending OTP...
                      </>
                    ) : (
                      "Sign up with email"
                    )}
                  </button>

                  <div className="signin__form__footer">
                    <span>Already have an account? </span>
                    <Link to="/signin">Sign in</Link>
                  </div>
                </form>
              </>
            )}
          </div>

          <div className="signin__illustration">
            <img src={newBeginningImage} alt="new beginnings" />
          </div>

          <JoinUs />
          <Footer />
        </div>
      </section>
    </div>
  );
}

export default Register;
