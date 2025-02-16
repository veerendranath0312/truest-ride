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
            <FormGroup
              labelText="Full name"
              inputType="text"
              placeholderText="Full name"
            />
            <FormGroup
              labelText="Email"
              inputType="email"
              placeholderText="Email address"
            />
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
