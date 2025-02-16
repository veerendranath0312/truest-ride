import React from "react";

function FormGroup({ labelText, inputType, placeholderText }) {
  return (
    <div className="form__group">
      <label htmlFor="email" className="form__label">
        {labelText}
      </label>
      <input
        type={inputType}
        id={inputType}
        className="form__input"
        placeholder={placeholderText}
      />
    </div>
  );
}

export default FormGroup;
