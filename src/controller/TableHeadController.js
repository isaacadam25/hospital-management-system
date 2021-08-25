import React from "react";

const TableHeadController = (props) => {
  const { headCells } = props;

  return (
    <thead>
      <tr>
        {headCells &&
          headCells.map((headCell) => (
            <th key={headCell.id} scope="col">
              {headCell.title}
            </th>
          ))}
      </tr>
    </thead>
  );
};

export default TableHeadController;
