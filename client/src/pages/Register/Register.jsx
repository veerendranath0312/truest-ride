import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import useAuthStore from "../../store/useAuthStore";
import Navbar from "../../components/Navbar";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";
import Notification from "../../components/Notification";
import FormInput from "../../components/FormInput";
import FormSelect from "../../components/FormSelect";
import { validateEducationalEmail } from "../../utils/helpers";

import newBeginningImage from "../../assets/New Beginnings.svg";
import OTPVerification from "../../components/OTPVerification";

function Register() {
  const navigate = useNavigate();
  const { otpSent, signUp, verifySignUp, isSigningUp, isAuthenticated, setOtpSent } =
    useAuthStore();

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    gender: "",
  });

  const [formLabelErrors, setFormLabelErrors] = useState({
    fullnameErrorLabel: "",
    emailErrorLabel: "",
    genderErrorLabel: "",
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
  // Handle form input change and clear error messages
  const handleFormChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });

    setFormLabelErrors({
      ...formLabelErrors,
      [`${field}ErrorLabel`]: "",
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

    if (!formData.gender) {
      errors.genderErrorLabel = "Gender is required";
    }

    if (Object.keys(errors).length > 0) {
      setFormLabelErrors(errors);
      return;
    }

    if (!validateEducationalEmail(formData.email)) {
      setFormLabelErrors({
        fullnameErrorLabel: "",
        emailErrorLabel: "",
        genderErrorLabel: "",
      });
      setErrorMessage("Enter a valid educational email.");
      return;
    }

    try {
      await signUp(formData.fullname, formData.email, formData.gender);
      setFormLabelErrors({
        fullnameErrorLabel: "",
        emailErrorLabel: "",
        genderErrorLabel: "",
      });
      setErrorMessage("");
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  const handleResendOtp = async () => {
    try {
      await signUp(formData.fullname, formData.email, formData.gender);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  // Verify OTP and sign up the user if OTP is valid and redirect to the home page
  const handleVerifyOtp = async (otp) => {
    try {
      await verifySignUp(formData.fullname, formData.email, formData.gender, otp);
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
                onResend={handleResendOtp}
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
                  <FormInput
                    type="text"
                    id="fullname"
                    name="fullname"
                    label="Full name"
                    placeholder="Enter your full name"
                    value={formData.fullname}
                    onChange={(e) => handleFormChange("fullname", e.target.value)}
                    error={formLabelErrors.fullnameErrorLabel}
                  />

                  <FormInput
                    type="email"
                    id="email"
                    name="email"
                    label="Email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleFormChange("email", e.target.value)}
                    error={formLabelErrors.emailErrorLabel}
                  />

                  <FormSelect
                    id="gender"
                    name="gender"
                    label="Gender"
                    value={formData.gender}
                    onChange={(e) => handleFormChange("gender", e.target.value)}
                    error={formLabelErrors.genderErrorLabel}
                    options={[
                      { value: "", label: "Select your gender" },
                      { value: "Male", label: "Male" },
                      { value: "Female", label: "Female" },
                      { value: "Other", label: "Other" },
                    ]}
                  />

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
