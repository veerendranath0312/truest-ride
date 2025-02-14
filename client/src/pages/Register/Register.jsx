import React from "react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import AuthForm from "../../components/AuthForm";
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
            labelText="Email"
            btnText="Continue"
            alternateBtnText="Sign up with Microsoft"
            isSignIn={false}
          />

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
