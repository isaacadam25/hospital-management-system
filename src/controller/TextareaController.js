import React from "react";

const TextareaController = (props) => {
  const {
    label,
    placeholder,
    id,
    onChange,
    value,
    name,
    required,
    invalidText,
  } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <textarea
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
        id={id}
        rows="2"
        required={required || false}
      >
        {value}
      </textarea>
      <div className="text-danger">{invalidText}</div>
    </div>
  );
};

export default TextareaController;
