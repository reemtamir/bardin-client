import React from 'react';

const Input = ({
  label,
  type,
  id,
  error,
  labelClass,
  inputClass,
  value,
  ...rest
}) => {
  return (
    <>
      <div className="col-sm-10">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {rest.required && <span className="text-danger ms-1">*</span>}
        <input {...rest} type={type} className={inputClass} id={id} />

        <span>{error}</span>
      </div>
    </>
  );
};

export default Input;