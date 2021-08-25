import React from "react";

const SelectController = (props) => {
  const { label, id, onChange, value, name, options, invalidText } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <select
        className="form-select form-select-sm"
        value={value}
        onChange={onChange}
        name={name}
        aria-label={id}
      >
        <option value="">Select options here</option>
        {options &&
          options.map((option, index) => (
            <option
              style={{ textTransform: "capitalize" }}
              key={index}
              value={option.id}
            >
              {option.name || option.first_name + " " + option.last_name}
            </option>
          ))}
      </select>
      <div className="text-danger">{invalidText}</div>
    </div>
  );
};

export default SelectController;
