import React from "react";
import Navbar from "../../components/Navbar";
import AuthForm from "../../components/AuthForm";
import FormGroup from "../../components/FormGroup";
import JoinUs from "../../components/JoinUs";
import Footer from "../../components/Footer";

import "./signin.css";
import astroImage from "../../assets/Astro.svg";

function SignIn() {
  return (
    <div className="signin">
      <Navbar />
      <section className="signin__hero">
        <div className="container">
          <AuthForm
            title="Sign in"
            btnText="Sign in with email"
            alternateBtnText="Sign in with Microsoft"
            isSignIn={true}
          >
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
