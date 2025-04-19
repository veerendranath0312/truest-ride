function FormInput({ label, error, ...props }) {
  return (
    <div className="form__group">
      <label
        htmlFor={props.id}
        className={`form__label ${error && "form__label--error"}`}
      >
        {error || label}
      </label>
      <input
        {...props}
        className={`form__input ${error && "form__input--error"} ${
          props.className || ""
        }`}
      />
    </div>
  );
}

export default FormInput;
