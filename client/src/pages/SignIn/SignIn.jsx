import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";

import "./signin.css";
import astroImage from "../../assets/Astro.svg";

// When the email field is empty and the user clicks on the "Sign in with email" button,
// the label should be changed from "Email" to "Email is required" in red color and
// the input field should have a red border around it.
// The user should not be able to submit the form until the email field is filled out.
// The email field should be validated to ensure that the input is a valid email address.
// As soon as the user starts typing in the email field, the label should change back to "Email".

function SignIn() {
  const [email, setEmail] = useState("");
  const [labelText, setLabelText] = useState("Email");
  const [isError, setIsError] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setLabelText("Email");
    setIsError(false);
  };

  const handleSignIn = (e) => {
    e.preventDefault();

    if (!email) {
      setLabelText("Email is required");
      setIsError(true);
    }
  };

  return (
    <div className="signin">
      <Navbar />
      <section className="signin__hero">
        <div className="container">
          <div className="form__wrapper">
            <div className="form__hero__text">
              <h1 className="form__hero__text__title">Sign in</h1>
            </div>

            <form className="form" onSubmit={handleSignIn}>
              <div className="form__group">
                <label
                  htmlFor="email"
                  className={`form__label ${isError && "form__label--error"}`}
                >
                  {labelText}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email address"
                  className={`form__input ${isError && "form__input--error"}`}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <button className="btn form__button form__button--email">
                Sign in with email
              </button>

              <div className="form__footer">
                <span>Don't have an account? </span>
                <Link to="/register">Join us</Link>
              </div>
            </form>
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
