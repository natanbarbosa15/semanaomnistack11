import React from "react";

const Input = ({
  label,
  name,
  type,
  placeholder,
  maxLength,
  column,
  icon,
  errorsInput,
  register,
  handleChange,
}) => (
  <div className={`form-group ${column}`}>
    <label htmlFor={name}>{label}</label>
    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
      {icon && (
        <div className="input-group-prepend">
          <div className="input-group-text bg-white icon-fa">{icon}</div>
        </div>
      )}
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder}
        ref={register}
        maxLength={maxLength}
        onChange={handleChange}
        required
      />
      {errorsInput && (
        <div className="invalid-feedback d-block">{errorsInput.message}</div>
      )}
    </div>
  </div>
);

export default Input;
