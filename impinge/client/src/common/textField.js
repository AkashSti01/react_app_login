import { ErrorMessage, useField } from "formik";
import React from "react";

export default function TextField({
  label,
  required,
  viewOnly = false,
  ...props
}) {
  const [field, meta, helpers] = useField(props);
  return (
    <div className="form-group">
      <label htmlFor={field.name}>
        {label}
        {required ? <span className="error text-danger">*</span> : ""}
      </label>
      <input
        className={`form-control pro-input-two ${
          meta.touched && meta.error && "is-invalid"
        }`}
        {...field}
        {...props}
        onChange={(e) => {
          helpers?.setValue(e.target.value);
          props?.changeHandle?.(e.target.value);
        }}
        disabled={viewOnly}
        autoComplete="off"
      ></input>
      <ErrorMessage
        component="div"
        name={field.name}
        className="error text-danger"
      />
    </div>
  );
}
