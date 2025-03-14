import { useState } from "react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";

import newBeginningImage from "../../assets/New Beginnings.svg";

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [fullnameLabelText, setFullnameLabelText] = useState("Full name");
  const [emailLabelText, setEmailLabelText] = useState("Email");
  const [isError, setIsError] = useState(false);

  const handleFullnameChange = (e) => {
    setFullname(e.target.value);
    setFullnameLabelText("Full name");
    setIsError(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailLabelText("Email");
    setIsError(false);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!fullname) {
      setFullnameLabelText("Full name is required");
      setIsError(true);
    }

    if (!email) {
      setEmailLabelText("Email is required");
      setIsError(true);
    }
  };

  return (
    <div className="register">
      <Navbar />

      <section className="signin__hero">
        <div className="container">
          <div className="form__wrapper">
            <div className="form__hero__text">
              <h1 className="form__hero__text__title">Sign up</h1>
            </div>

            <form className="form" onSubmit={handleRegister}>
              <div className="form__group">
                <label
                  htmlFor="fullname"
                  className={`form__label ${isError && "form__label--error"}`}
                >
                  {fullnameLabelText}
                </label>
                <input
                  type="text"
                  id="fullname"
                  name="fullname"
                  placeholder="Full name"
                  className={`form__input ${isError && "form__input--error"}`}
                  value={fullname}
                  onChange={handleFullnameChange}
                />
              </div>
              <div className="form__group">
                <label
                  htmlFor="email"
                  className={`form__label ${isError && "form__label--error"}`}
                >
                  {emailLabelText}
                </label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Full name"
                  className={`form__input ${isError && "form__input--error"}`}
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <button className="btn form__button form__button--email">
                Continue
              </button>

              <div className="signin__form__footer">
                <span>Already have an account? </span>
                <Link to="/signin">Sign in</Link>
              </div>
            </form>
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
