import React from "react";
import { Link } from "react-router";
import Navbar from "../../components/Navbar";
import AuthForm from "../../components/AuthForm";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";
import Button from "../../components/Button";

import "./signin.css";
import astroImage from "../../assets/Astro.svg";

function SIgnIn() {
  return (
    <div className="signin">
      <Navbar />
      <section className="signin__hero">
        <div className="container">
          <AuthForm
            title="Sign in"
            labelText="Email"
            btnText="Sign in with email"
            alternateBtnText="Sign in with Microsoft"
            isSignIn={true}
          />
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

export default SIgnIn;
