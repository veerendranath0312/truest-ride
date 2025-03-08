import React from "react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import AuthForm from "../../components/AuthForm";
import FormGroup from "../../components/FormGroup";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

import newBeginningImage from "../../assets/New Beginnings.svg";

function Register() {
  return (
    <div className="register">
      <Navbar />

      <section className="signin__hero">
        <div className="container">
          <AuthForm
            title="Sign up"
            btnText="Continue"
            alternateBtnText="Sign up with Microsoft"
            isSignIn={false}
          >
            <FormGroup label="Full name">
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Full name"
                className="form__input"
              />
            </FormGroup>
            <FormGroup label="Email">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email address"
                className="form__input"
              />
            </FormGroup>
          </AuthForm>

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
