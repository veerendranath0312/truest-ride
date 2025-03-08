import React from "react";

const FormGroup = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  options = [],
  min = 1,
  max = 10,
  placeholderText,
  children,
}) => {
  return (
    <div className="form__group">
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormGroup;
