import React from "react";

const DataListController = (props) => {
  const { label, options, id, onChange, name } = props;

  return (
    <>
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        className="form-control form-control-sm"
        onChange={onChange}
        name={name}
        list="data"
        id={id}
        placeholder="Type to search..."
        type="text"
        required
      />
      <datalist id="data">
        {options &&
          options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.medicine_name}
            </option>
          ))}
      </datalist>
    </>
  );
};

export default DataListController;
