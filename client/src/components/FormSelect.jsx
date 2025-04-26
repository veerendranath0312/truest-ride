function FormSelect({ label, error, options, ...props }) {
  return (
    <div className="form__group">
      <label
        htmlFor={props.id}
        className={`form__label ${error && "form__label--error"}`}
      >
        {error || label}
      </label>
      <select {...props} className={`form__input ${error && "form__input--error"}`}>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="form__input__option">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
