import React from "react";
import { Controller } from "react-hook-form";
import InputMask from "react-text-mask";

const Input = ({
  label,
  name,
  type,
  placeholder,
  maxLength,
  column,
  icon,
  errorsInput,
  control,
  mask,
  onBlur,
}) => (
  <div className={`form-group ${column}`}>
    <label htmlFor={name}>{label}</label>
    <div className="input-group mb-3 input-group-sm d-flex align-items-center">
      <div className="input-group-prepend">
        <div className="input-group-text bg-white icon-fa">{icon}</div>
      </div>
      <Controller
        as={InputMask}
        control={control}
        mask={mask}
        type={type}
        className="form-control"
        id={name}
        name={name}
        placeholder={placeholder}
        maxLength={maxLength}
        guide={false}
        onBlur={onBlur}
        required
      />
      {errorsInput && (
        <div className="invalid-feedback d-block">{errorsInput.message}</div>
      )}
    </div>
  </div>
);

export default Input;
