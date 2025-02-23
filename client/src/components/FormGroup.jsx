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
}) => {
  return (
    <div className="form__group">
      <label htmlFor={name} className="form__label">
        {label}
      </label>
      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="form__select"
        >
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          placeholder={placeholderText}
          className="form__input"
        />
      )}
    </div>
  );
};

export default FormGroup;
