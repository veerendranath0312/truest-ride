import React from "react";
import { Link } from "react-router";
import Button from "./Button";
import FormGroup from "./FormGroup";

function AuthForm({ children, title, btnText, alternateBtnText, isSignIn }) {
  return (
    <div className="form__wrapper">
      <div className="form__hero__text">
        <h1 className="form__hero__text__title">{title}</h1>
      </div>

      <form action="" className="form">
        {children}

        <Button className="form__button form__button--email">{btnText}</Button>
        <div className="form__divider">
          <hr className="line" />
          <span className="or-text">or</span>
          <hr className="line" />
        </div>

        <Button className="form__button form__button--microsoft">
          <ion-icon name="logo-microsoft"></ion-icon> {alternateBtnText}
        </Button>

        {isSignIn ? (
          <div className="form__footer">
            <span>Don't have an account? </span>
            <Link to="/register">Join us</Link>
          </div>
        ) : (
          <div className="signin__form__footer">
            <span>Already have an account? </span>
            <Link to="/signin">Sign in</Link>
          </div>
        )}
      </form>
    </div>
  );
}

export default AuthForm;
