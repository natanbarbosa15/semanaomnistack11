import React from "react";

const Input = ({
  label,
  name,
  placeholder,
  maxLength,
  column,
  errorsInput,
  register,
}) => (
  <div className={`form-group ${column}`}>
    <label htmlFor={name}>{label}</label>
    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
      <textarea
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder}
        ref={register}
        maxLength={maxLength}
        required
      />
      {errorsInput && (
        <div className="invalid-feedback d-block">{errorsInput.message}</div>
      )}
    </div>
  </div>
);

export default Input;
