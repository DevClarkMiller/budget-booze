import React from "react";

const LabelInput = React.forwardRef(
  (
    {
      onBlur,
      onChange,
      value,
      children,
      id,
      type,
      min,
      max,
      inputClassName,
      labelClassName,
      required,
      name,
      spanClassName,
      placeholder,
    },
    ref,
  ) => {
    return (
      <span className={`col-flex-center gap-1 ${spanClassName}`}>
        <label htmlFor={id} className={labelClassName}>
          {children}
        </label>
        <input
          ref={ref}
          name={name}
          className={inputClassName}
          onChange={onChange}
          value={value}
          id={id}
          type={type}
          min={min}
          max={max}
          required={required}
          placeholder={placeholder}
          onBlur={onBlur}
        />
      </span>
    );
  },
);

LabelInput.defaultProps = {
  type: "text",
  inputClassName: "",
  labelClassName: "",
  spanClassName: "",
  required: false,
  min: undefined,
  max: undefined,
};

export default LabelInput;
