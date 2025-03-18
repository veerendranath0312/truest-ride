const FormGroup = ({ label, name, children }) => {
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
